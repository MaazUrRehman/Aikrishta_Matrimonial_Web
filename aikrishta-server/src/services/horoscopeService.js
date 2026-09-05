import axios from 'axios';
import GeocodingCache from '../models/GeocodingCache.js';

const AXIOS_TIMEOUT = 10000; // 10 seconds timeout

let accessToken = null;
let tokenExpiry = null;

const getProkeralaToken = async () => {
  if (accessToken && tokenExpiry > Date.now()) {
    return accessToken;
  }

  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', process.env.PROKERALA_CLIENT_ID);
    params.append('client_secret', process.env.PROKERALA_CLIENT_SECRET);

    const response = await axios.post('https://api.prokerala.com/token', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      timeout: AXIOS_TIMEOUT
    });
    
    accessToken = response.data.access_token;
    // Set expiry to 5 minutes before actual expiry for safety
    tokenExpiry = Date.now() + (response.data.expires_in * 1000) - 300000;
    return accessToken;
  } catch (error) {
    console.error('Prokerala token error:', error);
    console.log('Failed to authenticate with horoscope service');
  }
};

const getCoordinates = async (city, country) => {
  const cleanCity = (city || '').trim();
  const cleanCountry = (country || '').trim();
  
  if (!cleanCity || !cleanCountry) {
    console.log('Invalid location data');
  }

  const cityCountry = `${cleanCity}, ${cleanCountry}`.toLowerCase();
  
  // Check cache
  const cached = await GeocodingCache.findOne({ cityCountry });
  if (cached) {
    return { lat: cached.lat, lon: cached.lon };
  }

  // Fetch from OSM
  try {
    const query = `${cleanCity}, ${cleanCountry}`;
    
    const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
      params: {
        q: query,
        format: 'json',
        limit: 1,
      },
      headers: { 'User-Agent': 'AikrishtaMatrimonial/1.0' },
      timeout: AXIOS_TIMEOUT
    });

    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      // Save to cache
      await GeocodingCache.create({ cityCountry, lat, lon });
      return { lat: parseFloat(lat), lon: parseFloat(lon) };
    } else {
      console.log('Location not found');
    }
  } catch (error) {
    console.error('Geocoding error:', error.message);
    console.log('Failed to resolve location');
  }
};





export const getKundliMatch = async ({ user, candidate }) => {
  const userCoords = await getCoordinates(user.city, user.country);
  const candidateCoords = await getCoordinates(candidate.city, candidate.country);

  const token = await getProkeralaToken();

  const formatDate = (dob) => `${dob.split("T")[0]}T12:00:00Z`;

  try {
    const response = await axios.get(
      "https://api.prokerala.com/v2/astrology/kundli-matching",
      {
        params: {
          ayanamsa: 1,
          boy_coordinates: `${userCoords.lat},${userCoords.lon}`,
          boy_dob: formatDate(user.dob),
          girl_coordinates: `${candidateCoords.lat},${candidateCoords.lon}`,
          girl_dob: formatDate(candidate.dob),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: AXIOS_TIMEOUT,
      }
    );

    return response.data;
  } catch (error) {
    console.log("========== PROKERALA DEBUG ==========");
    console.log("URL:", error.config?.url);
    console.log("METHOD:", error.config?.method);
    console.log("PARAMS:", error.config?.params);
    console.log("STATUS:", error.response?.status);
    console.log("HEADERS:", error.config?.headers);
    console.log("RESPONSE:");
    console.log(JSON.stringify(error.response?.data, null, 2));
    console.log("=====================================");

    console.log(error);
  }
};
