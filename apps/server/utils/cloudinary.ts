// Require the cloudinary library
const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true
});

// // Log the configuration
// console.log(cloudinary.config());

/////////////////////////
// Uploads an image file
/////////////////////////
export const uploadImage = async (imagePath: string) => {
  // Use the uploaded file's name as the asset's public ID and 
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: "profiles",
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log("Upload Result: ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

/////////////////////////////////////
// Gets details of an uploaded image
/////////////////////////////////////
export const getAssetInfo = async (publicId: any) => {

  // Return colors in the response
  const options = {
    colors: true,
  };

  try {
    // Get details about the asset
    const result = await cloudinary.api.resource(publicId, options);
    console.log("Asset Info: ", result);
    return result.colors;
  } catch (error) {
    console.error(error);
  }
};