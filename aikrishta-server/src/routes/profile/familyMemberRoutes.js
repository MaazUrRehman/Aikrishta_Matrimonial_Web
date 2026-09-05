import express from "express";
const router = express.Router();
import { protect, isAdmin } from "../../middlewares/authMiddleware.js";
import validate from "../../middlewares/validate.js";
import {
    familyMemberValidation,
    updateFamilyMemberValidation,
} from "../../validations/profile/familyMemberValidation.js";
import {
    createFamilyMemberController,
    getFamilyMemberController,
    updateFamilyMemberController,
    deleteFamilyMemberController,
} from "../../controllers/profile/familyMemberController.js";


router.post(
    "/",
    protect,
    familyMemberValidation,
    validate,
    createFamilyMemberController
);

router.get(
    "/",
    protect,
    getFamilyMemberController
);

router.put(
    "/",
    protect,
    updateFamilyMemberValidation,
    validate,
    updateFamilyMemberController
);

router.delete(
    "/",
    protect,
    deleteFamilyMemberController
);

export default router;