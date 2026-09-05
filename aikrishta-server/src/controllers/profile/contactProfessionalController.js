import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {
    createContactProfessional,
    getContactProfessionalByUserId,
    updateContactProfessional,
    deleteContactProfessional,
} from "../../services/profile/contactProfessionalService.js";

/*
|--------------------------------------------------------------------------
| Create Contact & Professional Information
|--------------------------------------------------------------------------
*/

export const createContactProfessionalController = asyncHandler(async (req, res) => {

    const contactProfessional = await createContactProfessional(
        req.user.id,
        req.body
    );

    return new ApiResponse(
        res,
        201,
        "Contact and professional information created successfully.",
        contactProfessional
    );

});

/*
|--------------------------------------------------------------------------
| Get Contact & Professional Information
|--------------------------------------------------------------------------
*/

export const getContactProfessionalController = asyncHandler(async (req, res) => {

    const userId = req.params.userId || req.user.id;

    const contactProfessional = await getContactProfessionalByUserId(
        userId
    );

    return new ApiResponse(
        res,
        200,
        "Contact and professional information fetched successfully.",
        contactProfessional
    );

});

/*
|--------------------------------------------------------------------------
| Update Contact & Professional Information
|--------------------------------------------------------------------------
*/

export const updateContactProfessionalController = asyncHandler(async (req, res) => {

    const contactProfessional = await updateContactProfessional(
        req.user.id,
        req.body
    );

    return new ApiResponse(
        res,
        200,
        "Contact and professional information updated successfully.",
        contactProfessional
    );

});

/*
|--------------------------------------------------------------------------
| Delete Contact & Professional Information (Optional)
|--------------------------------------------------------------------------
*/

export const deleteContactProfessionalController = asyncHandler(async (req, res) => {

    await deleteContactProfessional(
        req.user.id
    );

    return new ApiResponse(
        res,
        200,
        "Contact and professional information deleted successfully."
    );

});