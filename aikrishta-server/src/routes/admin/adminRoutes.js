import express from 'express';
import { protect, isAdmin } from '../../middlewares/authMiddleware.js';
import { uploadVerificationImage } from "../../middlewares/upload.js";
import {
  getDashboardStats,
  getUsersList,
  getUserDetails,
  updateUserStatus,
  getVerificationsList,
  getVerificationDetail,
  verifyUserDocuments,
  updateProfileStatus,
  getFraudDetectionReport,
  generateReport,
  getUserPersonalInfo,
  getUserContactProfessional,
  getUserFamilyBackground,
  getUserPartnerPreference,
  getUserFamilyMembers,
  getUserBasicInfo,
  runFraudDetection,
  getFraudDetection,
} from '../../controllers/admin/adminController.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect);
router.use(isAdmin);

// ✅ Dashboard statistics
router.get('/dashboard', getDashboardStats);

// User management
router.get('/users', getUsersList);
router.get('/users/:id', getUserDetails);
router.patch('/users/:id/status', updateUserStatus);

// ✅ User Profile Data Routes - ADD ALL THESE
router.get('/users/:user_id/personal-information', getUserPersonalInfo);
router.get('/users/:user_id/contact-professional', getUserContactProfessional);
router.get('/users/:user_id/family-background', getUserFamilyBackground);
router.get('/users/:user_id/partner-preference', getUserPartnerPreference);
router.get('/users/:user_id/family-member', getUserFamilyMembers);
router.get('/users/:user_id/basic-info', getUserBasicInfo);

// Verification management
router.get('/verifications', getVerificationsList);
router.get('/verification/:id', getVerificationDetail);
router.post('/verify-documents', verifyUserDocuments);
router.patch('/update-status', updateProfileStatus);

// Reports
router.get('/fraud-detection', getFraudDetectionReport);
router.get('/reports/:type', generateReport);


// router.post("/test-hive", testHiveConnection);
router.post("/fraud-detection/:user_id", runFraudDetection);
router.get("/fraud-detection/:user_id", getFraudDetection);

export default router;