import PersonalInformation from "../../models/profile/personalInformationModel.js";
import ContactProfessional from "../../models/profile/contactProfessionalModel.js";
import mongoose from "mongoose";
import User from "../../models/User.js";
import AppError from "../../utils/AppError.js";

import {
    uploadImage,
    deleteImage,
} from "../../utils/cloudinaryHelper.js";

/*
|--------------------------------------------------------------------------
| Create Personal Information
|--------------------------------------------------------------------------
*/

export const createPersonalInformation = async (
    userId,
    data,
    file
) => {

    const existingPersonalInformation = await PersonalInformation.findOne({
        user_id: userId,
    });

    if (existingPersonalInformation) {
        console.log(
            "Personal information has already been created.",
            409
        );
    }

    let uploadedImage = null;

    if (file) {
        uploadedImage = await uploadImage(
            file,
            "AIKRISHTA/profile-pictures"
        );
    }

    const personalInformation = await PersonalInformation.create({
        user_id: userId,
        first_name: data.first_name,
        last_name: data.last_name,
        age: data.age,
        date_of_birth: data.date_of_birth,
        gender: data.gender,
        religion: data.religion,
        caste: data.caste,
        mother_tongue: data.mother_tongue,
        marital_status: data.marital_status,
        height: data.height,
        weight: data.weight,

        profile_picture: uploadedImage
            ? uploadedImage.secure_url
            : null,

        profile_picture_public_id: uploadedImage
            ? uploadedImage.public_id
            : null,

        profile_status: data.profile_status,
    });

    return personalInformation;

};

/*
|--------------------------------------------------------------------------
| Get Personal Information
|--------------------------------------------------------------------------
*/

export const getPersonalInformationByUserId = async (userId) => {

    // Try finding by user_id first
    let personalInformation = await PersonalInformation.findOne({
        user_id: userId,
    });

    // If not found, try finding by _id (document ID)
    if (!personalInformation && mongoose.Types.ObjectId.isValid(userId)) {
        personalInformation = await PersonalInformation.findById(userId);
    }

    if (!personalInformation) {
        console.log(
            "Personal information not found.",
            404
        );
    }

    return personalInformation;

};

/*
|--------------------------------------------------------------------------
| Update Personal Information
|--------------------------------------------------------------------------
*/

// export const updatePersonalInformation = async (
//     userId,
//     data,
//     file
// ) => {

//     const personalInformation = await PersonalInformation.findOne({
//         user_id: userId,
//     });

//     if (!personalInformation) {
//         console.log(
//             "Personal information not found.",
//             404
//         );
//     }

//     Object.assign(personalInformation, data);

//     if (file) {

//         if (personalInformation.profile_picture_public_id) {
//             await deleteImage(
//                 personalInformation.profile_picture_public_id
//             );
//         }

//         const uploadedImage = await uploadImage(
//             file,
//             "AIKRISHTA/profile-pictures"
//         );

//         personalInformation.profile_picture =
//             uploadedImage.secure_url;

//         personalInformation.profile_picture_public_id =
//             uploadedImage.public_id;

//     }

//     await personalInformation.save();

//     return personalInformation;

// };


export const updatePersonalInformation = async (
    userId,
    data,
    file
) => {

    let personalInformation = await PersonalInformation.findOne({
        user_id: userId,
    });

    // New user ke liye record nahi hai, isliye create karo
    if (!personalInformation) {
        console.log(
            "Personal information not found. Creating new record."
        );

        let uploadedImage = null;

        if (file) {
            uploadedImage = await uploadImage(
                file,
                "AIKRISHTA/profile-pictures"
            );
        }

        personalInformation = await PersonalInformation.create({
            user_id: userId,
            first_name: data.first_name,
            last_name: data.last_name,
            age: data.age,
            date_of_birth: data.date_of_birth,
            gender: data.gender,
            religion: data.religion,
            caste: data.caste,
            mother_tongue: data.mother_tongue,
            marital_status: data.marital_status,
            height: data.height,
            weight: data.weight,

            profile_picture: uploadedImage
                ? uploadedImage.secure_url
                : null,

            profile_picture_public_id: uploadedImage
                ? uploadedImage.public_id
                : null,

            profile_status: data.profile_status,
        });

        return personalInformation;
    }

    // Existing record ko update karo
    Object.assign(personalInformation, data);

    if (file) {

        if (personalInformation.profile_picture_public_id) {
            await deleteImage(
                personalInformation.profile_picture_public_id
            );
        }

        const uploadedImage = await uploadImage(
            file,
            "AIKRISHTA/profile-pictures"
        );

        personalInformation.profile_picture =
            uploadedImage.secure_url;

        personalInformation.profile_picture_public_id =
            uploadedImage.public_id;
    }

    await personalInformation.save();

    return personalInformation;
};

/*
|--------------------------------------------------------------------------
| Delete Personal Information (Optional)
|--------------------------------------------------------------------------
*/

export const deletePersonalInformation = async (userId) => {

    const personalInformation = await PersonalInformation.findOne({
        user_id: userId,
    });

    if (!personalInformation) {
        console.log(
            "Personal information not found.",
            404
        );
    }

    if (personalInformation.profile_picture_public_id) {
        await deleteImage(
            personalInformation.profile_picture_public_id
        );
    }

    await personalInformation.deleteOne();

    return true;

};







/*
|--------------------------------------------------------------------------
| Get Opposite Gender Profiles
|--------------------------------------------------------------------------
*/

export const getOppositeGenderProfiles = async (userId) => {

    // Logged-in user ki profile
    const currentUser = await PersonalInformation.findOne({
        user_id: userId,
    });

    if (!currentUser) {
        console.log(
            "Current user profile not found.",
            404
        );
    }


    // Opposite gender determine karo
    const oppositeGender =
        currentUser.gender.toLowerCase() === "male"
            ? "female"
            : "male";

    const profiles = await PersonalInformation.aggregate([
        {
            $match: {
                user_id: { $ne: currentUser.user_id },
                gender: { $regex: new RegExp(`^${oppositeGender}$`, "i") },
            },
        },
        {
            $lookup: {
                from: User.collection.name,
                localField: "user_id",
                foreignField: "_id",
                as: "user",
            },
        },
        {
            $unwind: {
                path: "$user",
                preserveNullAndEmptyArrays: false,
            },
        },

        // 👇 Ye naya match add karo
        {
            $match: {
                "user.profileActivation": true,
            },
        },
        {
            $lookup: {
                from: ContactProfessional.collection.name,
                localField: "user_id",
                foreignField: "user_id",
                as: "contact_professional",
            },
        },
        {
            $unwind: {
                path: "$contact_professional",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $project: {
                _id: 1,
                user_id: 1,
                first_name: 1,
                last_name: 1,
                age: 1,
                gender: 1,
                religion: 1,
                caste: 1,
                mother_tongue: 1,
                marital_status: 1,
                profile_picture: 1,
                profile_status: 1,
                profileActivation: "$user.profileActivation",
                city: "$contact_professional.city",
                country: "$contact_professional.country",
                education: "$contact_professional.education_level",
                profession: "$contact_professional.occupation",
            },
        },
    ]);

    return profiles;

};
