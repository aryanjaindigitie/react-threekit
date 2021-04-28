import Joi from 'joi';

export const connectionObj = Joi.object({
  authToken: Joi.string()
    .guid({
      version: ['uuidv4'],
    })
    .required(),
  orgId: Joi.string().required(),
  assetId: Joi.string(),
  threekitEnv: Joi.string(),
});
