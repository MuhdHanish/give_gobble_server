import { Router } from "express";

// controllers
import loginController from "../controllers/ngo/ngoAuthnetication/loginController";
import removeAccountController from "../controllers/ngo/ngoAuthnetication/removeAccountController";
import stepOneController from "../controllers/ngo/ngoAuthnetication/signupController/stepOneController"
import stepTwoController from "../controllers/ngo/ngoAuthnetication/signupController/stepTwoController";


// middlewares
import otpAuthMiddleware from "../../middleware/otpAuthMiddleware";


// validator middlewares
import {loginValidator,ngoSignupTow,signupValidatorOne,} from "../../middleware/requestValidator";

const router = Router();

// POST signup
router.post("/register/stepone", signupValidatorOne, stepOneController);
router.post("/register/steptwo/:id",ngoSignupTow,otpAuthMiddleware,stepTwoController);

// POST login
router.post("/login", loginValidator, loginController);

// PATCH 
router.patch("/remove/account/:id", removeAccountController);

export default router;
