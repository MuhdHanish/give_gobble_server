import { Router } from "express";

// controllers
import adminLoginController from "../controllers/adminAuthentication/loginController"

// middlewares


// validator middlewares
import { loginValidator } from "../../middleware/requestValidator";

const router = Router();

// GET

// POST login
router.post("/login", loginValidator, adminLoginController);


export default router;
