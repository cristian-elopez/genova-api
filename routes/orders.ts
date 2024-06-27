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
        check("price", "Price is required").not().isEmpty(),
        check("shippingCost", "Shipping Cost are required").not().isEmpty(),
        check("shippingDetails", "Shipping Details are required").not().isEmpty(),
        check("total", "Total is required").not().isEmpty(),
        check("products", "Products are required").not().isEmpty(),
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