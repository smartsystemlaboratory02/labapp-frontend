"use client";

import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { Add, Camera } from "iconsax-reactjs";
import { Asterisk } from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import Logo from "~/components/ui/Logo";

import { RiseLoader } from "react-spinners";
import { useSignup } from "~/services/onboarding/queries";

import { toast } from "sonner";

const formSchema = z
  .object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.email("Invalid email address"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .max(11, "Invalid  phone number"), // TODO: Add regex validation for Nigerian phone numbers
    stack: z.string().min(1, "Please select a stack"),
    niche: z.string().min(1, "Niche is required"),
    bio: z.string().optional(),
    role: z.string().min(1, "Please select a role"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      stack: "",
      niche: "",
      bio: "",
      role: "intern",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    mutateAsync: signUp,
    isPending,
    isError,
    error,
    isSuccess,
  } = useSignup();

  useEffect(() => {
    if (isError) {
      toast.error(error.message || "Something went wrong");
    }

    if (isSuccess) {
      navigate("/onboarding/enter-otp");
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();

    if (selectedImage) formData.append("profile_img", selectedImage);

    Object.entries(data).forEach(([key, value]) => {
      if (key === "confirmPassword") return;
      formData.append(key, String(value));
    });

    await signUp(formData);
    console.log("Form Data:", data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="z-10 w-full max-w-180"
    >
      <div className="p-6">
        <div className="flex flex-col items-center mb-10">
          <Logo />
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Create Personnel
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 text-center">
            Fill in the details below to onboard a new member to the SSRL Lab
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Profile Image Upload */}
            <div className="flex flex-col items-center justify-center gap-4 mb-8">
              <div
                className="group relative w-32 h-32 rounded-full bg-zinc-100 dark:bg-zinc-900 border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center overflow-hidden cursor-pointer hover:border-primary transition-all"
                onClick={handleFileClick}
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center text-zinc-400 group-hover:text-primary">
                    <Camera className="w-8 h-8 mb-1" />
                    <span className="text-[10px] font-bold uppercase">
                      Add Photo
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Add className="text-white w-8 h-8" />
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
                      First Name <Asterisk className="w-3 h-3 text-red-500" />
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
                      Last Name <Asterisk className="w-3 h-3 text-red-500" />
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
                      Email Address{" "}
                      <Asterisk className="w-3 h-3 text-red-500" />
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@ssrl.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
                      Phone Number <Asterisk className="w-3 h-3 text-red-500" />
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="08012345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
                      Password <Asterisk className="w-3 h-3 text-red-500" />
                    </FormLabel>
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

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
                      Confirm Password{" "}
                      <Asterisk className="w-3 h-3 text-red-500" />
                    </FormLabel>
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

              <FormField
                control={form.control}
                name="stack"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Stack <Asterisk className="w-3 h-3 text-red-500" />
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11 bg-zinc-50/50 dark:bg-zinc-900/50">
                          <SelectValue placeholder="Select stack" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position="popper">
                        <SelectItem value="software">Software</SelectItem>
                        <SelectItem value="hardware">Hardware</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="niche"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Niche
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Frontend, Embedded, etc."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Short Bio
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a bit about the new personnel..."
                      className="min-h-30 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <RiseLoader color="white" />
              ) : (
                "Create Personnel Account"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </motion.div>
    // </div>
  );
};

export default Signup;
