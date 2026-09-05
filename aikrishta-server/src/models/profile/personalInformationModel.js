import mongoose from "mongoose";

const personalInformationSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required."],
            unique: true,
        },

        first_name: {
            type: String,
            required: [true, "First name is required."],
            trim: true,
            minlength: 3,
            maxlength: 100,
        },

        last_name: {
            type: String,
            required: [true, "last name is required."],
            trim: true,
            minlength: 3,
            maxlength: 100,
        },

        age: {
            type: Number,
            required: [true, "Age is required."],
            min: [18, "Minimum age must be 18 years."],
            max: [100, "Maximum age cannot exceed 100 years."],
        },

        date_of_birth: {
            type: Date,
            required: [true, "Date of birth is required."],
        },

        gender: {
            type: String,
            required: [true, "Gender is required."],
            enum: {
                values: ["Male", "Female"],
                message: "Gender must be either 'Male' or 'Female'.",
            },
            trim: true,
        },

        religion: {
            type: String,
            required: [true, "Religion is required."],
            trim: true,
            maxlength: 50,
        },

        caste: {
            type: String,
            required: [true, "Caste is required."],
            trim: true,
            maxlength: 100,
        },

        mother_tongue: {
            type: String,
            required: [true, "Mother tongue is required."],
            trim: true,
            maxlength: 50,
        },

        marital_status: {
            type: String,
            required: [true, "Marital status is required."],
            enum: {
                values: [
                    "Never Married",
                    "Divorced",
                    "Widowed",
                    "Separated",
                ],
                message: "Please select a valid marital status.",
            },
            trim: true,
        },

        height: {
            type: Number,
            required: [true, "Height is required."],
            min: [2, "Height is invalid."],
            max: [8, "Height is invalid."],
        },

        weight: {
            type: Number,
            required: [true, "Weight is required."],
            min: [20, "Weight is invalid."],
            max: [300, "Weight is invalid."],
        },

        profile_picture: {
            type: String,
            default: null,
            trim: true,
        },

        profile_picture_public_id: {
            type: String,
            default: null,
            trim: true,
        },

        profile_status: {
            type: String,
            enum: {
                values: ["Active", "Inactive"],
                message: "Profile status must be either 'Active' or 'Inactive'.",
            },
            default: "Active",
        }
    },
    {
        timestamps: true,
    }
);

// One personal information record per user
// personalInformationSchema.index({ user_id: 1 }, { unique: true });

// Search optimization
personalInformationSchema.index({
    gender: 1,
    religion: 1,
    caste: 1,
    marital_status: 1,
});

const PersonalInformation = mongoose.model(
    "PersonalInformation",
    personalInformationSchema
);

export default PersonalInformation;