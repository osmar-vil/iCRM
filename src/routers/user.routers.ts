import { Router } from "express";
import { Controller } from "../controller/base";
import { UserService } from "../service/user.service";
import { UserValidator } from "../validators/user.validator";

const router = Router();
const controller = new Controller( new UserService() );
const validator = new UserValidator();

router.get("/", controller.get);

router.post("/", validator.create, controller.create);

export default router;