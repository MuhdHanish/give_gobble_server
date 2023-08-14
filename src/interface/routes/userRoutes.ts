import { Router } from "express";

// controllers
import userStepOneController from "../controllers/user/userAuthenticationControllers/signupController/stepOneController";
import userStepTwoController from "../controllers/user/userAuthenticationControllers/signupController/stepTwoController";
import resetUserPasswordController from "../controllers/user/userAuthenticationControllers/resetUserPasswordController";
import userLoginController from "../controllers/user/userAuthenticationControllers/loginController";
import postFoodRequestController from "../controllers/foodRequestManage/postRequestController";
import forgotUserPasswordController from "../controllers/user/userAuthenticationControllers/forgotUserPasswordController";
import { getRequestHistoryController, removeAllRequestFromHistoryController, removeRequestFromHistoryController } from "../controllers/foodRequestManage/historyController/historyController";

// middlewares
import { userAuthorization } from "../../middleware";
import otpAuthMiddleware from "../../middleware/otpAuthMiddleware";
import otpPasswordVerifyMiddleware from "../../middleware/otpPasswordVerifyMiddelware";


// validator middlewares
import {
  forgotPasswordValidator,
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

// POST Food Requeset
router.post("/post/food/request", userAuthorization, postFoodRequestController);

// POST Forgot password request
router.post("/forgot/password", forgotPasswordValidator, forgotUserPasswordController);

// POST Verify password request
router.post("/verify/password/request/:id", otpPasswordVerifyMiddleware);

// PATCH Reset Password
router.patch("/reset/password", loginValidator, resetUserPasswordController);

// GET Request history
router.get("/get/request/history/:id([0-9a-fA-F]{24})", userAuthorization, getRequestHistoryController);

// DELETE Remove request
router.delete("/delete/request/history/:id([0-9a-fA-F]{24})", userAuthorization, removeRequestFromHistoryController);
router.delete("/delete/all/request/history/:id([0-9a-fA-F]{24})", userAuthorization, removeAllRequestFromHistoryController);

export default router;
