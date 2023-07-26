import { Router } from "express";

// controllers
import userStepOneController from "../controllers/userAuthenticationControllers/signupController/stepOneController";
import userStepTwoController from "../controllers/userAuthenticationControllers/signupController/stepTwoController";
import restaurantStepOneController from "../controllers/restaurantAuthenticationControllers/signupController/stepOneController";
import restaurantStepTwoController from "../controllers/restaurantAuthenticationControllers/signupController/stepTwoController";
import userLoginController from "../controllers/userAuthenticationControllers/LoginController";
import restaurantLoginController from "../controllers/restaurantAuthenticationControllers/LoginController"

// middlewares
import otpAuthMiddleware from "../../middleware/otpAuthMiddleware";


// validator middlewares
import {
  loginValidator,
  signupValidatorOne,
  signupValidatorTwo,
  restaurantSignupOne,
  restaurantSignupTwo
} from "../../middleware/requestValidator";

const router = Router();

// GET

// POST user signup
router.post("/user/register/stepone", signupValidatorOne, userStepOneController);
router.post("/user/register/steptwo/:id",signupValidatorTwo,otpAuthMiddleware,userStepTwoController);

// POST restaurant signup
router.post("/restaurant/register/stepone", restaurantSignupOne,restaurantStepOneController);
router.post("/restaurant/register/steptwo/:id",restaurantSignupTwo,otpAuthMiddleware,restaurantStepTwoController);

// POST login
router.post("/user/login", loginValidator, userLoginController);
router.post("/restaurant/login", loginValidator, restaurantLoginController);

export default router;
