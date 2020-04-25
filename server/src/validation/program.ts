import { celebrate, Joi, Segments } from "celebrate";

const getAll = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().integer().min(1).required(),
    limit: Joi.number().integer().min(10).required(),
    filter: Joi.string().optional(),
  }),
});

const request = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    url: Joi.string()
      .regex(
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
      )
      .message("Invalid URL pattern")
      .optional(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
});

export default {
  getAll,
  request,
};
