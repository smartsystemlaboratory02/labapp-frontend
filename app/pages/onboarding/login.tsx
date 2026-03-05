"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { GoogleLogo } from "~/components/ui/GoogleLogo";
import LinkText from "~/components/ui/LinkText";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Logo from "~/components/ui/Logo";
import { motion } from "framer-motion";
import Or from "~/components/ui/Or";
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

const formSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const Login = () => {
  const navigate = useNavigate();
  // const queryClient = useQueryClient();

  // const {
  //   mutate: loginMutation,
  //   data: response,
  //   isPending,
  //   isError,
  //   isSuccess,
  //   error,
  // } = useMutation({
  //   mutationFn: loginRequest,
  //   mutationKey: ["loginRequest"],
  // });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form Data:", data);
    // loginMutation(data);
  };

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(error.message || "Login failed");
  //   }
  // }, [isError, error]);

  // if (isSuccess) {
  //   toast.success("Welcome back!");
  //   setSessionStorage("accessToken", response.data?.access_token);
  //   setSessionStorage("token_type", response.data?.token_type);

  //   setTimeout(() => {
  //     queryClient.invalidateQueries({ queryKey: ["currentUser"] });
  //     const homepage = response.data?.is_superuser
  //       ? "/admin/users"
  //       : "/home/evidences";
  //     navigate(homepage);
  //   }, 1500);
  // }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="z-10 w-full max-w-xl"
    >
      <div className="p-4">
        <div className="flex flex-col items-center mb-8">
          <Logo />
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            SSRL Lab App
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
            Enter your credentials to access your dashboard
          </p>
        </div>

        <Button
          variant="outline"
          className="w-full h-11 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-200 gap-3 font-medium"
        >
          <GoogleLogo />
          Continue with Google
        </Button>

        <Or />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@company.com"
                      className="h-11 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus:ring-primary/20 transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Password
                    </FormLabel>
                    <LinkText
                      to="/forgot-password"
                      className="text-xs hover:underline"
                    >
                      Forgot password?
                    </LinkText>
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="VeryStrongPassword123!"
                      className="h-11 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus:ring-primary/20 transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-11 mt-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all"
              // disabled={isPending}
            >
              {/* {isPending ? (
                  <Spinner className="w-4 h-4" />
                ) : ( */}
              Sign in to account
              {/* )} */}
            </Button>
          </form>
        </Form>

        <p className="mt-8 text-center text-sm text-zinc-500">
          New here?{" "}
          <LinkText
            to="/signup"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            Create an account
          </LinkText>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
