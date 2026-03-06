"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Mail } from "lucide-react";
// import toast from "react-hot-toast";

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
import { useState } from "react";
// import Spinner from "~/components/UI/Spinner";
// import { useRequest } from "~/hooks/useRequest";
// import { useUserData } from "~/context/UserContext";
import { RiseLoader } from "react-spinners";

// Schema validation
const formSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const { userId } = useUserData();
  // const [sendCredRequest, credLoading] = useRequest();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    console.log("Form Data:", data);
    setTimeout(() => setIsSubmitting(false), 2000);
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

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <RiseLoader color="white" /> : "Send OTP"}
            </Button>
          </form>
        </Form>

        <div className="mt-8 flex justify-center">
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
