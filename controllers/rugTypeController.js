const RugType = require('../models/rugTypeModel');

exports.createRugType = async (req, res) => {
  try {
    const rugType = await RugType.create(req.body);
    res.status(201).json(rugType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllRugTypes = async (req, res) => {
  try {
    const rugTypes = await RugType.find();
    res.status(200).json(rugTypes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getRugType = async (req, res) => {
  try {
    const rugType = await RugType.findById(req.params.id);
    if (!rugType) {
      return res.status(404).json({ error: 'RugType not found' });
    }
    res.status(200).json(rugType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateRugType = async (req, res) => {
  try {
    const rugType = await RugType.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!rugType) {
      return res.status(404).json({ error: 'RugType not found' });
    }
    res.status(200).json(rugType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteRugType = async (req, res) => {
  try {
    const rugType = await RugType.findByIdAndDelete(req.params.id);
    if (!rugType) {
      return res.status(404).json({ error: 'RugType not found' });
    }
    res.status(204).json(null);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
