import streamifier from "streamifier";

import cloudinary from "../config/cloudinary.js";

/*
|--------------------------------------------------------------------------
| Upload Image
|--------------------------------------------------------------------------
*/

export const uploadImage = (file, folder) => {

    return new Promise((resolve, reject) => {

        if (!file) {
            return resolve(null);
        }

        const uploadStream = cloudinary.uploader.upload_stream(

            {
                folder,
                resource_type: "image",
            },

            (error, result) => {

                if (error) {
                    return reject(error);
                }

                resolve(result);

            }

        );

        streamifier
            .createReadStream(file.buffer)
            .pipe(uploadStream);

    });

};

/*
|--------------------------------------------------------------------------
| Delete Image
|--------------------------------------------------------------------------
*/

export const deleteImage = async (publicId) => {

    if (!publicId) {
        return;
    }

    await cloudinary.uploader.destroy(publicId);

};