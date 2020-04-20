import { celebrate, Joi, Segments } from "celebrate";

const getAll = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().integer().required(),
    limit: Joi.number().integer().required(),
  }),
});

export default {
  getAll,
};
