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
        check("tittle", "Tittle is required").not().isEmpty(),
        check("category", "Category is required").not().isEmpty(),
        check("desc", "Description is required").not().isEmpty(),
        check("price", "Price is required").not().isEmpty(),
        check("quantity", "Quantity is required").not().isEmpty(),
        check("color", "Color is required").not().isEmpty(),
        check("size", "Size is required").not().isEmpty(),
        check("images", "Images are required").not().isEmpty(),
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
        check("tittle", "Tittle is required").not().isEmpty(),
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
        check("tittle", "Tittle is required").not().isEmpty(),
        validateJWT,
        isVerified,
        isAdmin,
        errorCollector
    ],
    softDeleteProduct

);

export default router;
