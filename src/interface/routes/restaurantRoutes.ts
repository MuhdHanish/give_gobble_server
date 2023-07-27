import { Router } from "express";

// controllers
import restaurantStepOneController from "../controllers/restaurant/restaurantAuthenticationControllers/signupController/stepOneController";
import restaurantStepTwoController from "../controllers/restaurant/restaurantAuthenticationControllers/signupController/stepTwoController";
import restaurantLoginController from "../controllers/restaurant/restaurantAuthenticationControllers/loginController"
import postFoodRequestController from "../controllers/ngo/foodRequestManage/postRequestController";

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
router.post("/post/food/request",postFoodRequestController)

export default router;
