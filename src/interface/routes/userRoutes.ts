import { Router } from "express";

// controllers
import userStepOneController from "../controllers/userAuthenticationControllers/signupController/stepOneController";
import userStepTwoController from "../controllers/userAuthenticationControllers/signupController/stepTwoController";
import restorentStepOneController from "../controllers/restorentAuthenticationControllers/signupController/stepOneController";
import restorentStepTwoController from "../controllers/restorentAuthenticationControllers/signupController/stepTwoController";
import userLoginController from "../controllers/userAuthenticationControllers/LoginController";
import restorentLoginController from "../controllers/restorentAuthenticationControllers/LoginController"

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

// POST user signup
router.post("/user/register/stepone", signupValidatorOne, userStepOneController);
router.post("/user/register/steptwo/:id",signupValidatorTwo,otpAuthMiddleware,userStepTwoController);

// POST restorent signup
router.post("/restorent/register/stepone", signupValidatorOne,restorentStepOneController);
router.post("/restorent/register/steptwo/:id",signupValidatorTwo,otpAuthMiddleware,restorentStepTwoController);

// POST login
router.post("/user/login", loginValidator, userLoginController);
router.post("/restorent/login", loginValidator, restorentLoginController);

export default router;
