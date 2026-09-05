/**
 * Format date to readable format
 */
export const formatDate = (date) => {
  if (!date) return 'N/A';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Calculate age from date of birth
 */
export const calculateAge = (dob) => {
  if (!dob) return null;
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

/**
 * Get full name from first and last name
 */
export const getFullName = (firstName, lastName) => {
  return `${firstName || ''} ${lastName || ''}`.trim() || 'Anonymous';
};

/**
 * Get location string from city and country
 */
export const getLocation = (city, country) => {
  return [city, country].filter(Boolean).join(', ');
};

/**
 * Get avatar URL based on gender
 */
export const getAvatarUrl = (gender) => {
  return gender?.toLowerCase() === 'female' 
    ? '/images/female-avatar.png' 
    : '/images/male-avatar.png';
};

/**
 * Check if profile is complete
 */
export const isProfileComplete = (profile) => {
  const { personalInfo, contactProfessional, familyBackground, partnerPreference } = profile;
  return !!(personalInfo && contactProfessional && familyBackground && partnerPreference);
};

/**
 * Get profile completion percentage
 */
export const getProfileCompletion = (profile) => {
  const sections = ['personalInfo', 'contactProfessional', 'familyBackground', 'partnerPreference'];
  const completed = sections.filter(section => profile[section]).length;
  return Math.round((completed / sections.length) * 100);
};

/**
 * Filter profiles by search term
 */
export const filterProfilesBySearch = (profiles, searchTerm) => {
  if (!searchTerm) return profiles;
  const searchLower = searchTerm.toLowerCase();
  return profiles.filter(profile => 
    profile.first_name?.toLowerCase().includes(searchLower) ||
    profile.last_name?.toLowerCase().includes(searchLower) ||
    profile.city?.toLowerCase().includes(searchLower) ||
    profile.country?.toLowerCase().includes(searchLower) ||
    profile.profession?.toLowerCase().includes(searchLower) ||
    profile.education?.toLowerCase().includes(searchLower)
  );
};

/**
 * Filter profiles by filters
 */
export const filterProfilesByFilters = (profiles, filters) => {
  let filtered = [...profiles];

  Object.entries(filters).forEach(([key, value]) => {
    if (!value) return;

    if (key === 'ageMin') {
      filtered = filtered.filter(p => p.age >= parseInt(value));
    } else if (key === 'ageMax') {
      filtered = filtered.filter(p => p.age <= parseInt(value));
    } else {
      filtered = filtered.filter(p => 
        p[key]?.toLowerCase() === value.toLowerCase()
      );
    }
  });

  return filtered;
};