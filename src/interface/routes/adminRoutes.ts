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
router.get("/get/ngo/requests",  getRequestedNgosController);

// PATCH 
router.patch("/accept/ngo/:id",  acceptNgoController);
router.patch("/reject/ngo/:id",  rejectNgoController);

export default router;
