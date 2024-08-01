import { Router } from "express";
import { createOrders, getOrders } from "../controllers/orders";
import { check } from "express-validator";
import { validateJWT } from "../middlewares/validateJWT";
import { errorCollector } from "../middlewares/errorCollector";
import { isVerified } from "../middlewares/userValidations";

const router = Router();

router.post(
    "/create",
    [
        check("price", "El precio es obligatorio").not().isEmpty(),
        check("shippingCost", "Los gastos de envío son obligatorios").not().isEmpty(),
        check("shippingDetails", "Los detalles de envío obligatorios").not().isEmpty(),
        check("total", "El total es obligatorio").not().isEmpty(),
        check("products", "Los productos son obligatorios").not().isEmpty(),
        validateJWT,
        isVerified,
        errorCollector
    ],
    createOrders
);
router.get(
    "/",
    [
        validateJWT,
        isVerified,
        errorCollector
    ],
    getOrders
);

export default router;