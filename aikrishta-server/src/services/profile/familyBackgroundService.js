import FamilyBackground from "../../models/profile/familyBackgroundModel.js";
import PersonalInformation from "../../models/profile/personalInformationModel.js";
import mongoose from "mongoose";

import AppError from "../../utils/AppError.js";

/*
|--------------------------------------------------------------------------
| Create Family Background
|--------------------------------------------------------------------------
*/

// export const createFamilyBackground = async (userId, data) => {

//     const existingFamilyBackground = await FamilyBackground.findOne({
//         user_id: userId,
//     });

//     if (existingFamilyBackground) {
//         console.log(
//             "Family background has already been created.",
//             409
//         );
//     }

//     if (data.brothers_married > data.brothers_count) {
//         console.log(
//             "Married brothers cannot exceed total brothers.",
//             400
//         );
//     }

//     if (data.sisters_married > data.sisters_count) {
//         console.log(
//             "Married sisters cannot exceed total sisters.",
//             400
//         );
//     }

//     const familyBackground = await FamilyBackground.create({
//         user_id: userId,
//         father_name: data.father_name,
//         mother_name: data.mother_name,
//         father_profession: data.father_profession,
//         mother_profession: data.mother_profession,
//         brothers_count: data.brothers_count,
//         brothers_married: data.brothers_married,
//         sisters_count: data.sisters_count,
//         sisters_married: data.sisters_married,
//         social_status: data.social_status,
//         family_residence: data.family_residence,
//         financial_status: data.financial_status,
//     });

//     return familyBackground;

// };


export const createFamilyBackground = async (userId, data) => {

    const existingFamilyBackground = await FamilyBackground.findOne({
        user_id: userId,
    });

    if (existingFamilyBackground) {
        throw new AppError(
            "Family background has already been created.",
            409
        );
    }

    const brothersCount = data.brothers_count ?? 0;
    const brothersMarried = data.brothers_married ?? 0;

    if (brothersMarried > brothersCount) {
        throw new AppError(
            "Married brothers cannot exceed total brothers.",
            400
        );
    }

    const sistersCount = data.sisters_count ?? 0;
    const sistersMarried = data.sisters_married ?? 0;

    if (sistersMarried > sistersCount) {
        throw new AppError(
            "Married sisters cannot exceed total sisters.",
            400
        );
    }

    const familyBackground = await FamilyBackground.create({
        user_id: userId,
        father_name: data.father_name,
        mother_name: data.mother_name,
        father_profession: data.father_profession,
        mother_profession: data.mother_profession,
        brothers_count: data.brothers_count,
        brothers_married: data.brothers_married,
        sisters_count: data.sisters_count,
        sisters_married: data.sisters_married,
        social_status: data.social_status,
        family_residence: data.family_residence,
        financial_status: data.financial_status,
    });

    return familyBackground;
};

/*
|--------------------------------------------------------------------------
| Get Family Background
|--------------------------------------------------------------------------
*/

export const getFamilyBackgroundByUserId = async (userId) => {

    // 1. If userId is a PersonalInformation document _id, get its user_id
    let actualUserId = userId;
    if (mongoose.Types.ObjectId.isValid(userId)) {
        const personalInfo = await PersonalInformation.findById(userId);
        if (personalInfo) {
            actualUserId = personalInfo.user_id;
        }
    }

    // 2. Find by the resolved user_id
    const familyBackground = await FamilyBackground.findOne({
        user_id: actualUserId,
    });

    if (!familyBackground) {
        console.log(
            "Family background not found.",
            404
        );
    }

    return familyBackground;

};

/*
|--------------------------------------------------------------------------
| Update Family Background
|--------------------------------------------------------------------------
*/

// export const updateFamilyBackground = async (userId, data) => {

//     const familyBackground = await FamilyBackground.findOne({
//         user_id: userId,
//     });

//     if (!familyBackground) {
//         console.log(
//             "Family background not found.",
//             404
//         );
//     }

//     const totalBrothers =
//         data.brothers_count ?? familyBackground.brothers_count;

//     const marriedBrothers =
//         data.brothers_married ?? familyBackground.brothers_married;

//     if (marriedBrothers > totalBrothers) {
//         console.log(
//             "Married brothers cannot exceed total brothers.",
//             400
//         );
//     }

//     const totalSisters =
//         data.sisters_count ?? familyBackground.sisters_count;

//     const marriedSisters =
//         data.sisters_married ?? familyBackground.sisters_married;

//     if (marriedSisters > totalSisters) {
//         console.log(
//             "Married sisters cannot exceed total sisters.",
//             400
//         );
//     }

//     Object.assign(familyBackground, data);

//     await familyBackground.save();

//     return familyBackground;

// };


export const updateFamilyBackground = async (userId, data) => {

    let familyBackground = await FamilyBackground.findOne({
        user_id: userId,
    });

    // New user / record doesn't exist → CREATE
    if (!familyBackground) {

        const brothersCount = data.brothers_count ?? 0;
        const brothersMarried = data.brothers_married ?? 0;

        const sistersCount = data.sisters_count ?? 0;
        const sistersMarried = data.sisters_married ?? 0;

        if (brothersMarried > brothersCount) {
            throw new AppError(
                "Married brothers cannot exceed total brothers.",
                400
            );
        }

        if (sistersMarried > sistersCount) {
            throw new AppError(
                "Married sisters cannot exceed total sisters.",
                400
            );
        }

        familyBackground = await FamilyBackground.create({
            user_id: userId,
            father_name: data.father_name,
            mother_name: data.mother_name,
            father_profession: data.father_profession,
            mother_profession: data.mother_profession,
            brothers_count: data.brothers_count,
            brothers_married: data.brothers_married,
            sisters_count: data.sisters_count,
            sisters_married: data.sisters_married,
            social_status: data.social_status,
            family_residence: data.family_residence,
            financial_status: data.financial_status,
        });

        return familyBackground;
    }

    // Existing record → UPDATE

    const totalBrothers =
        data.brothers_count ?? familyBackground.brothers_count ?? 0;

    const marriedBrothers =
        data.brothers_married ?? familyBackground.brothers_married ?? 0;

    if (marriedBrothers > totalBrothers) {
        throw new AppError(
            "Married brothers cannot exceed total brothers.",
            400
        );
    }

    const totalSisters =
        data.sisters_count ?? familyBackground.sisters_count ?? 0;

    const marriedSisters =
        data.sisters_married ?? familyBackground.sisters_married ?? 0;

    if (marriedSisters > totalSisters) {
        throw new AppError(
            "Married sisters cannot exceed total sisters.",
            400
        );
    }

    Object.assign(familyBackground, data);

    await familyBackground.save();

    return familyBackground;
};

/*
|--------------------------------------------------------------------------
| Delete Family Background (Optional)
|--------------------------------------------------------------------------
*/

export const deleteFamilyBackground = async (userId) => {

    const familyBackground = await FamilyBackground.findOne({
        user_id: userId,
    });

    if (!familyBackground) {
        console.log(
            "Family background not found.",
            404
        );
    }

    await familyBackground.deleteOne();

    return true;

};
