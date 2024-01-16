import { Router } from "express";
import { UserValidator } from "../validators/user.validator";
import { UserController } from "../controller/user.controller";
import { UserService } from "../service/user.service";

const router = Router();
const controller = new UserController( new UserService() );
const validator = new UserValidator();

router.get("/", controller.get);
router.get("/:id", controller.getOne);

router.post("/", validator.create, controller.create);
router.post("/auth", validator.auth, controller.auth);

router.put("/:id", validator.update, controller.update);

router.delete("/:id", controller.delete);

export default router;