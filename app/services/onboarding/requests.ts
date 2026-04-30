import { makeRequest } from "../api";
import type { PersonnelInfo } from "../personnels/types";

export const getUserDataRequest = () =>
  makeRequest<PersonnelInfo>("/user", "GET");

export const refreshRequest = () =>
  makeRequest("/auth/refresh-session", "POST");

export const signupRequest = (data: FormData) =>
  makeRequest("/auth/register", "POST", data);

export const verifySignupOTPRequest = (data: { email: string; otp: number }) =>
  makeRequest("/auth/verify-otp", "POST", data);

export const loginRequest = (data: { email: string; password: string }) =>
  makeRequest("/auth/login", "POST", data);

export const forgotPasswordOtpRequest = (data: { email: string }) =>
  makeRequest("/auth/send-forgot-password-otp", "POST", data);

export const verifyForgotPasswordOtpRequest = (data: {
  email: string;
  otp: number;
  new_password: string;
}) => makeRequest("/auth/reset-password-with-otp", "POST", data);

export const logoutRequest = () => makeRequest("/auth/logout", "POST");
