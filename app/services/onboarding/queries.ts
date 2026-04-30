import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  forgotPasswordOtpRequest,
  loginRequest,
  verifySignupOTPRequest,
  signupRequest,
  verifyForgotPasswordOtpRequest,
  getUserDataRequest,
} from "./requests";

export const useGetUserDataQuery = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getUserDataRequest,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    retry: false,
  });
};

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginRequest,
    mutationKey: ["loginRequest"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
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
