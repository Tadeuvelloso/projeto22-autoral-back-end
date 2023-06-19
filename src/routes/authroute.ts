import { Router } from "express";
import { userSchema, userLoginSchema } from "../schemas/userSchemas.js";
import { checkUserObj } from "../middlewares/schemaValidation.js";
import { signIn, signUp } from "../controllers/authControllers.js";

const router = Router();

router.post("/signup", checkUserObj(userSchema), signUp);
router.post("/signin", checkUserObj(userLoginSchema), signIn);

export default router;