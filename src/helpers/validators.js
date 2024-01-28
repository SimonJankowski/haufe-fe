export const validateEmail = (email) => {
  return email.includes("@") && email.includes(".");
};

export const validatePassword = (password) => {
  return password.length >= 6;
};
