import PartnerPreference from "../../models/profile/partnerPreferenceModel.js";
import PersonalInformation from "../../models/profile/personalInformationModel.js";
import mongoose from "mongoose";

import AppError from "../../utils/AppError.js";

/*
|--------------------------------------------------------------------------
| Create Partner Preference
|--------------------------------------------------------------------------
*/

// export const createPartnerPreference = async (userId, data) => {

//     const existingPartnerPreference = await PartnerPreference.findOne({
//         user_id: userId,
//     });

//     if (existingPartnerPreference) {
//         console.log(
//             "Partner preference has already been created.",
//             409
//         );
//     }

//     if (data.preferred_age_max < data.preferred_age_min) {
//         console.log(
//             "Maximum preferred age must be greater than or equal to minimum preferred age.",
//             400
//         );
//     }

//     const partnerPreference = await PartnerPreference.create({
//         user_id: userId,
//         preferred_age_min: data.preferred_age_min,
//         preferred_age_max: data.preferred_age_max,
//         preferred_education: data.preferred_education,
//         preferred_profession: data.preferred_profession,
//         preferred_caste: data.preferred_caste,
//         preferred_marital_status: data.preferred_marital_status,
//         preferred_city: data.preferred_city,
//         preferred_country: data.preferred_country,
//     });

//     return partnerPreference;

// };


export const createPartnerPreference = async (userId, data) => {

    const existingPartnerPreference =
        await PartnerPreference.findOne({
            user_id: userId,
        });

    if (existingPartnerPreference) {
        throw new AppError(
            "Partner preference has already been created.",
            409
        );
    }

    if (
        data.preferred_age_min !== undefined &&
        data.preferred_age_max !== undefined &&
        data.preferred_age_max < data.preferred_age_min
    ) {
        throw new AppError(
            "Maximum preferred age must be greater than or equal to minimum preferred age.",
            400
        );
    }

    const partnerPreference = await PartnerPreference.create({
        user_id: userId,
        preferred_age_min: data.preferred_age_min,
        preferred_age_max: data.preferred_age_max,
        preferred_education: data.preferred_education,
        preferred_profession: data.preferred_profession,
        preferred_caste: data.preferred_caste,
        preferred_marital_status: data.preferred_marital_status,
        preferred_city: data.preferred_city,
        preferred_country: data.preferred_country,
    });

    return partnerPreference;
};

/*
|--------------------------------------------------------------------------
| Get Partner Preference
|--------------------------------------------------------------------------
*/

export const getPartnerPreferenceByUserId = async (userId) => {

    // 1. If userId is a PersonalInformation document _id, get its user_id
    let actualUserId = userId;
    if (mongoose.Types.ObjectId.isValid(userId)) {
        const personalInfo = await PersonalInformation.findById(userId);
        if (personalInfo) {
            actualUserId = personalInfo.user_id;
        }
    }

    // 2. Find by the resolved user_id
    const partnerPreference = await PartnerPreference.findOne({
        user_id: actualUserId,
    });

    if (!partnerPreference) {
        console.log(
            "Partner preference not found.",
            404
        );
    }

    return partnerPreference;

};

/*
|--------------------------------------------------------------------------
| Update Partner Preference
|--------------------------------------------------------------------------
*/

// export const updatePartnerPreference = async (userId, data) => {

//     const partnerPreference = await PartnerPreference.findOne({
//         user_id: userId,
//     });

//     if (!partnerPreference) {
//         console.log(
//             "Partner preference not found.",
//             404
//         );
//     }

//     const minimumAge =
//         data.preferred_age_min ?? partnerPreference.preferred_age_min;

//     const maximumAge =
//         data.preferred_age_max ?? partnerPreference.preferred_age_max;

//     if (maximumAge < minimumAge) {
//         console.log(
//             "Maximum preferred age must be greater than or equal to minimum preferred age.",
//             400
//         );
//     }

//     Object.assign(partnerPreference, data);

//     await partnerPreference.save();

//     return partnerPreference;

// };


export const updatePartnerPreference = async (userId, data) => {

    let partnerPreference = await PartnerPreference.findOne({
        user_id: userId,
    });

    // New user / record doesn't exist → CREATE
    if (!partnerPreference) {

        const minimumAge = data.preferred_age_min;
        const maximumAge = data.preferred_age_max;

        if (
            minimumAge !== undefined &&
            maximumAge !== undefined &&
            maximumAge < minimumAge
        ) {
            throw new AppError(
                "Maximum preferred age must be greater than or equal to minimum preferred age.",
                400
            );
        }

        partnerPreference = await PartnerPreference.create({
            user_id: userId,
            preferred_age_min: data.preferred_age_min,
            preferred_age_max: data.preferred_age_max,
            preferred_education: data.preferred_education,
            preferred_profession: data.preferred_profession,
            preferred_caste: data.preferred_caste,
            preferred_marital_status: data.preferred_marital_status,
            preferred_city: data.preferred_city,
            preferred_country: data.preferred_country,
        });

        return partnerPreference;
    }

    // Existing record → UPDATE

    const minimumAge =
        data.preferred_age_min ??
        partnerPreference.preferred_age_min;

    const maximumAge =
        data.preferred_age_max ??
        partnerPreference.preferred_age_max;

    if (maximumAge < minimumAge) {
        throw new AppError(
            "Maximum preferred age must be greater than or equal to minimum preferred age.",
            400
        );
    }

    Object.assign(partnerPreference, data);

    await partnerPreference.save();

    return partnerPreference;
};


/*
|--------------------------------------------------------------------------
| Delete Partner Preference (Optional)
|--------------------------------------------------------------------------
*/

export const deletePartnerPreference = async (userId) => {

    const partnerPreference = await PartnerPreference.findOne({
        user_id: userId,
    });

    if (!partnerPreference) {
        console.log(
            "Partner preference not found.",
            404
        );
    }

    await partnerPreference.deleteOne();

    return true;

};
