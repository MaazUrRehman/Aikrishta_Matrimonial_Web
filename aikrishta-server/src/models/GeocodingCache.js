import mongoose from 'mongoose';

const geocodingCacheSchema = new mongoose.Schema({
  cityCountry: { type: String, required: true, unique: true },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now, expires: '30d' }, // Automatically deletes after 30 days
});

export default mongoose.model('GeocodingCache', geocodingCacheSchema);
