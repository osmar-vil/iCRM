import { Router } from "express";
import { UserValidator } from "../validators/user.validator";
import { UserController } from "../controller/user.controller";
import { UserService } from "../service/user.service";

const router = Router();
const controller = new UserController( new UserService() );
const validator = new UserValidator();

router.get("/", controller.get);

router.post("/", validator.create, controller.create);
router.post("/auth", validator.auth, controller.auth);

export default router;