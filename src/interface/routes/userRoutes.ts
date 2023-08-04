import { Router } from "express";

// controllers
import userStepOneController from "../controllers/user/userAuthenticationControllers/signupController/stepOneController";
import userStepTwoController from "../controllers/user/userAuthenticationControllers/signupController/stepTwoController";
import resetUserPasswordController from "../controllers/user/userAuthenticationControllers/resetUserPasswordController";
import userLoginController from "../controllers/user/userAuthenticationControllers/loginController";
import postFoodRequestController from "../controllers/foodRequestManage/postRequestController";

// middlewares
import otpAuthMiddleware from "../../middleware/otpAuthMiddleware";


// validator middlewares
import {
  forgotPasswordValidator,
  loginValidator,
  signupValidatorOne,
  signupValidatorTwo,
} from "../../middleware/requestValidator";
import { userAuthorization } from "../../middleware";
import forgotUserPasswordController from "../controllers/user/userAuthenticationControllers/forgotUserPasswordController";

const router = Router();

// POST user signup
router.post("/register/stepone", signupValidatorOne, userStepOneController);
router.post("/register/steptwo/:id",signupValidatorTwo,otpAuthMiddleware,userStepTwoController);

// POST login
router.post("/login", loginValidator, userLoginController);

// POST Food Requeset
router.post("/post/food/request", userAuthorization, postFoodRequestController);

// POST Forgot password request
router.post("/forgot/password", forgotPasswordValidator, forgotUserPasswordController);

// PATCH Reset Password
router.patch("/reset/password", loginValidator, resetUserPasswordController);

export default router;
