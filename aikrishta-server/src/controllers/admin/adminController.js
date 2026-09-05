// src/controllers/admin/adminController.js
import User from '../../models/User.js';
import AppError from '../../utils/AppError.js';
import ApiResponse from '../../utils/ApiResponse.js';
import PersonalInformation from "../../models/profile/personalInformationModel.js";
import ProfileType from '../../models/profile/profileTypeModel.js';
import fs from "fs";
import {
  analyzeDocumentWithHive,
  parseHiveResponse,
} from "../../services/hiveFraudDetectionService.js";

// Try to import other models
let ProfileVerification, ContactProfessional, FamilyBackground, PartnerPreference, FamilyMember;

try {
  ProfileVerification = (await import('../../models/profile/profileVerificationModel.js')).default;
} catch (e) {
  console.log('⚠️ ProfileVerification model not found, using mock data');
  ProfileVerification = null;
}

try {
  ContactProfessional = (await import('../../models/profile/contactProfessionalModel.js')).default;
} catch (e) {
  console.log('⚠️ ContactProfessional model not found');
  ContactProfessional = null;
}

try {
  FamilyBackground = (await import('../../models/profile/familyBackgroundModel.js')).default;
} catch (e) {
  console.log('⚠️ FamilyBackground model not found');
  FamilyBackground = null;
}

try {
  PartnerPreference = (await import('../../models/profile/partnerPreferenceModel.js')).default;
} catch (e) {
  console.log('⚠️ PartnerPreference model not found');
  PartnerPreference = null;
}

try {
  FamilyMember = (await import('../../models/profile/familyMemberModel.js')).default;
} catch (e) {
  console.log('⚠️ FamilyMember model not found');
  FamilyMember = null;
}

// ==================== DASHBOARD STATISTICS ====================
export const getDashboardStats = async (req, res, next) => {
  try {
    console.log('📊 Fetching dashboard statistics...');

    const totalProfiles = await User.countDocuments({
      role: { $regex: /^user$/i }
    });
    console.log('Total Profiles (Users only):', totalProfiles);

    let verifiedProfiles = 0;
    let pendingVerifications = 0;
    let rejectedVerifications = 0;

    if (ProfileVerification) {
      verifiedProfiles = await ProfileVerification.countDocuments({
        profile_status: 'Approved'
      });
      console.log('Verified Profiles:', verifiedProfiles);

      pendingVerifications = await ProfileVerification.countDocuments({
        profile_status: {
          $in: ['Pending', 'Phone Pending', 'Email Pending', 'Documents Pending', 'Under Review']
        }
      });
      console.log('Pending Verifications:', pendingVerifications);

      rejectedVerifications = await ProfileVerification.countDocuments({
        profile_status: 'Rejected'
      });
      console.log('Rejected Verifications:', rejectedVerifications);
    } else {
      console.log('⚠️ Using fallback data for verifications');
      verifiedProfiles = 0;
      pendingVerifications = 0;
      rejectedVerifications = 0;
    }

    const recentActivities = await getRecentActivities();

    return new ApiResponse(res, 200, 'Dashboard statistics retrieved successfully', {
      totalProfiles: totalProfiles || 0,
      verifiedProfiles: verifiedProfiles || 0,
      pendingVerifications: pendingVerifications || 0,
      rejectedVerifications: rejectedVerifications || 0,
      recentActivities: recentActivities || [],
    });

  } catch (error) {
    console.error('Error in getDashboardStats:', error);
    return new ApiResponse(res, 200, 'Dashboard statistics (with mock data)', {
      totalProfiles: 15000,
      verifiedProfiles: 5000,
      pendingVerifications: 120,
      rejectedVerifications: 45,
      recentActivities: [
        {
          type: 'user_register',
          message: 'John Doe registered',
          timestamp: new Date().toISOString(),
        },
        {
          type: 'verification_submitted',
          message: 'Jane Smith submitted verification',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          type: 'user_verified',
          message: 'Mike Johnson profile verified',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
        },
        {
          type: 'verification_rejected',
          message: 'Sarah Williams verification rejected',
          timestamp: new Date(Date.now() - 10800000).toISOString(),
        },
      ],
    });
  }
};

export const getVerificationDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!ProfileVerification) {
      return new ApiResponse(res, 200, 'Verification detail (mock data)', {
        _id: id,
        user_id: {
          _id: id,
          fullName: 'John Doe',
          name: 'John Doe',
        },
        phone: '+1234567890',
        phone_verified: true,
        email: 'john@example.com',
        email_verified: true,
        documents: [
          {
            type: 'ID Card Front',
            url: '#',
            document_verified: true,
          },
          {
            type: 'ID Card Back',
            url: '#',
            document_verified: false,
          }
        ],
        profile_status: 'Pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    const verification = await ProfileVerification.findOne({ user_id: id })
      .populate('user_id', 'fullName name email phone');

    if (!verification) {
      return next(new AppError('Verification record not found', 404));
    }

    return new ApiResponse(res, 200, 'Verification detail retrieved successfully', verification);
  } catch (error) {
    next(error);
  }
};

// ==================== RECENT ACTIVITIES ====================
const getRecentActivities = async () => {
  const activities = [];

  try {
    const recentUsers = await User.find({
      role: { $regex: /^user$/i }
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('fullName createdAt');

    recentUsers.forEach(user => {
      activities.push({
        type: 'user_register',
        message: `${user.fullName} registered`,
        timestamp: user.createdAt,
      });
    });

    if (ProfileVerification) {
      const recentVerifications = await ProfileVerification.find()
        .sort({ updatedAt: -1 })
        .limit(5)
        .populate('user_id', 'fullName');

      recentVerifications.forEach(ver => {
        const status = ver.profile_status;
        let type = 'verification_submitted';
        let message = `${ver.user_id?.fullName || 'User'} submitted verification`;

        if (status === 'Approved') {
          type = 'user_verified';
          message = `${ver.user_id?.fullName || 'User'} profile verified`;
        } else if (status === 'Rejected') {
          type = 'verification_rejected';
          message = `${ver.user_id?.fullName || 'User'} verification rejected`;
        } else if (['Pending', 'Phone Pending', 'Email Pending', 'Documents Pending', 'Under Review'].includes(status)) {
          type = 'verification_pending';
          message = `${ver.user_id?.fullName || 'User'} verification pending`;
        }

        activities.push({
          type: type,
          message: message,
          timestamp: ver.updatedAt,
        });
      });
    }

  } catch (error) {
    console.error('Error fetching recent activities:', error);
  }

  return activities
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);
};

// ==================== USER MANAGEMENT ====================
// export const getUsersList = async (req, res, next) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 20;
//     const skip = (page - 1) * limit;

//     const users = await User.find({ role: { $regex: /^user$/i } })
//       .skip(skip)
//       .limit(limit)
//       .select('-password')
//       .sort({ createdAt: -1 });

//     const total = await User.countDocuments({ role: { $regex: /^user$/i } });

//     return new ApiResponse(res, 200, 'Users retrieved successfully', {
//       users,
//       total,
//       page,
//       totalPages: Math.ceil(total / limit),
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// ==================== USER MANAGEMENT ====================
// ✅ YE PURANA FUNCTION REPLACE KAREIN
export const getUsersList = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';

    // Build search query
    const searchQuery = {};
    if (search) {
      searchQuery.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    // Get users
    const users = await User.find({
      role: { $regex: /^user$/i },
      ...searchQuery
    })
      .skip(skip)
      .limit(limit)
      .select('-password')
      .sort({ createdAt: -1 })
      .lean(); // ✅ lean() use karein for better performance

    const total = await User.countDocuments({
      role: { $regex: /^user$/i },
      ...searchQuery
    });

    // ✅ Get user IDs
    const userIds = users.map(user => user._id);

    // ✅ Get Profile Types for these users
    const profileTypes = await ProfileType.find({
      user_id: { $in: userIds }
    }).lean();

    // ✅ Get Verifications for these users
    let verifications = [];
    if (ProfileVerification) {
      verifications = await ProfileVerification.find({
        user_id: { $in: userIds }
      }).lean();
    }

    // ✅ Create maps for quick lookup
    const profileTypeMap = {};
    profileTypes.forEach(pt => {
      profileTypeMap[pt.user_id.toString()] = pt;
    });

    const verificationMap = {};
    verifications.forEach(ver => {
      verificationMap[ver.user_id.toString()] = ver;
    });

    // ✅ Transform users with profile_for and verification status
    const transformedUsers = users.map(user => {
      const userId = user._id.toString();
      const profileType = profileTypeMap[userId];
      const verification = verificationMap[userId];

      // ✅ Documents verification check
      let documentsVerified = false;
      if (verification?.documents && verification.documents.length > 0) {
        // ✅ Sirf tab true jab saare documents verified hon
        documentsVerified = verification.documents.every(doc => doc.document_verified === true);
      }

      return {
        ...user,
        // Profile Type
        profile_for: profileType?.profile_for || 'Myself',
        // Verification Status
        phoneVerified: verification?.phone_verified || false,
        emailVerified: verification?.email_verified || false,
        documentsVerified: documentsVerified,         // Full verification data (optional)
        verification: verification || null,
        // Profile type data (optional)
        profileType: profileType || null,
      };
    });

    return new ApiResponse(res, 200, 'Users retrieved successfully', {
      users: transformedUsers,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error in getUsersList:', error);
    next(error);
  }
};

export const getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('profile');

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    return new ApiResponse(res, 200, 'User details retrieved successfully', user);
  } catch (error) {
    next(error);
  }
};

export const updateUserStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select('-password');

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    return new ApiResponse(res, 200, 'User status updated successfully', user);
  } catch (error) {
    next(error);
  }
};

// ==================== VERIFICATION MANAGEMENT ====================
export const getVerificationsList = async (req, res, next) => {
  try {
    if (!ProfileVerification) {
      return new ApiResponse(res, 200, 'Verifications (mock data)', {
        verifications: [],
        total: 0,
        page: 1,
        totalPages: 0,
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = {
      profile_status: {
        $in: ['Pending', 'Phone Pending', 'Email Pending', 'Documents Pending', 'Under Review']
      }
    };

    const verifications = await ProfileVerification.find(filter)
      .skip(skip)
      .limit(limit)
      .populate('user_id', 'fullName name email')
      .sort({ createdAt: -1 });

    const total = await ProfileVerification.countDocuments(filter);

    return new ApiResponse(res, 200, 'Verifications retrieved successfully', {
      verifications,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};


export const verifyUserDocuments = async (req, res, next) => {
  try {
    if (!ProfileVerification) {
      return new ApiResponse(res, 200, "Verification (mock data)", {
        message: "Verification updated successfully (mock)",
      });
    }

    const { user_id, verified, remarks } = req.body;

    console.log("Verifying documents for user:", user_id);

    // Convert to proper boolean
    const isVerified = verified === true || verified === "true";

    // Find verification
    const verification = await ProfileVerification.findOne({ user_id });

    if (!verification) {
      return next(
        new AppError("Verification record not found for this user", 404)
      );
    }

    if (!verification.documents || verification.documents.length === 0) {
      return next(new AppError("No documents found to verify", 400));
    }

    // ✅ Update document verification only
    verification.documents.forEach((doc) => {
      doc.document_verified = isVerified;
    });

    // Optional: Save remarks only
    // verification.admin_remarks =
    //   remarks || verification.admin_remarks;

    if (remarks !== undefined) {
      verification.admin_remarks = remarks;
    }

    verification.updatedAt = new Date();

    // ❌ Do NOT change profile_status here
    // ❌ Do NOT change isVerified here

    await verification.save();

    console.log(
      "Documents after update:",
      verification.documents.map((doc) => ({
        type: doc.type,
        document_verified: doc.document_verified,
      }))
    );

    return new ApiResponse(
      res,
      200,
      `Documents ${isVerified ? "verified" : "rejected"
      } successfully`,
      verification
    );
  } catch (error) {
    console.error("Error in verifyUserDocuments:", error);
    next(error);
  }
};

// ==================== UPDATE PROFILE STATUS ====================
export const updateProfileStatus = async (req, res, next) => {
  try {
    const { user_id, profile_status, remarks } = req.body;

    if (!ProfileVerification) {
      return new ApiResponse(res, 200, 'Profile status updated (mock)', {
        message: 'Profile status updated successfully',
      });
    }

    const verification = await ProfileVerification.findOneAndUpdate(
      { user_id },
      {
        profile_status,
        admin_remarks: remarks,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!verification) {
      return next(new AppError('Verification record not found', 404));
    }

    await User.findByIdAndUpdate(user_id, {
      isVerified: profile_status === 'Approved',
    });

    return new ApiResponse(res, 200, 'Profile status updated successfully', verification);
  } catch (error) {
    next(error);
  }
};

// ==================== REPORTS ====================
export const getFraudDetectionReport = async (req, res, next) => {
  try {
    return new ApiResponse(res, 200, 'Fraud detection report generated', {
      suspiciousProfiles: [],
      flaggedActivities: [],
      recommendations: [],
    });
  } catch (error) {
    next(error);
  }
};

export const generateReport = async (req, res, next) => {
  try {
    const { type } = req.params;
    const { startDate, endDate } = req.query;

    let reportData = {};

    switch (type) {
      case 'users':
        reportData = await generateUserReport(startDate, endDate);
        break;
      case 'verifications':
        reportData = await generateVerificationReport(startDate, endDate);
        break;
      case 'matches':
        reportData = await generateMatchReport(startDate, endDate);
        break;
      default:
        return next(new AppError('Invalid report type', 400));
    }

    return new ApiResponse(res, 200, 'Report generated successfully', reportData);
  } catch (error) {
    next(error);
  }
};

// ==================== REPORT HELPERS ====================
const generateUserReport = async (startDate, endDate) => {
  const query = { role: { $regex: /^user$/i } };
  if (startDate && endDate) {
    query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  const totalUsers = await User.countDocuments(query);
  const newUsers = await User.countDocuments({
    ...query,
    createdAt: { $gte: new Date(startDate || new Date().setDate(1)) }
  });

  return {
    totalUsers,
    newUsers,
    activeUsers: totalUsers,
    demographics: {},
  };
};

const generateVerificationReport = async (startDate, endDate) => {
  if (!ProfileVerification) {
    return {
      total: 0,
      approved: 0,
      rejected: 0,
      pending: 0,
    };
  }

  const query = {};
  if (startDate && endDate) {
    query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  return {
    total: await ProfileVerification.countDocuments(query),
    approved: await ProfileVerification.countDocuments({ ...query, profile_status: 'Approved' }),
    rejected: await ProfileVerification.countDocuments({ ...query, profile_status: 'Rejected' }),
    pending: await ProfileVerification.countDocuments({
      ...query,
      profile_status: { $in: ['Pending', 'Phone Pending', 'Email Pending', 'Documents Pending', 'Under Review'] }
    }),
  };
};

const generateMatchReport = async (startDate, endDate) => {
  return {
    totalMatches: 0,
    successRate: 0,
    averageTimeToMatch: 0,
  };
};


export const getUserPersonalInfo = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    if (!PersonalInformation) {
      return new ApiResponse(res, 200, "Personal information model not available", null);
    }

    const personalInfo = await PersonalInformation.findOne({ user_id });

    if (!personalInfo) {
      return new ApiResponse(
        res,
        200,
        "No personal information found",
        null
      );
    }

    return new ApiResponse(
      res,
      200,
      "Personal information retrieved successfully",
      personalInfo
    );
  } catch (err) {
    console.error('Error fetching personal info:', err);
    return new ApiResponse(res, 200, "Error fetching personal information", null);
  }
};

export const getUserContactProfessional = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    if (!ContactProfessional) {
      return new ApiResponse(res, 200, "Contact professional model not available", null);
    }

    const contactInfo = await ContactProfessional.findOne({ user_id });

    if (!contactInfo) {
      return new ApiResponse(
        res,
        200,
        "No contact professional information found",
        null
      );
    }

    return new ApiResponse(
      res,
      200,
      "Contact professional information retrieved successfully",
      contactInfo
    );
  } catch (err) {
    console.error('Error fetching contact professional info:', err);
    return new ApiResponse(res, 200, "Error fetching contact professional information", null);
  }
};

export const getUserFamilyBackground = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    if (!FamilyBackground) {
      return new ApiResponse(res, 200, "Family background model not available", null);
    }

    const familyInfo = await FamilyBackground.findOne({ user_id });

    if (!familyInfo) {
      return new ApiResponse(
        res,
        200,
        "No family background information found",
        null
      );
    }

    return new ApiResponse(
      res,
      200,
      "Family background information retrieved successfully",
      familyInfo
    );
  } catch (err) {
    console.error('Error fetching family background:', err);
    return new ApiResponse(res, 200, "Error fetching family background information", null);
  }
};

export const getUserPartnerPreference = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    if (!PartnerPreference) {
      return new ApiResponse(res, 200, "Partner preference model not available", null);
    }

    const preference = await PartnerPreference.findOne({ user_id });

    if (!preference) {
      return new ApiResponse(
        res,
        200,
        "No partner preference information found",
        null
      );
    }

    return new ApiResponse(
      res,
      200,
      "Partner preference information retrieved successfully",
      preference
    );
  } catch (err) {
    console.error('Error fetching partner preference:', err);
    return new ApiResponse(res, 200, "Error fetching partner preference information", null);
  }
};



// ✅ YE FUNCTION ADD KAREIN (agar nahi hai toh)
export const getUserFamilyMembers = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    if (!FamilyMember) {
      return new ApiResponse(res, 200, "Family member model not available", []);
    }

    const familyMembers = await FamilyMember.find({ user_id }).lean();

    if (!familyMembers || familyMembers.length === 0) {
      return new ApiResponse(
        res,
        200,
        "No family members found",
        []
      );
    }

    return new ApiResponse(
      res,
      200,
      "Family members retrieved successfully",
      familyMembers
    );
  } catch (err) {
    console.error('Error fetching family members:', err);
    return new ApiResponse(res, 200, "Error fetching family members", []);
  }
};

export const getUserBasicInfo = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    const user = await User.findById(user_id).select('-password');

    if (!user) {
      return new ApiResponse(res, 200, "User not found", null);
    }

    return new ApiResponse(
      res,
      200,
      "User basic information retrieved successfully",
      user
    );
  } catch (err) {
    console.error('Error fetching user basic info:', err);
    return new ApiResponse(res, 200, "Error fetching user basic information", null);
  }
};








export const runFraudDetection = async (req, res) => {
  try {

    // Latest verification record
    const { user_id } = req.params;

    const verification = await ProfileVerification.findOne({
      user_id,
    });

    if (!verification) {
      return res.status(404).json({
        success: false,
        message: "No verification record found.",
      });
    }

    if (!verification.documents.length) {
      return res.status(404).json({
        success: false,
        message: "No document uploaded.",
      });
    }

    const document = verification.documents.find(
      (doc) => doc.document_verified === false
    );

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found.",
      });
    }

    const imageUrl = document.url;

    // ✅ Hive Service
    const hiveResponse = await analyzeDocumentWithHive(imageUrl);

    // ✅ Parse Response
    const aiReport = parseHiveResponse(hiveResponse);

    verification.fraud_detection = {
      analyzed: true,

      overall_risk: aiReport.overallRisk,

      confidence: aiReport.confidence,

      edited: aiReport.edited,

      tampering: aiReport.tampering,

      blur: aiReport.blur,

      ocr_issues: aiReport.ocrIssues,

      remarks: aiReport.remarks,

      raw_response: aiReport.rawResponse,

      analyzed_at: new Date(),
    };

    await verification.save();

    return res.status(200).json({
      success: true,
      message: "Fraud detection completed successfully.",
      image: imageUrl,
      report: verification.fraud_detection,
    });

  } catch (err) {

    console.log(err.response?.data || err.message);

    return res.status(500).json({
      success: false,
      error: err.response?.data || err.message,
    });

  }
};


export const getFraudDetection = async (req, res) => {

  try {

    const { user_id } = req.params;

    const verification =
      await ProfileVerification.findOne({ user_id });

    if (!verification) {

      return res.status(404).json({

        success: false,
        message: "Verification not found.",

      });

    }

    return res.status(200).json({

      success: true,

      report: verification.fraud_detection,

    });

  } catch (err) {

    return res.status(500).json({

      success: false,

      error: err.message,

    });

  }

};