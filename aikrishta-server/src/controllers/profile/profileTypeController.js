import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {
    createProfileType,
    getProfileTypeByUserId,
    updateProfileType,
    deleteProfileType,
} from "../../services/profile/profileTypeService.js";

/*
|--------------------------------------------------------------------------
| Create Profile Type
|--------------------------------------------------------------------------
*/

export const createProfileTypeController = asyncHandler(async (req, res) => {

    const profileType = await createProfileType(
        req.user.id,
        req.body
    );

    return new ApiResponse(
        res,
        201,
        "Profile type created successfully.",
        profileType
    );

});

/*
|--------------------------------------------------------------------------
| Get Profile Type
|--------------------------------------------------------------------------
*/

export const getProfileTypeController = asyncHandler(async (req, res) => {

    const profileType = await getProfileTypeByUserId(
        req.user.id
    );

    return new ApiResponse(
        res,
        200,
        "Profile type fetched successfully.",
        profileType
    );

});

/*
|--------------------------------------------------------------------------
| Update Profile Type
|--------------------------------------------------------------------------
*/

export const updateProfileTypeController = asyncHandler(async (req, res) => {

    const profileType = await updateProfileType(
        req.user.id,
        req.body
    );

    return new ApiResponse(
        res,
        200,
        "Profile type updated successfully.",
        profileType
    );

});

/*
|--------------------------------------------------------------------------
| Delete Profile Type (Optional)
|--------------------------------------------------------------------------
*/

export const deleteProfileTypeController = asyncHandler(async (req, res) => {

    await deleteProfileType(
        req.user.id
    );

    return new ApiResponse(
        res,
        200,
        "Profile type deleted successfully."
    );

});