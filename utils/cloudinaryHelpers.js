const cloudinary = require('cloudinary').v2;
const logger = require('../config/logger');

const getCloudinaryPublicId = (imageUrl) => {
  try {
    const splitUrl = imageUrl.split('/');
    const fileName = splitUrl.pop();
    const folderPath = splitUrl.slice(-1).join('/');
    const publicId = `${folderPath}/${fileName.split('.')[0]}`;
    return publicId;
  } catch (error) {
    logger.error(`Error extracting Cloudinary publicId: ${error.message}`);
    return null;
  }
};

const deleteCloudinaryImage = async (imageUrl) => {
  try {
    const publicId = getCloudinaryPublicId(imageUrl);
    if (!publicId) {
      logger.error('Invalid publicId, cannot proceed with image deletion.');
      return false;
    }

    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    logger.error(`Failed to delete Cloudinary image: ${error.message}`);
    return false;
  }
};

module.exports = {
  deleteCloudinaryImage,
};
