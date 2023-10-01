const Rug = require('../models/rugModel');

exports.createRug = async (req, res) => {
  try {
    const newRug = await Rug.create(req.body);
    res.status(201).json(newRug);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllRugs = async (req, res) => {
  try {
    const rugs = await Rug.find({});
    res.status(200).json(rugs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getRugById = async (req, res) => {
  try {
    const rug = await Rug.findById(req.params.id);
    if (!rug) {
      return res.status(404).json({ message: 'Rug not found' });
    }
    res.status(200).json(rug);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateRug = async (req, res) => {
  try {
    const updatedRug = await Rug.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedRug);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteRug = async (req, res) => {
  try {
    await Rug.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Rug deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
