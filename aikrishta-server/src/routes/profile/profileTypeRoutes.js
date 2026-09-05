import express from "express";
const router = express.Router();
import { protect, isAdmin } from "../../middlewares/authMiddleware.js";
import validate from "../../middlewares/validate.js";
import {
    profileTypeValidation,
    updateProfileTypeValidation,
} from "../../validations/profile/profileTypeValidation.js";
import {
    createProfileTypeController,
    getProfileTypeController,
    updateProfileTypeController,
    deleteProfileTypeController,
} from "../../controllers/profile/profileTypeController.js";

router.post(
    "/",
    protect,
    profileTypeValidation,
    validate,
    createProfileTypeController
);

router.get(
    "/",
    protect,
    getProfileTypeController
);

router.put(
    "/",
    protect,
    updateProfileTypeValidation,
    validate,
    updateProfileTypeController
);

router.delete(
    "/",
    protect,
    deleteProfileTypeController
);

export default router;