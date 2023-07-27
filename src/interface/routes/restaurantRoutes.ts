import { Router } from "express";

// controllers
import restaurantStepOneController from "../controllers/restaurant/restaurantAuthenticationControllers/signupController/stepOneController";
import restaurantStepTwoController from "../controllers/restaurant/restaurantAuthenticationControllers/signupController/stepTwoController";
import restaurantLoginController from "../controllers/restaurant/restaurantAuthenticationControllers/loginController"

// middlewares
import otpAuthMiddleware from "../../middleware/otpAuthMiddleware";


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
router.post("/restaurant/login", loginValidator, restaurantLoginController);

export default router;
