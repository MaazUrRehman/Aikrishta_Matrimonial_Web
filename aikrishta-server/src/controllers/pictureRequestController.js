import asyncHandler from '../utils/asyncHandler.js';
import PictureRequest from '../models/pictureRequestModel.js';
import User from '../models/User.js';
import ApiResponse from '../utils/ApiResponse.js';
import AppError from '../utils/AppError.js';
import sendEmail from '../utils/email.js';
import PersonalInformation from '../models/profile/personalInformationModel.js';
import ContactProfessional from '../models/profile/contactProfessionalModel.js';

// 1. Send/Resend Picture Request
export const sendPictureRequest = asyncHandler(async (req, res, next) => {
  const { ownerId } = req.body;
  const requesterId = req.user._id;

  if (requesterId.toString() === ownerId) {
    return next(new AppError("You cannot request your own picture.", 400));
  }

  let request = await PictureRequest.findOne({ requesterId, ownerId });

  if (!request) {
    request = await PictureRequest.create({ requesterId, ownerId });
  }

  // Get requester and owner details for email
  const requester = await User.findById(requesterId);
  const owner = await User.findById(ownerId);

  if (!owner) {
    return next(new AppError("The target profile user was not found.", 404));
  }
  if (!requester) {
    return next(new AppError("Requester user not found.", 404));
  }

  const requesterPersonalInfo = await PersonalInformation.findOne({ user_id: requesterId });
  const requesterProfessionalInfo = await ContactProfessional.findOne({ user_id: requesterId });

  const requesterAge = requesterPersonalInfo?.age || 'N/A';
  const requesterProfession = requesterProfessionalInfo?.occupation || 'N/A';
  const requesterCity = requesterProfessionalInfo?.city || 'N/A';
  const requesterCountry = requesterProfessionalInfo?.country || 'N/A';

  // Send Email
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
  const approveUrl = `${process.env.SERVER_URL}/api/v1/picture-requests/approve/${request._id}`;
  const rejectUrl = `${process.env.SERVER_URL}/api/v1/picture-requests/reject/${request._id}`;
  const requesterProfileUrl = `${clientUrl}/profile-details/${requesterId}`;
  
  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; border: none; background-color: #ffffff; color: #333;">
      <div style="background-color: #8B1E3F; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">AIKRISHTA</h1>
      </div>
      <div style="padding: 30px;">
        <h2 style="color: #8B1E3F; text-align: center; margin-bottom: 20px;">Picture Request Received</h2>
        <p style="font-size: 16px; line-height: 1.5;">Hello <strong>${owner.fullName}</strong>,</p>
        <p style="font-size: 16px; line-height: 1.5;">A user has requested to view your private profile picture. Here are the requester's details:</p>
        
        <table style="width: 100%; border-collapse: separate; border-spacing: 0; margin: 25px 0; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <tr style="background-color: #f8f8f8;">
            <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e0e0e0; color: #555;">Field</th>
            <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e0e0e0; color: #555;">Details</th>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;"><strong>Requester Name</strong></td>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">${requester.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;"><strong>Age</strong></td>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">${requesterAge}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;"><strong>Profession</strong></td>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">${requesterProfession}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;"><strong>Location</strong></td>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">${requesterCity}, ${requesterCountry}</td>
          </tr>
          <tr>
            <td style="padding: 12px;"><strong>Profile</strong></td>
            <td style="padding: 12px;"><a href="${requesterProfileUrl}" style="color: #8B1E3F; font-weight: bold; text-decoration: none;">View Profile</a></td>
          </tr>
        </table>
        
        <p style="font-size: 16px; line-height: 1.5; text-align: center; margin-bottom: 30px;">Please take a moment to review this request.</p>
        
        <div style="text-align: center;">
          <a href="${approveUrl}" style="padding: 14px 30px; background-color: #2E7D32; color: #ffffff; text-decoration: none; border-radius: 30px; font-weight: bold; margin: 0 10px; display: inline-block; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">Approve</a>
          <a href="${rejectUrl}" style="padding: 14px 30px; background-color: #D32F2F; color: #ffffff; text-decoration: none; border-radius: 30px; font-weight: bold; margin: 0 10px; display: inline-block; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">Reject</a>
        </div>
      </div>
      <div style="padding: 20px; background-color: #f4f4f4; text-align: center; font-size: 12px; color: #888; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
        <p>&copy; ${new Date().getFullYear()} AIKRISHTA. All rights reserved.</p>
        <p>This is an automated email. Please do not reply.</p>
      </div>
    </div>
  `;

  await sendEmail({
    email: owner.email,
    subject: "Picture Request - AIKRISHTA",
    html,
  });

  return new ApiResponse(res, 200, "Picture request sent/resent successfully.", { request });
});

const getStatusPage = (message, title, iconColor, icon) => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f5f5f5, #e0e0e0); margin: 0;">
    <div style="background-color: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); text-align: center; max-width: 400px; width: 100%;">
      <div style="font-size: 60px; color: ${iconColor}; margin-bottom: 20px;">${icon}</div>
      <h2 style="color: #333; margin-bottom: 10px;">${title}</h2>
      <p style="color: #666; margin-bottom: 30px; line-height: 1.5;">${message}<br>You may now close this tab.</p>
      <div style="font-weight: bold; color: #8B1E3F;">AIKRISHTA</div>
    </div>
  </div>
`;

// 2. Approve Picture Request
export const approvePictureRequest = asyncHandler(async (req, res, next) => {
  const { requestId } = req.params;

  const request = await PictureRequest.findById(requestId);

  if (!request) {
    return next(new AppError("Request not found.", 404));
  }

  if (request.status === 'Approved') {
    return res.status(200).send(getStatusPage("This request has already been approved.", "Already Approved", "#ffc107", "ℹ️"));
  }

  request.status = 'Approved';
  request.approvedAt = Date.now();
  await request.save();

  return res.status(200).send(getStatusPage("The requester can now view your profile picture.", "Request Approved Successfully", "#28a745", "✓"));
});

// 2b. Reject Picture Request
export const rejectPictureRequest = asyncHandler(async (req, res, next) => {
  const { requestId } = req.params;

  const request = await PictureRequest.findById(requestId);

  if (!request) {
    return next(new AppError("Request not found.", 404));
  }

  if (request.status === 'Rejected') {
    return res.status(200).send(getStatusPage("This request has already been rejected.", "Already Rejected", "#ffc107", "ℹ️"));
  }

  request.status = 'Rejected';
  await request.save();

  return res.status(200).send(getStatusPage("The request has been rejected successfully.", "Request Rejected Successfully", "#dc3545", "✕"));
});

// 3. Check Picture Permission
export const checkPicturePermission = asyncHandler(async (req, res, next) => {
  const { ownerId } = req.params;
  const requesterId = req.user._id;

  if (requesterId.toString() === ownerId) {
    return new ApiResponse(res, 200, "Permission status checked.", { status: 'Approved' });
  }

  const request = await PictureRequest.findOne({ requesterId, ownerId });

  return new ApiResponse(res, 200, "Permission status checked.", { 
    status: request ? request.status : 'No Request' 
  });
});
