import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {
    createPartnerPreference,
    getPartnerPreferenceByUserId,
    updatePartnerPreference,
    deletePartnerPreference,
} from "../../services/profile/partnerPreferenceService.js";

/*
|--------------------------------------------------------------------------
| Create Partner Preference
|--------------------------------------------------------------------------
*/

export const createPartnerPreferenceController = asyncHandler(async (req, res) => {

    const partnerPreference = await createPartnerPreference(
        req.user.id,
        req.body
    );

    return new ApiResponse(
        res,
        201,
        "Partner preference created successfully.",
        partnerPreference
    );

});

/*
|--------------------------------------------------------------------------
| Get Partner Preference
|--------------------------------------------------------------------------
*/

export const getPartnerPreferenceController = asyncHandler(async (req, res) => {

    const userId = req.params.userId || req.user.id;

    const partnerPreference = await getPartnerPreferenceByUserId(
        userId
    );

    return new ApiResponse(
        res,
        200,
        "Partner preference fetched successfully.",
        partnerPreference
    );

});

/*
|--------------------------------------------------------------------------
| Update Partner Preference
|--------------------------------------------------------------------------
*/

export const updatePartnerPreferenceController = asyncHandler(async (req, res) => {

    const partnerPreference = await updatePartnerPreference(
        req.user.id,
        req.body
    );

    return new ApiResponse(
        res,
        200,
        "Partner preference updated successfully.",
        partnerPreference
    );

});

/*
|--------------------------------------------------------------------------
| Delete Partner Preference (Optional)
|--------------------------------------------------------------------------
*/

export const deletePartnerPreferenceController = asyncHandler(async (req, res) => {

    await deletePartnerPreference(
        req.user.id
    );

    return new ApiResponse(
        res,
        200,
        "Partner preference deleted successfully."
    );

});