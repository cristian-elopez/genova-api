import { Router } from "express";
import { createProduct, getProducts, softDeleteProduct, updateProduct } from "../controllers/products";
import { check } from "express-validator";
import { errorCollector } from "../middlewares/errorCollector";
import { validateJWT } from "../middlewares/validateJWT";
import { categoryValidation, productExist, sizeValidation, tittleProductExist } from "../middlewares/productValidations";
import { isAdmin, isVerified } from "../middlewares/userValidations";

const router = Router();

router.post(
    "/create",
    [
        check("tittle", "El título es obligatorio").not().isEmpty(),
        check("category", "La categoría es obligatoria").not().isEmpty(),
        check("desc", "La descripción es obligatoria").not().isEmpty(),
        check("price", "El precio es obligatorio").not().isEmpty(),
        check("quantity", "La cantidad es obligatoria").not().isEmpty(),
        check("color", "El color es obligatorio").not().isEmpty(),
        check("size", "El talle es obligatorio").not().isEmpty(),
        check("images", "Las imágenes son obligatorias").not().isEmpty(),
        validateJWT,
        isVerified,
        isAdmin,
        tittleProductExist,
        categoryValidation,
        sizeValidation,
        errorCollector
    ],
    createProduct
);
router.get(
    "/",
    [
        errorCollector
    ],
    getProducts
);
router.patch(
    "/update",
    [
        check("tittle", "El título es obligatorio").not().isEmpty(),
        validateJWT,
        isVerified,
        isAdmin,
        productExist,
        categoryValidation,
        sizeValidation,
        errorCollector
    ],
    updateProduct
);
router.delete(
    "/delete",
    [
        check("tittle", "El título es obligatorio").not().isEmpty(),
        validateJWT,
        isVerified,
        isAdmin,
        errorCollector
    ],
    softDeleteProduct

);

export default router;
