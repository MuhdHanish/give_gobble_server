import { Router } from "express";

// controllers
import userStepOneController from "../controllers/user/userAuthenticationControllers/signupController/stepOneController";
import userStepTwoController from "../controllers/user/userAuthenticationControllers/signupController/stepTwoController";
import userLoginController from "../controllers/user/userAuthenticationControllers/loginController";

// middlewares
import otpAuthMiddleware from "../../middleware/otpAuthMiddleware";


// validator middlewares
import {
  loginValidator,
  signupValidatorOne,
  signupValidatorTwo,
} from "../../middleware/requestValidator";

const router = Router();

// POST user signup
router.post("/register/stepone", signupValidatorOne, userStepOneController);
router.post("/register/steptwo/:id",signupValidatorTwo,otpAuthMiddleware,userStepTwoController);

// POST login
router.post("/login", loginValidator, userLoginController);

export default router;
