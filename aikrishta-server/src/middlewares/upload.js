import multerUpload from "./multer.js";

export const uploadProfilePicture =
    multerUpload.single("profile_picture");

export const uploadVerificationImage =
    multerUpload.single("verification_image");

export const uploadDocument = multerUpload.single("file"); 