import { Router } from "express";

// controllers
import adminLoginController from "../controllers/admin/adminAuthentication/loginController"

// middlewares


// validator middlewares
import { loginValidator } from "../../middleware/requestValidator";
import { adminAuthorization } from "../../middleware";

const router = Router();


// GET 
router.get("/get/ngo/requests",adminAuthorization,)

// POST login
router.post("/login", loginValidator, adminLoginController);


export default router;
