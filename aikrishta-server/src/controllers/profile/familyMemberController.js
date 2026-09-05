import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {
    createFamilyMember,
    getFamilyMemberByUserId,
    updateFamilyMember,
    deleteFamilyMember,
} from "../../services/profile/familyMemberService.js";

/*
|--------------------------------------------------------------------------
| Create Family Member
|--------------------------------------------------------------------------
*/

export const createFamilyMemberController = asyncHandler(async (req, res) => {

    const familyMember = await createFamilyMember(
        req.user.id,
        req.body
    );

    return new ApiResponse(
        res,
        201,
        "Family member information created successfully.",
        familyMember
    );

});

/*
|--------------------------------------------------------------------------
| Get Family Member
|--------------------------------------------------------------------------
*/

export const getFamilyMemberController = asyncHandler(async (req, res) => {

    const familyMember = await getFamilyMemberByUserId(
        req.user.id
    );

    return new ApiResponse(
        res,
        200,
        "Family member information fetched successfully.",
        familyMember
    );

});

/*
|--------------------------------------------------------------------------
| Update Family Member
|--------------------------------------------------------------------------
*/

export const updateFamilyMemberController = asyncHandler(async (req, res) => {

    const familyMember = await updateFamilyMember(
        req.user.id,
        req.body
    );

    return new ApiResponse(
        res,
        200,
        "Family member information updated successfully.",
        familyMember
    );

});

/*
|--------------------------------------------------------------------------
| Delete Family Member (Optional)
|--------------------------------------------------------------------------
*/

export const deleteFamilyMemberController = asyncHandler(async (req, res) => {

    await deleteFamilyMember(
        req.user.id
    );

    return new ApiResponse(
        res,
        200,
        "Family member information deleted successfully."
    );

});