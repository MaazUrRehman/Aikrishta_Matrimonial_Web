import express from "express";
const router = express.Router();
import { protect, isAdmin } from "../../middlewares/authMiddleware.js";
import validate from "../../middlewares/validate.js";
import {
    partnerPreferenceValidation,
    updatePartnerPreferenceValidation,
} from "../../validations/profile/partnerPreferenceValidation.js";
import {
    createPartnerPreferenceController,
    getPartnerPreferenceController,
    updatePartnerPreferenceController,
    deletePartnerPreferenceController,
} from "../../controllers/profile/partnerPreferenceController.js";


router.post(
    "/",
    protect,
    partnerPreferenceValidation,
    validate,
    createPartnerPreferenceController
);

router.get(
    "/",
    protect,
    getPartnerPreferenceController
);

router.get(
    "/:userId",
    protect,
    getPartnerPreferenceController
);

router.put(
    "/",
    protect,
    updatePartnerPreferenceValidation,
    validate,
    updatePartnerPreferenceController
);

router.delete(
    "/",
    protect,
    deletePartnerPreferenceController
);

export default router;