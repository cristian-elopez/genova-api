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
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El correo electrónico es obligatorio").isEmail(),
        check("password", "La contraseña debe tener al menos 6 caracteres").isLength({min:6}),
        check("email").custom(emailExist),
        errorCollector
    ], 
    register
);
router.post(
    "/login",
    [
        check("email", "El correo electrónico no es válido").isEmail(),
        check("email", "El correo electrónico es obligatorio").not().isEmpty(),
        check("password", "La contraseña es obligatoria").not().isEmpty(),
        check("password", "La contraseña debe tener al menos 6 caracteres").isLength({min:6}),
        errorCollector
    ],
    login
);
router.patch(
    "/verify",
    [
        check("email", "El correo electrónico no es válido").isEmail(),
        check("email", "El correo electrónico es obligatorio").not().isEmpty(),
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