

// services/sms/twilioService.js
import twilio from 'twilio';

// ✅ Twilio Client Initialization (Sirf ACCOUNT_SID aur AUTH_TOKEN se)
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// ✅ Agar API Key bhi use karna hai (optional)
// const client = twilio(
//   process.env.TWILIO_API_KEY_SID,
//   process.env.TWILIO_API_KEY_SECRET,
//   { accountSid: process.env.TWILIO_ACCOUNT_SID }
// );

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/*
|--------------------------------------------------------------------------
| Send OTP via SMS (Manual)
|--------------------------------------------------------------------------
*/
export const sendOTP = async (phoneNumber) => {
  try {
    const cleanNumber = phoneNumber.trim();
    const otp = generateOTP();
    
    console.log(`📤 Sending OTP to: ${cleanNumber}`);
    console.log(`🔑 OTP Code: ${otp}`); // Log for testing

    // ✅ Send SMS using Twilio Messages API
    const message = await client.messages.create({
      body: `Your Aikrishta verification code is: ${otp}. Valid for 5 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: cleanNumber,
    });

    console.log('✅ SMS Sent:', message.sid);
    
    // ✅ Return OTP with SID (OTP ko database mein save karna hoga)
    return { 
      success: true, 
      sid: message.sid,
      otp: otp, // ⚠️ Sirf testing ke liye, production mein remove karein
      status: 'pending'
    };
  } catch (error) {
    console.error('❌ Twilio Send Error:', error.message);
    
    // Error handling
    if (error.code === 21211) {
      console.log('Invalid phone number format. Use country code like +92.');
    }
    if (error.code === 21608) {
      console.log('This phone number is not verified. Use Trial Mode numbers only.');
    }
    if (error.code === 20003) {
      console.log('Authentication failed. Check your credentials.');
    }
    
    console.log(error.message || 'Failed to send OTP via SMS.');
  }
};

/*
|--------------------------------------------------------------------------
| Verify OTP (Manual)
|--------------------------------------------------------------------------
*/
export const verifyOTP = async (phoneNumber, userEnteredOTP, storedOTP) => {
  try {
    const cleanNumber = phoneNumber.trim();
    
    console.log(`🔍 Verifying OTP for: ${cleanNumber}`);
    
    // ✅ Check if OTP matches
    if (userEnteredOTP === storedOTP) {
      console.log('✅ OTP Verified Successfully');
      return { 
        success: true, 
        status: 'approved' 
      };
    } else {
      console.log('❌ Invalid OTP');
      return { 
        success: false, 
        status: 'pending' 
      };
    }
  } catch (error) {
    console.error('❌ Verify Error:', error.message);
    console.log(error.message || 'Failed to verify OTP.');
  }
};

/*
|--------------------------------------------------------------------------
| Send Custom SMS
|--------------------------------------------------------------------------
*/
export const sendCustomSMS = async (phoneNumber, messageText) => {
  try {
    const cleanNumber = phoneNumber.trim();
    
    const message = await client.messages.create({
      body: messageText,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: cleanNumber,
    });

    console.log('✅ Custom SMS Sent:', message.sid);
    return { success: true, sid: message.sid };
  } catch (error) {
    console.error('❌ SMS Error:', error.message);
    console.log(error.message || 'Failed to send SMS.');
  }
};

/*
|--------------------------------------------------------------------------
| Validate Phone Number
|--------------------------------------------------------------------------
*/
export const validatePhoneNumber = async (phoneNumber) => {
  try {
    const cleanNumber = phoneNumber.trim();
    
    // ✅ Using Lookups API for validation
    const result = await client.lookups.v2.phoneNumbers(cleanNumber).fetch();
    console.log('📱 Phone Valid:', result.valid);
    return { 
      valid: result.valid, 
      countryCode: result.countryCode,
      phoneNumber: result.phoneNumber
    };
  } catch (error) {
    console.error('❌ Validation Error:', error.message);
    return { 
      valid: false, 
      error: 'Invalid phone number format' 
    };
  }
};