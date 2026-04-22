import { useMutation } from "@tanstack/react-query";

import {
  forgotPasswordOtpRequest,
  loginRequest,
  verifySignupOTPRequest,
  signupRequest,
  verifyForgotPasswordOtpRequest,
} from "./requests";

export const useSignup = () => {
  return useMutation({
    mutationFn: signupRequest,
    mutationKey: ["signupRequest"],
  });
};

export const useVerifySignupOtp = () => {
  return useMutation({
    mutationFn: verifySignupOTPRequest,
    mutationKey: ["sendOtpRequest"],
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginRequest,
    mutationKey: ["loginRequest"],
  });
};

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: forgotPasswordOtpRequest,
    mutationKey: ["forgotPasswordOtpRequest"],
  });
};

export const useVerifyForgotPasswordOtp = () => {
  return useMutation({
    mutationFn: verifyForgotPasswordOtpRequest,
    mutationKey: ["verifyForgotPasswordOtpRequest"],
  });
};