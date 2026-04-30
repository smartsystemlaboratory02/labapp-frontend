"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import Logo from "~/components/ui/Logo";
import { useEffect } from "react";
import { RiseLoader } from "react-spinners";
import { ArrowLeft, ShieldTick } from "iconsax-reactjs";
import LinkText from "~/components/ui/LinkText";
import { useVerifyForgotPasswordOtp } from "~/services/onboarding/queries";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const formSchema = z
  .object({
    code: z.string().min(6, "Please enter the full 6-digit code."),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const navigate = useNavigate();

  const state = useLocation().state;
  const email: string = state?.email || "";

  const {
    mutate: verifyOtp,
    isPending,
    isSuccess,
    isError,
    error,
  } = useVerifyForgotPasswordOtp();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      code: "",
    },
  });

  useEffect(() => {
    console.log(email);

    if (!email.trim()) {
      toast.error("Email not found. Please enter your email");

      setTimeout(() => {
        navigate("/forgot-password");
      }, 1500);
    }

    if (isError) {
      toast.error(
        error.message || "OTP verification failed. Please try again.",
      );
    }

    if (isSuccess) {
      toast.success("OTP verified successfully. Proceed to login");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  }, [isError, isSuccess, error]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    verifyOtp({
      email: email,
      otp: Number(data.code),
      new_password: data.password,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="z-10 w-full max-w-xl"
    >
      <div className="p-4">
        <div className="flex flex-col items-center mb-10">
          <Logo />
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Set New Password
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 text-center max-w-[320px]">
            Please choose a strong password that you haven't used before.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Verification Code
                  </FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS}
                      {...field}
                    >
                      <InputOTPGroup className="gap-2 md:gap-3">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="w-12 h-14 md:w-14 md:h-16 text-xl font-bold rounded-xl border-2 transition-all"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage className="text-center text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      className="h-12 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus:ring-primary/20 transition-all rounded-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Confirm New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      className="h-12 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus:ring-primary/20 transition-all rounded-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isPending}
              className="flex items-center justify-center gap-2"
            >
              {isPending ? (
                <RiseLoader className="text-white" />
              ) : (
                <>
                  <ShieldTick className="w-5 h-5" />
                  Reset Password
                </>
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-10 flex flex-col items-center gap-6">
          <LinkText
            to="/forgot-password"
            className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to email entry
          </LinkText>
        </div>
      </div>
    </motion.div>
  );
};

export default ResetPassword;
