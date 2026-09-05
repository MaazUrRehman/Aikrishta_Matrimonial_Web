import express from "express";
const router = express.Router();
import { protect, isAdmin } from "../../middlewares/authMiddleware.js";
import validate from "../../middlewares/validate.js";
import {
    contactProfessionalValidation,
    updateContactProfessionalValidation,
} from "../../validations/profile/contactProfessionalValidation.js";
import {
    createContactProfessionalController,
    getContactProfessionalController,
    updateContactProfessionalController,
    deleteContactProfessionalController,
} from "../../controllers/profile/contactProfessionalController.js";

router.post(
    "/",
    protect,
    contactProfessionalValidation,
    validate,
    createContactProfessionalController
);

router.get(
    "/",
    protect,
    getContactProfessionalController
);

router.get(
    "/:userId",
    protect,
    getContactProfessionalController
);

router.put(
    "/",
    protect,
    updateContactProfessionalValidation,
    validate,
    updateContactProfessionalController
);

router.delete(
    "/",
    protect,
    deleteContactProfessionalController
);

export default router;