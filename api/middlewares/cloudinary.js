const cloudinary = require("cloudinary");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUploadUserImg = async (fileToUpload) => {
  try {
    const data = await cloudinary.v2.uploader.upload(fileToUpload, {
      resource_type: "auto",
      folder: "waipe/user/photos",
      tags: "userPhotos",
    });

    return {
      data,
    };
  } catch (error) {
    return error;
  }
};

const cloudinaryUploadPostImg = async (fileToUpload) => {
  try {
    const videoFormats = [".mp4", ".avi"];
    const imageFormats = [".jpg", ".jpeg", ".jpe", ".tiff", ".tif", ".png"];
    const extension = path.extname(fileToUpload);

    const type = videoFormats.includes(extension)
      ? "videos"
      : imageFormats.includes(extension)
      ? "photos"
      : "Wrong type";

    if (type === "Wrong type") return "Wrong type";

    const data = await cloudinary.v2.uploader.upload(fileToUpload, {
      resource_type: "auto",
      folder: `waipe/post/${type}`,
      tags: `post${type}`,
      height: 654,
      width: 420,
      crop: "fill",
      async: true,
      end_offset: "15",
    });

    return {
      data,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};

const cloudinaryUploadPetImg = async (fileToUpload) => {
  try {
    const data = await cloudinary.v2.uploader.upload(fileToUpload, {
      resource_type: "auto",
      folder: "waipe/pet/photos",
      tags: "petPhotos",
    });

    return {
      data,
    };
  } catch (error) {
    return error;
  }
};

const cloudinaryDeleteUserImg = async (public_id) => {
  try {
    const getPublicId = public_id.split("/").pop().split(".")[0];
    var imagePath = "waipe/user/photos/" + getPublicId;

    const data = await cloudinary.v2.uploader.destroy(
      imagePath,
      (error, result) => {
        console.log(result);
      }
    );

    return {
      data,
    };
  } catch (error) {
    return error;
  }
};

const cloudinaryDeletePostImg = async (public_id) => {
  try {
    const getPublicId = public_id.split("/").pop().split(".")[0];
    var imagePath = "waipe/post/photos/" + getPublicId;

    const data = await cloudinary.v2.uploader.destroy(
      imagePath,
      (error, result) => {
        console.log(result);
      }
    );

    return {
      data,
    };
  } catch (error) {
    return error;
  }
};

const cloudinaryDeletePetImg = async (public_id) => {
  try {
    const getPublicId = public_id.split("/").pop().split(".")[0];
    var imagePath = "waipe/pet/photos/" + getPublicId;

    const data = await cloudinary.v2.uploader.destroy(
      imagePath,
      (error, result) => {
        console.log(result);
      }
    );

    return {
      data,
    };
  } catch (error) {
    return error;
  }
};

module.exports = {
  cloudinaryUploadUserImg,
  cloudinaryUploadPostImg,
  cloudinaryUploadPetImg,
  cloudinaryDeleteUserImg,
  cloudinaryDeletePostImg,
  cloudinaryDeletePetImg,
};
