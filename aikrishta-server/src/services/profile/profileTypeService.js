import ProfileType from "../../models/profile/profileTypeModel.js";

import AppError from "../../utils/AppError.js";

/*
|--------------------------------------------------------------------------
| Create Profile Type
|--------------------------------------------------------------------------
*/

export const createProfileType = async (userId, data) => {

    const existingProfileType = await ProfileType.findOne({
        user_id: userId,
    });

    if (existingProfileType) {
        console.log(
            "Profile type has already been created.",
            409
        );
    }

    const profileType = await ProfileType.create({
        user_id: userId,
        profile_for: data.profile_for,
    });

    return profileType;

};

/*
|--------------------------------------------------------------------------
| Get Profile Type
|--------------------------------------------------------------------------
*/

export const getProfileTypeByUserId = async (userId) => {

    const profileType = await ProfileType.findOne({
        user_id: userId,
    });

    if (!profileType) {
        console.log(
            "Profile type not found.",
            404
        );
    }

    return profileType;

};

/*
|--------------------------------------------------------------------------
| Update Profile Type
|--------------------------------------------------------------------------
*/

// export const updateProfileType = async (userId, data) => {

//     const profileType = await ProfileType.findOne({
//         user_id: userId,
//     });

//     if (!profileType) {
//         console.log(
//             "Profile type not found.",
//             404
//         );
//     }

//     profileType.profile_for = data.profile_for;

//     await profileType.save();

//     return profileType;

// };



export const updateProfileType = async (userId, data) => {

    let profileType = await ProfileType.findOne({
        user_id: userId,
    });

    // New user ke liye profile type abhi exist nahi karta
    if (!profileType) {
        console.log("Profile type not found. Creating new profile type.");

        profileType = await ProfileType.create({
            user_id: userId,
            profile_for: data.profile_for,
        });

        return profileType;
    }

    // Existing profile type ko update karo
    profileType.profile_for = data.profile_for;

    await profileType.save();

    return profileType;
};

/*
|--------------------------------------------------------------------------
| Delete Profile Type (Optional)
|--------------------------------------------------------------------------
*/

export const deleteProfileType = async (userId) => {

    const profileType = await ProfileType.findOne({
        user_id: userId,
    });

    if (!profileType) {
        console.log(
            "Profile type not found.",
            404
        );
    }

    await profileType.deleteOne();

    return true;

};