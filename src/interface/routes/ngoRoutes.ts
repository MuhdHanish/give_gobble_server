import { Router } from "express";

// controllers
import loginController from "../controllers/ngo/ngoAuthnetication/loginController";
import removeAccountController from "../controllers/ngo/ngoAuthnetication/removeAccountController";
import stepOneController from "../controllers/ngo/ngoAuthnetication/signupController/stepOneController"
import stepTwoController from "../controllers/ngo/ngoAuthnetication/signupController/stepTwoController";
import resetNgoPasswordController from "../controllers/ngo/ngoAuthnetication/resetNgoPasswordController";
import { getAcceptedRequestsController, getCompletedRequestsController, getPendingRequestsContorller, getSelectedRequestController } from "../controllers/foodRequestManage/getRequestsController";
import { acceptRequestController, completeRequestController } from "../controllers/foodRequestManage/manageRequestsController";
import forgotNgoPasswordController from "../controllers/ngo/ngoAuthnetication/forgotNgoPasswordController";


// middlewares
import otpAuthMiddleware from "../../middleware/otpAuthMiddleware";
import otpPasswordVerifyMiddleware from "../../middleware/otpPasswordVerifyMiddelware";


// validator middlewares
import {forgotPasswordValidator, loginValidator,ngoSignupTow,signupValidatorOne,} from "../../middleware/requestValidator";
import { ngoAuthorization } from "../../middleware";

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

router.get("/get/selected/request/:id([0-9a-fA-F]{24})", ngoAuthorization,  getSelectedRequestController);

// PATCH account
router.patch("/remove/account/:id([0-9a-fA-F]{24})",ngoAuthorization, removeAccountController);

// PATCH requests
router.patch("/accept/request/:id([0-9a-fA-F]{24})",ngoAuthorization, acceptRequestController)
router.patch("/complete/request/:id([0-9a-fA-F]{24})", ngoAuthorization, completeRequestController);

// POST Forgot password request
router.post("/forgot/password", forgotPasswordValidator, forgotNgoPasswordController);

// POST Verify password request
router.post("/verify/password/request/:id", otpPasswordVerifyMiddleware);

// PATCH Reset Password
router.patch("/reset/password", loginValidator, resetNgoPasswordController);

export default router;
