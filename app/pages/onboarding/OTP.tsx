"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import Logo from "~/components/ui/Logo";
import LinkText from "~/components/ui/LinkText";
import { RiseLoader } from "react-spinners";
import { useEffect } from "react";
import { ArrowLeft, ShieldTick } from "iconsax-reactjs";
import { useVerifySignupOtp } from "~/services/onboarding/queries";
import { toast } from "sonner";

const FormSchema = z.object({
  code: z.string().min(6, "Please enter the full 6-digit code."),
});

const OTPPage = () => {
  const navigate = useNavigate();
  const state = useLocation().state;
  const email: string = state?.email || "";

  const {
    mutate: verifyOtp,
    isPending,
    isSuccess,
    isError,
    error,
  } = useVerifySignupOtp();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { code: "" },
  });

  useEffect(() => {
    if (!email.trim()) {
      toast.error("Email not found. Please enter your email");

      setTimeout(() => {
        navigate("/signup");
      }, 1500);
    }

    if (isError) {
      toast.error(error.message || "Failed to verify OTP. Please try again.");
    }

    if (isSuccess) {
      toast.success("OTP verified successfully! Proceed to login.");

      setTimeout(() => {
        navigate("/", {
          state: { email: email },
        });
      }, 1500);
    }
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    verifyOtp({ email: email, otp: Number(data.code) });
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
            Verify OTP
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 text-center max-w-75">
            Enter the 6-digit code we sent to your email address to continue.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex flex-col items-center"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
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
                  Verify Code
                </>
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-10 flex flex-col items-center gap-6">
          <p className="text-sm text-zinc-500">
            Didn't receive the code?{" "}
            <button
              type="button"
              className="font-semibold text-primary hover:underline transition-all"
            >
              Resend OTP
            </button>{" "}
          </p>

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

export default OTPPage;
