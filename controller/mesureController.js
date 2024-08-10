import Mesure from '../models/mesures.js';

const createMesure = async (req, res) => {
    const { userId } = req.params;
    const { gender, shoulder, chest, waist, hips, sleeveLength, neck, bust, inseam } = req.body;
       const mesure = new Mesure({ userId, gender, shoulder, chest, waist, hips, sleeveLength, neck, bust, inseam });
    await mesure.save();
    res.status(200).json({ message: 'Mesure created successfully', mesure, status: true });
};

const getAllMesures = async (req, res) => { 
    try {
        const mesures = await Mesure.find();
        res.status(200).json({ message: 'All mesures retrieved successfully', mesures, status: true });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving mesures', error, status: false });
    }
};

const updateMesure = async (req, res) => {
    const { userId } = req.params;
    const { shoulder, chest, waist, hips, sleeveLength, neck, bust, inseam } = req.body;
    const mesure = await Mesure.findOne({ userId });
    mesure.shoulder = shoulder;
    mesure.chest = chest;
    mesure.waist = waist;
    mesure.hips = hips;
    mesure.sleeveLength = sleeveLength;
    mesure.neck = neck;
    mesure.bust = bust;
    mesure.inseam = inseam;
    await mesure.save();
    res.status(200).json({ message: 'Mesure updated successfully', mesure, status: true });
};

const deleteMesure = async (req, res) => {
    const { userId } = req.params;
    await Mesure.findOneAndDelete({ userId });
    res.status(200).json({ message: 'Mesure deleted successfully', status: true });
};

export { createMesure, getAllMesures, updateMesure, deleteMesure };
