import { Request, Response, Router } from "express";
import { validate } from "class-validator";
import * as jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();
const jwtSecret: string = process.env.JWT_SECRET as string;
const jwtExpiresIn: string = process.env.JWT_EXPIRES_IN as string;

router.post("/login", async (req: Request, res: Response) => {
  // Check if email and password are set
  const { email, password } = req.body;
  if (!(email && password)) {
    res.status(400).json("bad request");
  }

  let user: User;
  try {
    // Get user from database
    user = await User.findOneOrFail({ where: { email } });
  } catch (error) {
    res.status(401).json("unauthorized");
    return;
  }

  // Check if encrypted password match
  if (!user.checkIfUnencryptedPasswordIsValid(password)) {
    res.status(401).json("unauthorized");
    return;
  }

  // Sing JWT, valid for 1 hour
  const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, {
    expiresIn: jwtExpiresIn,
  });

  // Send the jwt in the response
  res.json(token);
});

// Create a new user
router.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = new User();
  user.email = email;
  user.password = password;
  user.hashPassword();

  try {
    await User.save(user);
  } catch (e) {
    res.status(409).json("email already in use");
    return;
  }

  res.status(201).json("User created");
});

router.post(
  "/change-password",
  [checkJwt],
  async (req: Request, res: Response) => {
    // Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    // Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).json("bad request");
    }

    let user: User;
    try {
      // Get user from the database
      user = await User.findOneOrFail(id);
    } catch (id) {
      return res.status(401).json("unauthorized");
    }

    // Check if old password matchs
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).json("unauthorized");
      return;
    }

    // Validate de model (password lenght)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).json(errors);
      return;
    }
    // Hash the new password and save
    user.hashPassword();
    User.save(user);

    res.status(201).json("password updated!");
  }
);

export default router;
