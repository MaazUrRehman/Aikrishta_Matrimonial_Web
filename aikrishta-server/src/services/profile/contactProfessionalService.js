import ContactProfessional from "../../models/profile/contactProfessionalModel.js";
import PersonalInformation from "../../models/profile/personalInformationModel.js";
import mongoose from "mongoose";

import AppError from "../../utils/AppError.js";

/*
|--------------------------------------------------------------------------
| Create Contact & Professional Information
|--------------------------------------------------------------------------
*/

export const createContactProfessional = async (userId, data) => {

    const existingContactProfessional = await ContactProfessional.findOne({
        user_id: userId,
    });

    if (existingContactProfessional) {
        throw new AppError(
            "Contact and professional information has already been created.",
            409
        );
    }

    const contactProfessional = await ContactProfessional.create({
        user_id: userId,
        city: data.city,
        country: data.country,
        education_level: data.education_level,
        occupation: data.occupation,
        monthly_income: data.monthly_income,
        additional_details: data.additional_details,
    });

    return contactProfessional;

};

/*
|--------------------------------------------------------------------------
| Get Contact & Professional Information
|--------------------------------------------------------------------------
*/

export const getContactProfessionalByUserId = async (userId) => {

    // 1. If userId is a PersonalInformation document _id, get its user_id
    let actualUserId = userId;
    if (mongoose.Types.ObjectId.isValid(userId)) {
        const personalInfo = await PersonalInformation.findById(userId);
        if (personalInfo) {
            actualUserId = personalInfo.user_id;
        }
    }

    // 2. Find by the resolved user_id
    const contactProfessional = await ContactProfessional.findOne({
        user_id: actualUserId,
    });

    if (!contactProfessional) {
        console.log(
            "Contact and professional information not found.",
            404
        );
    }

    return contactProfessional;

};

/*
|--------------------------------------------------------------------------
| Update Contact & Professional Information
|--------------------------------------------------------------------------
*/

// export const updateContactProfessional = async (userId, data) => {

//     const contactProfessional = await ContactProfessional.findOne({
//         user_id: userId,
//     });

//     if (!contactProfessional) {
//         console.log(
//             "Contact and professional information not found.",
//             404
//         );
//     }

//     Object.assign(contactProfessional, data);

//     await contactProfessional.save();

//     return contactProfessional;

// };


export const updateContactProfessional = async (userId, data) => {

    let contactProfessional = await ContactProfessional.findOne({
        user_id: userId,
    });

    // Agar record nahi hai to new record create karo
    if (!contactProfessional) {
        contactProfessional = await ContactProfessional.create({
            user_id: userId,
            city: data.city,
            country: data.country,
            education_level: data.education_level,
            occupation: data.occupation,
            monthly_income: data.monthly_income,
            additional_details: data.additional_details,
        });

        return contactProfessional;
    }

    // Agar record already exist karta hai to update karo
    Object.assign(contactProfessional, data);

    await contactProfessional.save();

    return contactProfessional;
};

/*
|--------------------------------------------------------------------------
| Delete Contact & Professional Information (Optional)
|--------------------------------------------------------------------------
*/

export const deleteContactProfessional = async (userId) => {

    const contactProfessional = await ContactProfessional.findOne({
        user_id: userId,
    });

    if (!contactProfessional) {
        console.log(
            "Contact and professional information not found.",
            404
        );
    }

    await contactProfessional.deleteOne();

    return true;

};
