import { Router } from "express";

// controllers
import refreshTokenController from "../controllers/token/tokenController";
import { refreshAuthorization } from "../../middleware";


const router = Router();

router.post("/", refreshAuthorization, refreshTokenController);

export default router;
