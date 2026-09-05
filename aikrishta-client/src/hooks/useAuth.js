import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import AuthContext from '../context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    toast.error('useAuth must be used within an AuthProvider');
    return null;
  }
  return context;
};
