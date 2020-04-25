import { celebrate, Joi, Segments } from "celebrate";

const login = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  }),
});

const register = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      confirmPassword: Joi.ref("password"),
    })
    .with("password", "confirmPassword"),
});

const changePassword = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      oldPassword: Joi.string().required(),
      newPassword: Joi.string().disallow(Joi.ref("oldPassword")).required(),
      confirmNewPassword: Joi.ref("newPassword"),
    })
    .with("newPassword", "confirmNewPassword"),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
});

export default {
  login,
  register,
  changePassword,
};
