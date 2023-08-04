import { Router } from "express";

// controllers
import restaurantStepOneController from "../controllers/restaurant/restaurantAuthenticationControllers/signupController/stepOneController";
import restaurantStepTwoController from "../controllers/restaurant/restaurantAuthenticationControllers/signupController/stepTwoController";
import resetRestaurantPasswordController from "../controllers/restaurant/restaurantAuthenticationControllers/restRestaurantPassword";
import restaurantLoginController from "../controllers/restaurant/restaurantAuthenticationControllers/loginController"
import postFoodRequestController from "../controllers/foodRequestManage/postRequestController";

// middlewares
import otpAuthMiddleware from "../../middleware/otpAuthMiddleware";
import { userAuthorization } from "../../middleware";


// validator middlewares
import {
  loginValidator,
  signupValidatorTwo,
  restaurantSignupTwo
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

// PATCH Reset Password
router.patch("/reset/password", userAuthorization, loginValidator, resetRestaurantPasswordController);

export default router;
