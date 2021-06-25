import connection from '../connection';
import threekitAPI from '../api';
import { shallowCompare, deepCompare } from '../utils';

class Controller {
  constructor({ player, configurator, translations, language, toolsList }) {
    //  Threekit API
    this._player = player;
    this._configurator = configurator;
    //  Translations
    this._translations = translations;
    this._currentLanguage = language;
    //  History
    this._history = [[{}, configurator.getConfiguration()]];
    this._historyPosition = 0;
    //  Tools
    this._toolsList = toolsList;
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
      const player = await window.threekitPlayer({
        el,
        authToken,
        assetId,
        orgId,
      });
      const configurator = await player.getConfigurator();
      resolve({ player, configurator });
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
        additionalTools,
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

      const [
        { player, configurator },
        [translations, translationErrors],
      ] = await Promise.all([
        this.initThreekit({ el, authToken, orgId, assetId }),
        threekitAPI.products.fetchTranslations(),
      ]);

      let toolsList;
      if (additionalTools?.length) {
        toolsList = new Set([]);
        additionalTools.flat().forEach((toolFunc) => {
          const tool = toolFunc(player);
          if (toolsList.has(tool.key)) return;
          toolsList.add(tool.key);
          player.tools.addTool(tool);
        });
      }

      if (translationErrors) console.log(translationErrors);

      window.threekit = {
        player,
        configurator,
        controller: new Controller({
          player,
          configurator,
          translations: translations,
          language,
          toolsList,
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

    //  We compare the attributes on in each object
    attrKeys2
      .filter((attribute) => attrKeys1.indexOf(attribute) === -1)
      .forEach((attribute) => updatedAttributes.add(attribute));
    attrKeys1
      .filter((attribute) => attrKeys2.indexOf(attribute) === -1)
      .forEach((attribute) => updatedAttributes.add(attribute));

    for (let key of attrKeys1) {
      const attr1 = attributesObj1[key];
      const attr2 = attributesObj2[key];

      if (!attr1 || !attr2) continue;

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

  addTool(tools) {
    if (!tools) return;
    const toolsToAdd = Array.isArray(tools) ? tools : [tools];

    toolsToAdd.flat().forEach((toolFunc) => {
      const tool = toolFunc(this._player);
      if (this._toolsList.has(tool.key))
        return console.log(`The tool '${tool.label} has already been added.'`);
      this._toolsList.add(tool.key);
      this._player.tools.addTool(tool);
    });
  }

  setLanguage(language) {
    if (!language) return;
    this._currentLanguage = language;
    return this.getAttributesState();
  }

  getLanguage() {
    return this._currentLanguage;
  }

  getLanguageOptions() {
    return Object.keys(Object.values(this._translations)[0]);
  }

  getAttributesState(attrNames) {
    const attributes = this._configurator.getDisplayAttributes();
    const attributesObj =
      attrNames?.reduce(
        (output, el) => Object.assign(output, { [el]: undefined }),
        {}
      ) || {};
    return attributes.reduce((output, attr) => {
      if (attrNames && !attrNames.includes(attr.name)) return output;
      return Object.assign(output, {
        [attr.name]: this._translateAttribute(attr),
      });
    }, attributesObj);
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
      if (isNaN(step) || step === 0) resolve({});
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
    return threekitAPI.configurations.save({
      assetId: window.threekit.player.assetId,
      configuration,
      productVersion,
      metadata,
      thumbnail,
    });
  }

  resumeConfiguration(configurationId) {
    return new Promise(async (resolve) => {
      if (!configurationId) return;
      const [config, error] = await threekitAPI.configurations.fetch(
        configurationId
      );
      if (error) throw new Error(error);
      await this.setAttributesState(config.variant);
      resolve();
    });
  }

  getBom() {
    const attributes = window.threekit.configurator.getDisplayAttributes();
    return attributes.reduce((output, attr) => {
      const value =
        attr.type !== 'Asset'
          ? attr.value
          : attr.values.find((el) => el.assetId === attr.value?.assetId);
      return Object.assign(output, { [attr.name]: value });
    }, {});
  }
}

export default Controller;
