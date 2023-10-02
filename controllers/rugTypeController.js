const RugType = require('../models/rugTypeModel');
const logger = require('../config/logger'); // Add this line to import the logger
const { deleteCloudinaryImage } = require('../utils/cloudinaryHelpers');

exports.createRugType = async (req, res) => {
  try {
    const newRugType = await RugType.create(req.body);
    res.status(201).json(newRugType);
    logger.info('Successfully created a new rug type');
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while creating a new rug type.',
    });
    logger.error(`Failed to create a new rug type: ${error.message}`);
  }
};

exports.getAllRugTypes = async (req, res) => {
  try {
    const rugTypes = await RugType.find();
    res.status(200).json(rugTypes);
    logger.info('Successfully fetched all rug types');
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching all rug types.',
    });
    logger.error(`Failed to fetch all rug types: ${error.message}`);
  }
};

exports.getRugType = async (req, res) => {
  try {
    const rugType = await RugType.findById(req.params.id);
    if (!rugType) {
      res.status(404).json({ error: 'RugType not found' });
      logger.warn(`RugType with ID ${req.params.id} not found`);
      return;
    }

    res.status(200).json(rugType);
    logger.info(`Successfully fetched RugType with ID ${req.params.id}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
    logger.error(
      `Failed to fetch RugType with ID ${req.params.id}: ${error.message}`
    );
  }
};

exports.updateRugType = async (req, res) => {
  try {
    const rugType = await RugType.findById(req.params.id);
    if (!rugType) {
      logger.warn(`RugType with ID ${req.params.id} not found for update`);
      return res.status(404).json({ error: 'RugType not found' });
    }

    // If a new image URL is being updated, delete the old image from Cloudinary
    if (req.body.imageUrl && rugType.imageUrl !== req.body.imageUrl) {
      await deleteCloudinaryImage(rugType.imageUrl);
    }
    const updatedRugType = await RugType.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedRugType);
    logger.info(`Successfully updated RugType with ID ${req.params.id}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
    logger.error(
      `Failed to update RugType with ID ${req.params.id}: ${error.message}`
    );
  }
};

exports.deleteRugType = async (req, res) => {
  try {
    const rugType = await RugType.findById(req.params.id);
    if (!rugType) {
      logger.warn(`RugType with ID ${req.params.id} not found for deletion`);
      return res.status(404).json({ error: 'RugType not found' });
    }

    await RugType.findByIdAndDelete(req.params.id);
    await deleteCloudinaryImage(rugType.imageUrl);

    res.status(200).json({ message: 'RugType deleted successfully' });
    logger.info(`Successfully deleted RugType with ID ${req.params.id}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
    logger.error(
      `Failed to delete RugType with ID ${req.params.id}: ${error.message}`
    );
  }
};
