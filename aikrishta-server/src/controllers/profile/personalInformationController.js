import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import AppError from "../../utils/AppError.js";
import mongoose from "mongoose";

import {
    createPersonalInformation,
    getPersonalInformationByUserId,
    updatePersonalInformation,
    deletePersonalInformation,
    getOppositeGenderProfiles,
} from "../../services/profile/personalInformationService.js";

/*
|--------------------------------------------------------------------------
| Create Personal Information
|--------------------------------------------------------------------------
*/

export const createPersonalInformationController = asyncHandler(async (req, res) => {

    const personalInformation = await createPersonalInformation(
        req.user.id,
        req.body,
        req.file
    );

    return new ApiResponse(
        res,
        201,
        "Personal information created successfully.",
        personalInformation
    );

});

/*
|--------------------------------------------------------------------------
| Get Personal Information
|--------------------------------------------------------------------------
*/

export const getPersonalInformationController = asyncHandler(async (req, res, next) => {

    const userId = req.params.userId || req.user.id;

    if (req.params.userId && !mongoose.Types.ObjectId.isValid(req.params.userId)) {
        return next(new AppError("Invalid profile ID format.", 400));
    }

    const personalInformation = await getPersonalInformationByUserId(
        userId
    );

    return new ApiResponse(
        res,
        200,
        "Personal information fetched successfully.",
        personalInformation
    );

});

/*
|--------------------------------------------------------------------------
| Update Personal Information
|--------------------------------------------------------------------------
*/

export const updatePersonalInformationController = asyncHandler(async (req, res) => {

    const personalInformation = await updatePersonalInformation(
        req.user.id,
        req.body,
        req.file
    );

    return new ApiResponse(
        res,
        200,
        "Personal information updated successfully.",
        personalInformation
    );

});

/*
|--------------------------------------------------------------------------
| Delete Personal Information (Optional)
|--------------------------------------------------------------------------
*/

export const deletePersonalInformationController = asyncHandler(async (req, res) => {

    await deletePersonalInformation(
        req.user.id
    );

    return new ApiResponse(
        res,
        200,
        "Personal information deleted successfully."
    );

});

export const getOppositeGenderProfilesController = asyncHandler(async (req, res) => {

    const profiles = await getOppositeGenderProfiles(req.user.id);

    return new ApiResponse(
        res,
        200,
        "Profiles fetched successfully.",
        profiles
    );

});
