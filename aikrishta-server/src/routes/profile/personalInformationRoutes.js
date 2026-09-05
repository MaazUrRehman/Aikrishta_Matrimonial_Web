import express from "express";
const router = express.Router();
import { protect, isAdmin } from "../../middlewares/authMiddleware.js";
import validate from "../../middlewares/validate.js";
import { uploadProfilePicture } from "../../middlewares/upload.js";
import {
    personalInformationValidation,
    updatePersonalInformationValidation,
} from "../../validations/profile/personalInformationValidation.js";
import {
    createPersonalInformationController,
    getPersonalInformationController,
    updatePersonalInformationController,
    deletePersonalInformationController,
    getOppositeGenderProfilesController,
} from "../../controllers/profile/personalInformationController.js";

router.post(
    "/",
    protect,
    uploadProfilePicture,
    personalInformationValidation,
    validate,
    createPersonalInformationController
);

router.get(
    "/user-profiles",
    protect,
    getOppositeGenderProfilesController
);

router.get(
    "/",
    protect,
    getPersonalInformationController
);

router.get(
    "/:userId",
    protect,
    getPersonalInformationController
);

router.put(
    "/",
    protect,
    uploadProfilePicture,
    updatePersonalInformationValidation,
    validate,
    updatePersonalInformationController
);

router.delete(
    "/",
    protect,
    deletePersonalInformationController
);

export default router;