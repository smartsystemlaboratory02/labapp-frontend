import { useMutation } from "@tanstack/react-query";

import { signupRequest } from "./requests";

export const useSignup = () => {
  return useMutation({
    mutationFn: signupRequest,
    mutationKey: ["signupRequest"],
  });
};
