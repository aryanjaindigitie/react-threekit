import Joi from 'joi';

const connectionObj = Joi.object({
  authToken: Joi.string()
    .guid({
      version: ['uuidv4'],
    })
    .required(),
  orgId: Joi.string().required(),
  assetId: Joi.string(),
  threekitEnv: Joi.string(),
});

const checkRuntime = new Function(
  'try { return this === window; } catch(e) { return false; }'
);

class ThreekitConnection {
  constructor() {
    this._authToken;
    this._orgId;
    this._assetId;
    this._threekitEnv = 'https://admin.threekit.com';
    this._isServerEnv = !checkRuntime();
  }

  async connect(config) {
    const { value, error } = connectionObj.validate(config);
    if (error) throw new Error(error);
    this._authToken = value.authToken;
    this._orgId = value.orgId;
    this._assetId = value.assetId;
    if (value.threekitEnv) this._threekitEnv = `https://${value.threekitEnv}`;
  }

  getConnection() {
    if (!this._authToken)
      throw new Error('Connection has not been established');
    return {
      authToken: this._authToken,
      orgId: this._orgId,
      assetId: this._assetId,
      threekitEnv: this._threekitEnv,
      isServerEnv: this._isServerEnv,
    };
  }
}

const connection = new ThreekitConnection();

export default connection;
