export const calculateMatchScore = (currentUser, targetUser) => {
  try {
    const breakdown = {
      age: 0,
      education: 0,
      profession: 0,
      city: 0,
      country: 0,
      religion: 0,
      maritalStatus: 0,
      caste: 0,
      motherTongue: 0,
      height: 0,
      distance: 0,
      verification: 0,
      profileCompletion: 0,
      recentActivity: 0,
      financialStatus: 0,
      socialStatus: 0,
    };

    // Helper: Profile Completion Calculation
    const calculateCompletion = (user) => {
      let completed = 0;
      const fields = ['personalInformation', 'contactProfessional', 'familyBackground', 'partnerPreference'];
      fields.forEach(f => { if (user[f]) completed++; });
      return (completed / fields.length) * 100;
    };

    // 1. Age Match
    let ageDiff = 0;
    if (targetUser.personalInformation?.age && currentUser.partnerPreference?.preferred_age_min) {
      ageDiff = Math.abs(targetUser.personalInformation.age - currentUser.partnerPreference.preferred_age_min);
    } else {
      ageDiff = 10;
    }
    if (ageDiff === 0) breakdown.age = 100;
    else if (ageDiff <= 2) breakdown.age = 80;
    else if (ageDiff <= 5) breakdown.age = 50;
    else breakdown.age = 20;

    // 2. Education Match
    breakdown.education = currentUser.partnerPreference?.preferred_education === targetUser.contactProfessional?.education_level ? 100 : 30;

    // 3. Profession Match
    breakdown.profession = currentUser.partnerPreference?.preferred_profession === targetUser.contactProfessional?.occupation ? 100 : 30;

    // 4. City Match
    breakdown.city = currentUser.partnerPreference?.preferred_city === targetUser.contactProfessional?.city ? 100 : 40;

    // 5. Country Match
    breakdown.country = currentUser.partnerPreference?.preferred_country === targetUser.contactProfessional?.country ? 100 : 30;

    // 6. Religion Match
    breakdown.religion = currentUser.personalInformation?.religion === targetUser.personalInformation?.religion ? 100 : 0;

    // 7. Marital Status Match
    breakdown.maritalStatus = currentUser.partnerPreference?.preferred_marital_status === targetUser.personalInformation?.marital_status ? 100 : 0;

    // 8. Caste Match
    breakdown.caste = currentUser.partnerPreference?.preferred_caste === targetUser.personalInformation?.caste ? 100 : 30;

    // 9. Mother Tongue Match
    breakdown.motherTongue = currentUser.personalInformation?.mother_tongue === targetUser.personalInformation?.mother_tongue ? 100 : 40;

    // 10. Height Match
    let hDiff = 10;
    if (currentUser.personalInformation?.height && targetUser.personalInformation?.height) {
      hDiff = Math.abs(currentUser.personalInformation.height - targetUser.personalInformation.height);
    }
    if (hDiff <= 1) breakdown.height = 100;
    else if (hDiff <= 3) breakdown.height = 80;
    else if (hDiff <= 5) breakdown.height = 60;
    else breakdown.height = 30;

    // 11. Distance Match
    if (currentUser.contactProfessional?.city === targetUser.contactProfessional?.city) breakdown.distance = 100;
    else if (currentUser.contactProfessional?.country === targetUser.contactProfessional?.country) breakdown.distance = 50;
    else breakdown.distance = 10;

    // 12. Verified Profile
    if (targetUser.isVerified === 'Approved') breakdown.verification = 100;
    else if (targetUser.isVerified === 'Pending') breakdown.verification = 50;
    else breakdown.verification = 0;

    // 13. Profile Completion
    breakdown.profileCompletion = calculateCompletion(targetUser);

    // 14. Recent Activity
    const daysDiff = (new Date() - new Date(targetUser.updatedAt)) / (1000 * 60 * 60 * 24);
    if (daysDiff <= 1) breakdown.recentActivity = 100;
    else if (daysDiff <= 7) breakdown.recentActivity = 90;
    else if (daysDiff <= 30) breakdown.recentActivity = 70;
    else breakdown.recentActivity = 40;

    // 15. Financial Status
    breakdown.financialStatus = currentUser.familyBackground?.financial_status === targetUser.familyBackground?.financial_status ? 100 : 40;

    // 16. Social Status
    breakdown.socialStatus = currentUser.familyBackground?.social_status === targetUser.familyBackground?.social_status ? 100 : 30;

    // Final Calculation
    const scores = Object.values(breakdown);
    const totalScore = scores.reduce((a, b) => a + b, 0);
    return {
      score: Math.round(totalScore / 16),
      breakdown
    };
  } catch (error) {
    console.error("Match calculation error:", error);
    return { score: 0, breakdown: {} };
  }
};
