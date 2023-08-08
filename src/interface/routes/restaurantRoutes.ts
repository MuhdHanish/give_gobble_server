import { Router } from "express";

// controllers
import restaurantStepOneController from "../controllers/restaurant/restaurantAuthenticationControllers/signupController/stepOneController";
import restaurantStepTwoController from "../controllers/restaurant/restaurantAuthenticationControllers/signupController/stepTwoController";
import resetRestaurantPasswordController from "../controllers/restaurant/restaurantAuthenticationControllers/restRestaurantPassword";
import restaurantLoginController from "../controllers/restaurant/restaurantAuthenticationControllers/loginController"
import postFoodRequestController from "../controllers/foodRequestManage/postRequestController";
import forgotRestaurantPasswordController from "../controllers/restaurant/restaurantAuthenticationControllers/forgotRestaurantPasswordController";
import { getRequestHistoryController, removeAllRequestFromHistoryController, removeRequestFromHistoryController } from "../controllers/foodRequestManage/historyController/historyController";

// middlewares
import { userAuthorization } from "../../middleware";
import otpAuthMiddleware from "../../middleware/otpAuthMiddleware";
import otpPasswordVerifyMiddleware from "../../middleware/otpPasswordVerifyMiddelware";


// validator middlewares
import {
  loginValidator,
  signupValidatorTwo,
  restaurantSignupTwo,
  forgotPasswordValidator
} from "../../middleware/requestValidator";

const router = Router();

// GET

// POST  signup
router.post("/register/stepone", signupValidatorTwo,restaurantStepOneController);
router.post("/register/steptwo/:id",restaurantSignupTwo,otpAuthMiddleware,restaurantStepTwoController);

// POST login
router.post("/login", loginValidator, restaurantLoginController);

// POST Food Requeset
router.post("/post/food/request", userAuthorization, postFoodRequestController)

// POST Forgot password request
router.post("/forgot/password", forgotPasswordValidator, forgotRestaurantPasswordController);

// POST Verify password request
router.post("/verify/password/request/:id", otpPasswordVerifyMiddleware);

// PATCH Reset Password
router.patch("/reset/password", loginValidator, resetRestaurantPasswordController);


// GET Request history
router.get("/get/request/history/:id([0-9a-fA-F]{24})", userAuthorization, getRequestHistoryController);

// DELETE Remove request
router.delete("/delete/request/history/:idid([0-9a-fA-F]{24})", userAuthorization, removeRequestFromHistoryController);
router.delete("/delete/all/request/history/:id([0-9a-fA-F]{24})", userAuthorization, removeAllRequestFromHistoryController);

export default router;
