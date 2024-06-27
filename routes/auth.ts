import { Router } from "express";
import { getUsers, login, register, verifyUser } from "../controllers/auth";
import { check } from "express-validator";
import { emailExist } from "../helpers/dbValidations";
import { errorCollector } from "../middlewares/errorCollector";
import { validateJWT } from "../middlewares/validateJWT";
import { isAdmin } from "../middlewares/userValidations";

const router = Router();

router.post(
    "/register", 
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Email is required").isEmail(),
        check("password", "Password must be at least 6 characters").isLength({min:6}),
        check("email").custom(emailExist),
        errorCollector
    ], 
    register
);
router.post(
    "/login",
    [
        check("email", "Email is not valid").isEmail(),
        check("email", "Email is required").not().isEmpty(),
        check("password", "Password is required").not().isEmpty(),
        check("password", "Password must be at least 6 characters").isLength({min:6}),
        errorCollector
    ],
    login
);
router.patch(
    "/verify",
    [
        check("email", "Email is not valid").isEmail(),
        check("email", "Email is required").not().isEmpty(),
        check("code").not().isEmpty(),
        validateJWT,
        errorCollector
    ],
    verifyUser
);
router.get(
    "/",
    [
        validateJWT,
        isAdmin,
        errorCollector
    ],
    getUsers
);

export default router;