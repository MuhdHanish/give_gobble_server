import { Router } from "express";

// controllers
import stepOneController from "../controllers/common/signupController/stepOneController";
import stepTwoController from "../controllers/common/signupController/stepTwoController";
import loginController from "../controllers/common/LoginController";

// middlewares
import otpAuthMiddleware from "../../middleware/otpAuthMiddleware";

// validator middlewares
import {
  loginValidator,
  signupValidatorOne,
  signupValidatorTwo,
} from "../../utils/requestValidator";
import userAuthorization from "../../middleware/userAuthorizationMiddleware";

const router = Router();

// GET

// POST  signup
router.post("/user/register/stepone", signupValidatorOne, stepOneController);
router.post("/user/register/steptwo/:id",signupValidatorTwo,otpAuthMiddleware,stepTwoController
);

// POST login
router.post("/login", loginValidator, loginController);

export default router;
