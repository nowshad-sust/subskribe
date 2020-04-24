import { celebrate, Joi, Segments } from "celebrate";

const getAll = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().integer().required(),
    limit: Joi.number().integer().required(),
  }),
});

const request = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    url: Joi.string().optional(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
});

export default {
  getAll,
  request,
};
