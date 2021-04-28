import connection from '../connection';
import threekitAPI from '../api';
import { shallowCompare, deepCompare } from '../utils';

class Controller {
  constructor({ api, configurator, translations, language }) {
    //  Threekit API
    this._api = api;
    this._configurator = configurator;
    //  Translations
    this._translations = translations;
    this._currentLanguage = language;
    //  History
    this._history = [[{}, configurator.getConfiguration()]];
    this._historyPosition = 0;
  }

  static createPlayerLoaderEl() {
    let playerElement = document.getElementById('player-root');
    if (playerElement) return playerElement;

    playerElement = document.createElement('div');
    playerElement.setAttribute('id', 'player-root');
    playerElement.style.height = '100%';

    const playerLoader = document.createElement('div');
    playerLoader.appendChild(playerElement);
    playerLoader.style.opacity = '0';

    document.body.appendChild(playerLoader);
    return playerElement;
  }

  static createThreekitScriptEl(threekitEnv) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = `${threekitEnv}/app/js/threekit-player-bundle.js`;
      script.id = 'threekit-player-bundle';
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }

  static initThreekit({ el, authToken, assetId, orgId }) {
    return new Promise(async (resolve) => {
      const api = await window.threekitPlayer({
        el,
        authToken,
        assetId,
        orgId,
      });
      const configurator = await api.getConfigurator();
      resolve({ api, configurator });
    });
  }

  static attachPlayerToComponent(moveToElementId) {
    const addPlayer = (tryCount = 0) => {
      if (tryCount >= 10) return;

      let player = document.getElementById('player-root');
      const playerWrapper = document.getElementById(moveToElementId);

      if (!player || !playerWrapper)
        return setTimeout(() => {
          addPlayer(tryCount + 1);
        }, 0.05 * 1000);

      if (!player) throw new Error('Initial Player element not found');
      if (!playerWrapper) throw new Error('Move To element not found');

      playerWrapper.appendChild(player);
    };

    addPlayer();
  }

  static async launch(config) {
    return new Promise(async (resolve) => {
      if (window.threekit) resolve();
      const {
        threekitEnv: threekitEnvRaw,
        authToken,
        assetId,
        orgId,
        elementId,
        language,
      } = config;

      //  Connection
      connection.connect({
        authToken,
        orgId,
        assetId,
        threekitEnv: threekitEnvRaw,
      });
      const { threekitEnv } = connection.getConnection();

      //  We get or create the player HTML element
      let el = document.getElementById(elementId);
      if (!el) el = this.createPlayerLoaderEl();

      //  We create the threekit script
      await this.createThreekitScriptEl(threekitEnv);

      const [{ api, configurator }, translations] = await Promise.all([
        this.initThreekit({ el, authToken, orgId, assetId }),
        threekitAPI.products.fetchTranslations(),
      ]);

      window.threekit = {
        api,
        configurator,
        controller: new Controller({
          api,
          configurator,
          translations,
        }),
      };
      resolve();
    });
  }

  _translateAttribute(attr) {
    return {
      ...attr,
      label:
        this._translations?.[attr.name]?.[this._currentLanguage] || attr.name,
      values: !Array.isArray(attr.values)
        ? attr.values
        : attr.values.map((el) =>
            Object.assign({}, el, {
              label:
                this._translations?.[
                  attr.type === 'String' ? el.label : el.name
                ]?.[this._currentLanguage] ||
                (attr.type === 'String' ? el.label : el.name),
            })
          ),
    };
  }

  _pushToHistory(historyItem) {
    if (!this._history) {
      this._history = [historyItem];
      return;
    }

    if (this._historyPosition === this._history.length - 1) {
      this._history.push(historyItem);
      this._historyPosition++;
      return;
    }

    this._history.splice(this._historyPosition + 1);
    this._history.push(historyItem);
    this._historyPosition++;
  }

  _compareAttributes(attributes1, attributes2) {
    let updatedAttributes = new Set([]);

    const attributesObj1 = attributes1.reduce(
      (output, el) => Object.assign(output, { [el.name]: el }),
      {}
    );
    const attributesObj2 = attributes2.reduce(
      (output, el) => Object.assign(output, { [el.name]: el }),
      {}
    );
    const attrKeys1 = Object.keys(attributesObj1);
    const attrKeys2 = Object.keys(attributesObj2);

    //  Check to see if same number of attributes are
    //  in each object. If not figure out the missing
    //  ones
    if (attrKeys1.length !== attrKeys2.length) {
      attrKeys1
        .filter((attribute) => attrKeys2.indexOf(attribute) == -1)
        .forEach((attribute) => updatedAttributes.add(attribute));
    }

    for (let key of attrKeys1) {
      const attr1 = attributesObj1[key];
      const attr2 = attributesObj2[key];

      if (!shallowCompare(attr1.value, attr2.value)) {
        updatedAttributes.add(key);
        continue;
      }

      if (!deepCompare(attr1.values, attr2.values)) {
        updatedAttributes.add(key);
        continue;
      }
    }

    return Array.from(updatedAttributes);
  }

  _updateConfiguration(configuration) {
    return new Promise(async (resolve) => {
      const currentState = JSON.parse(
        JSON.stringify(this._configurator.getDisplayAttributes())
      );
      await this._configurator.setConfiguration(configuration);
      const updatedState = this._configurator.getDisplayAttributes();
      const updatedAttrs = this._compareAttributes(currentState, updatedState);
      resolve(updatedAttrs);
    });
  }

  setLanguage(language) {
    if (!language) return;
    this._currentLanguage = language;
    return this.getAttributesState();
  }

  getLanguageOptions() {
    return Object.keys(Object.values(this._translations)[0]);
  }

  getAttributesState(attrNames) {
    const attributes = this._configurator.getDisplayAttributes();
    return attributes.reduce((output, attr) => {
      if (attrNames && !attrNames.includes(attr.name)) return output;
      return Object.assign(output, {
        [attr.name]: this._translateAttribute(attr),
      });
    }, {});
  }

  async setAttributesState(configuration) {
    const updatedAttrNames = await this._updateConfiguration(configuration);
    if (!updatedAttrNames.length) return {};

    const updatedConfiguration = this._configurator.getConfiguration();
    this._pushToHistory([configuration, updatedConfiguration]);

    return this.getAttributesState(updatedAttrNames);
  }

  stepHistoryPosition(step) {
    return new Promise(async (resolve) => {
      if (typeof step !== 'number' || step === 0) resolve({});
      if (
        this._historyPosition + step < 0 ||
        this._historyPosition + step >= this._history.length
      )
        resolve({});
      this._historyPosition += step;
      const [_, updatedConfiguration] = this._history[this._historyPosition];
      const updatedAttrNames = await this._updateConfiguration(
        updatedConfiguration
      );
      if (updatedAttrNames.length)
        resolve(this.getAttributesState(updatedAttrNames));
    });
  }

  saveConfiguration(data = {}, options = {}) {
    const {
      configuration,
      productVersion,
      metadata,
      thumbnail,
    } = Object.assign(
      {
        configuration: window.threekit.configurator.getConfiguration(),
        productVersion: 'v1',
        metadata: {},
        thumbnail: '',
      },
      data
    );
    const { returnResumeLink } = Object.assign(
      {
        returnResumeLink: false,
      },
      options
    );
    return new Promise(async (resolve) => {
      const config = await threekitAPI.configurations.save({
        assetId: ASSET_ID,
        configuration,
        productVersion,
        metadata,
        thumbnail,
      });
      resolve(config);
    });
  }

  resumeConfiguration(configurationId) {
    return new Promise(async (resolve) => {
      if (!configurationId) return;
      const config = await threekitAPI.configurations.fetch(configurationId);
      await this.setAttributesState(config.variant);
      resolve();
    });
  }
}

export default Controller;
