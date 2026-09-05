import express from "express";
const router = express.Router();
import { protect, isAdmin } from "../../middlewares/authMiddleware.js";
import validate from "../../middlewares/validate.js";
import {
    familyBackgroundValidation,
    updateFamilyBackgroundValidation,
} from "../../validations/profile/familyBackgroundValidation.js";
import {
    createFamilyBackgroundController,
    getFamilyBackgroundController,
    updateFamilyBackgroundController,
    deleteFamilyBackgroundController,
} from "../../controllers/profile/familyBackgroundController.js";


router.post(
    "/",
    protect,
    familyBackgroundValidation,
    validate,
    createFamilyBackgroundController
);

router.get(
    "/",
    protect,
    getFamilyBackgroundController
);

router.get(
    "/:userId",
    protect,
    getFamilyBackgroundController
);

router.put(
    "/",
    protect,
    updateFamilyBackgroundValidation,
    validate,
    updateFamilyBackgroundController
);

router.delete(
    "/",
    protect,
    deleteFamilyBackgroundController
);

export default router;