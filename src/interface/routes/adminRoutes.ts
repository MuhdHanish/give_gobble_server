import { Router } from "express";

// controllers
import adminLoginController from "../controllers/admin/adminAuthentication/loginController"
import { acceptNgoController, rejectNgoController } from "../controllers/admin/ngoVerifyController";
import getRequestedNgosController from "../controllers/admin/getRequestedNgosController";

// middlewares
import { adminAuthorization } from "../../middleware";

// validator middlewares
import { loginValidator } from "../../middleware/requestValidator";

const router = Router();

// POST login
router.post("/login", loginValidator, adminLoginController);

// GET 
router.get("/get/ngo/requests",adminAuthorization,getRequestedNgosController);

// PATCH 
router.patch("/accept/ngo/:id([0-9a-fA-F]{24})",adminAuthorization,acceptNgoController);
router.patch("/reject/ngo/:id([0-9a-fA-F]{24})",adminAuthorization,rejectNgoController);

export default router;
