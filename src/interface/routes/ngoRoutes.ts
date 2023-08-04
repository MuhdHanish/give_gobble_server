import { Router } from "express";

// controllers
import loginController from "../controllers/ngo/ngoAuthnetication/loginController";
import removeAccountController from "../controllers/ngo/ngoAuthnetication/removeAccountController";
import stepOneController from "../controllers/ngo/ngoAuthnetication/signupController/stepOneController"
import stepTwoController from "../controllers/ngo/ngoAuthnetication/signupController/stepTwoController";
import resetNgoPasswordController from "../controllers/ngo/ngoAuthnetication/resetNgoPasswordController";


// middlewares
import otpAuthMiddleware from "../../middleware/otpAuthMiddleware";


// validator middlewares
import {loginValidator,ngoSignupTow,signupValidatorOne,} from "../../middleware/requestValidator";
import { ngoAuthorization } from "../../middleware";
import { getAcceptedRequestsController, getCompletedRequestsController, getPendingRequestsContorller, getSelectedRequest } from "../controllers/foodRequestManage/getRequestsController";
import { acceptRequestController, completeRequestController } from "../controllers/foodRequestManage/manageRequestsController";

const router = Router();

// POST signup
router.post("/register/stepone", signupValidatorOne, stepOneController);
router.post("/register/steptwo/:id",ngoSignupTow,otpAuthMiddleware,stepTwoController);

// POST login
router.post("/login", loginValidator, loginController);

// GET get requests
router.get("/get/pending/requests",ngoAuthorization,getPendingRequestsContorller);
router.get("/get/accepted/requests", ngoAuthorization, getAcceptedRequestsController);
router.get("/get/completed/requests", ngoAuthorization,  getCompletedRequestsController);

router.get("/get/seleted/request/:id", ngoAuthorization,  getSelectedRequest);

// PATCH account
router.patch("/remove/account/:id",ngoAuthorization, removeAccountController);

// PATCH requests
router.patch("/accept/request/:id",ngoAuthorization, acceptRequestController)
router.patch("/complete/request/:id", ngoAuthorization, completeRequestController);

// PATCH Reset Password
router.patch("/reset/password", ngoAuthorization, loginValidator, resetNgoPasswordController);

export default router;
