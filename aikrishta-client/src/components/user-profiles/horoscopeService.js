import axiosInstance from '@/lib/axios';
import { toast } from 'react-hot-toast';

export const getHoroscopeMatch = async (data) => {
  try {
    const response = await axiosInstance.post('/horoscope/check', data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching horoscope match:', error);
    toast.error(error.response?.data?.message || 'Failed to calculate horoscope compatibility');
    return null;
  }
};
