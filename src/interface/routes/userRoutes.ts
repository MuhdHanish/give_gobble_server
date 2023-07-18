import { Router } from "express";

// controllers
import stepOneController from "../controllers/userAuthenticationControllers/signupController/stepOneController";
import stepTwoController from "../controllers/userAuthenticationControllers/signupController/stepTwoController";
import loginController from "../controllers/userAuthenticationControllers/LoginController";

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
router.post("/user/register/stepone", signupValidatorOne, stepOneController);
router.post("/user/register/steptwo/:id",signupValidatorTwo,otpAuthMiddleware,stepTwoController
);

// POST restorent signup
router.post("/restorent/register/stepone", signupValidatorOne, stepOneController);
router.post("/restorent/register/steptwo/:id",signupValidatorTwo,otpAuthMiddleware,stepTwoController
);

// POST login
router.post("/login", loginValidator, loginController);

export default router;
