import FamilyMember from "../../models/profile/familyMemberModel.js";
import ProfileType from "../../models/profile/profileTypeModel.js";

import AppError from "../../utils/AppError.js";

/*
|--------------------------------------------------------------------------
| Create Family Member
|--------------------------------------------------------------------------
*/

export const createFamilyMember = async (userId, data) => {

    const profileType = await ProfileType.findOne({
        user_id: userId,
    });

    if (!profileType) {
        console.log(
            "Please complete profile type first.",
            404
        );
    }

    if (profileType.profile_for !== "Family Member") {
        console.log(
            "Family member information is only allowed for 'Family Member' profiles.",
            403
        );
    }

    const existingFamilyMember = await FamilyMember.findOne({
        user_id: userId,
    });

    if (existingFamilyMember) {
        console.log(
            "Family member information already exists.",
            409
        );
    }

    const familyMember = await FamilyMember.create({
        user_id: userId,
        first_name: data.first_name,
        last_name: data.last_name,
        relation: data.relation,
        phone: data.phone,
    });

    return familyMember;

};

/*
|--------------------------------------------------------------------------
| Get Family Member
|--------------------------------------------------------------------------
*/

export const getFamilyMemberByUserId = async (userId) => {

    const familyMember = await FamilyMember.findOne({
        user_id: userId,
    });

    if (!familyMember) {
        console.log(
            "Family member information not found.",
            404
        );
    }

    return familyMember;

};

/*
|--------------------------------------------------------------------------
| Update Family Member
|--------------------------------------------------------------------------
*/

// export const updateFamilyMember = async (userId, data) => {

//     const familyMember = await FamilyMember.findOne({
//         user_id: userId,
//     });

//     if (!familyMember) {
//         console.log(
//             "Family member information not found.",
//             404
//         );
//     }

//     Object.assign(familyMember, data);

//     await familyMember.save();

//     return familyMember;

// };


export const updateFamilyMember = async (userId, data) => {

    let familyMember = await FamilyMember.findOne({
        user_id: userId,
    });

    // New user ke liye Family Member record abhi exist nahi karta
    if (!familyMember) {
        console.log("Family member information not found. Creating new record.");

        familyMember = await FamilyMember.create({
            user_id: userId,
            first_name: data.first_name,
            last_name: data.last_name,
            relation: data.relation,
            phone: data.phone,
        });

        return familyMember;
    }

    // Existing record ko update karo
    Object.assign(familyMember, data);

    await familyMember.save();

    return familyMember;
};

/*
|--------------------------------------------------------------------------
| Delete Family Member
|--------------------------------------------------------------------------
*/

export const deleteFamilyMember = async (userId) => {

    const familyMember = await FamilyMember.findOne({
        user_id: userId,
    });

    if (!familyMember) {
        console.log(
            "Family member information not found.",
            404
        );
    }

    await familyMember.deleteOne();

    return true;

};