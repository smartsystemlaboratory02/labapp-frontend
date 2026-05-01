"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

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
import LinkText from "~/components/ui/LinkText";
import { useEffect } from "react";
import { RiseLoader } from "react-spinners";
import { useForgotPasswordMutation } from "~/services/onboarding/queries";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();

  const {
    mutate: sendOtp,
    isPending,
    isSuccess,
    isError,
    error,
  } = useForgotPasswordMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.message || "Failed to send OTP. Please try again.");
    }

    if (isSuccess) {
      toast.success("OTP sent successfully!");

      setTimeout(() => {
        navigate("/reset-password", {
          state: { email: form.getValues("email") },
        });
      }, 1500);
    }
  }, [isError, isSuccess, error]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    sendOtp(data);
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
            Forgot Password?
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 text-center max-w-120">
            No worries! Enter your email and we'll send you a link to reset your
            password.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="name@company.com" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isPending}>
              {isPending ? <RiseLoader color="white" /> : "Send OTP"}
            </Button>
          </form>
        </Form>

        <div className="mt-8 flex justify-center flex-col items-center gap-8">
          <p className="text-sm text-zinc-500">
            Didn't receive the code?{" "}
            <button
              type="button"
              className="font-semibold text-primary hover:underline transition-all"
              onClick={() => sendOtp({ email: form.getValues("email") })}
              disabled={isPending}
            >
              Resend OTP
            </button>{" "}
          </p>
          <LinkText
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Sign in
          </LinkText>
        </div>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
