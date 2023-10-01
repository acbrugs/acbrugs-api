const Rug = require('../models/rugModel');
const logger = require('../config/logger'); // Make sure to import the logger
const { deleteCloudinaryImage } = require('../utils/cloudinaryHelpers');

exports.createRug = async (req, res) => {
  try {
    const newRug = await Rug.create(req.body);
    res.status(201).json(newRug);
    logger.info(`Successfully created Rug with ID ${newRug._id}`);
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error(`Failed to create Rug: ${error.message}`);
  }
};

exports.getAllRugs = async (req, res) => {
  try {
    const rugs = await Rug.find({});
    res.status(200).json(rugs);
    logger.info('Successfully fetched all Rugs');
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error(`Failed to fetch all Rugs: ${error.message}`);
  }
};

exports.getAllRugsByType = async (req, res) => {
  const rugTypeId = req.params.rugTypeId;

  logger.info(`Received request to get all rugs by type ID: ${rugTypeId}`);

  try {
    const rugs = await Rug.find({ rugTypeId });

    if (rugs.length === 0) {
      logger.warn(`No rugs found for type ID: ${rugTypeId}`);
      return res.status(404).json({ message: 'No rugs found for this type' });
    }

    logger.info(
      `Successfully retrieved ${rugs.length} rugs for type ID: ${rugTypeId}`
    );
    res.status(200).json(rugs);
  } catch (error) {
    logger.error(
      `Error fetching rugs by type: ${error.message}, Type ID: ${rugTypeId}`
    );
    res.status(400).json({ message: error.message });
  }
};

exports.getRugById = async (req, res) => {
  try {
    const rug = await Rug.findById(req.params.id);
    if (!rug) {
      res.status(404).json({ message: 'Rug not found' });
      logger.warn(`Rug with ID ${req.params.id} not found`);
      return;
    }
    res.status(200).json(rug);
    logger.info(`Successfully fetched Rug with ID ${req.params.id}`);
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error(
      `Failed to fetch Rug with ID ${req.params.id}: ${error.message}`
    );
  }
};

exports.updateRug = async (req, res) => {
  try {
    const rug = await Rug.findById(req.params.id);
    if (!rug) {
      return res.status(404).json({ message: 'Rug not found' });
    }

    // If a new image URL is being updated, delete the old image from Cloudinary
    if (req.body.imageUrl && rug.imageUrl !== req.body.imageUrl) {
      await deleteCloudinaryImage(rug.imageUrl);
    }

    const updatedRug = await Rug.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedRug);
    logger.info(`Successfully updated Rug with ID ${req.params.id}`);
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error(
      `Failed to update Rug with ID ${req.params.id}: ${error.message}`
    );
  }
};

exports.deleteRug = async (req, res) => {
  try {
    const rug = await Rug.findById(req.params.id);
    if (!rug) {
      return res.status(404).json({ message: 'Rug not found' });
    }
    await Rug.findByIdAndDelete(req.params.id);

    // delete the cloudinary image uploaded
    await deleteCloudinaryImage(rug.imageUrl);

    res.status(200).json({ message: 'Rug deleted successfully' });
    logger.info(`Successfully deleted Rug with ID ${req.params.id}`);
  } catch (error) {
    res.status(400).json({ message: error.message });
    logger.error(
      `Failed to delete Rug with ID ${req.params.id}: ${error.message}`
    );
  }
};
