import { Router } from "express";

// controllers
import loginController from "../controllers/ngo/ngoAuthnetication/loginController";
import { signupStepOne } from "../../app/usecases/ngoAuthentication/userSignup/signupStepOne";
import { signupStepTwo } from "../../app/usecases/ngoAuthentication/userSignup/signupStepTwo";


// middlewares
import otpAuthMiddleware from "../../middleware/otpAuthMiddleware";


// validator middlewares
import {loginValidator,ngoSignupTow,signupValidatorOne,} from "../../middleware/requestValidator";

const router = Router();

// POST signup
router.post("/register/stepone", signupValidatorOne, signupStepOne);
router.post("/register/steptwo/:id",ngoSignupTow,otpAuthMiddleware,signupStepTwo);

// POST login
router.post("/login", loginValidator,loginController );

export default router;
