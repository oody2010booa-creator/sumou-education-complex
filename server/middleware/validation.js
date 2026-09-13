export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validatePhoneNumber = (phone) => {
  const re = /^[0-9\-\+\s]+$/;
  return phone && re.test(phone);
};

export const validateDateFormat = (date) => {
  const re = /^\d{4}-\d{2}-\d{2}$/;
  return re.test(date);
};

export const handleValidationError = (res, message) => {
  res.status(400).json({
    success: false,
    message: message,
  });
};
