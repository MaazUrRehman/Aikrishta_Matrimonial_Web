import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {
    createFamilyBackground,
    getFamilyBackgroundByUserId,
    updateFamilyBackground,
    deleteFamilyBackground,
} from "../../services/profile/familyBackgroundService.js";

/*
|--------------------------------------------------------------------------
| Create Family Background
|--------------------------------------------------------------------------
*/

export const createFamilyBackgroundController = asyncHandler(async (req, res) => {

    const familyBackground = await createFamilyBackground(
        req.user.id,
        req.body
    );

    return new ApiResponse(
        res,
        201,
        "Family background created successfully.",
        familyBackground
    );

});

/*
|--------------------------------------------------------------------------
| Get Family Background
|--------------------------------------------------------------------------
*/

export const getFamilyBackgroundController = asyncHandler(async (req, res) => {

    const userId = req.params.userId || req.user.id;

    const familyBackground = await getFamilyBackgroundByUserId(
        userId
    );

    return new ApiResponse(
        res,
        200,
        "Family background fetched successfully.",
        familyBackground
    );

});

/*
|--------------------------------------------------------------------------
| Update Family Background
|--------------------------------------------------------------------------
*/

export const updateFamilyBackgroundController = asyncHandler(async (req, res) => {

    const familyBackground = await updateFamilyBackground(
        req.user.id,
        req.body
    );

    return new ApiResponse(
        res,
        200,
        "Family background updated successfully.",
        familyBackground
    );

});

/*
|--------------------------------------------------------------------------
| Delete Family Background (Optional)
|--------------------------------------------------------------------------
*/

export const deleteFamilyBackgroundController = asyncHandler(async (req, res) => {

    await deleteFamilyBackground(
        req.user.id
    );

    return new ApiResponse(
        res,
        200,
        "Family background deleted successfully."
    );

});