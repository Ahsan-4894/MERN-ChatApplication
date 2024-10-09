import { isValidUsername, isValidEmail } from "6pp";

export const UsernameValidator = (username) => {
  if (!isValidUsername(username))
    return { isValid: false, errorMessage: "Username is invalid" };
};
export const EmailValidator = (email) => {
  if (!isValidEmail(email))
    return { isValid: false, errorMessage: "Email is invalid" };
};
export const PasswordValidator = (password) => {
  if (password.length < 5)
    return { isValid: false, errorMessage: "Password is weak" };
};
