import mongoose from 'mongoose';

const DetectionSchema = new mongoose.Schema({
    deviceLocation: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    objectLocation: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    label: { type: String, required: true },
    confidence: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});

const Detection = mongoose.model('Detection', DetectionSchema);

export default Detection;

