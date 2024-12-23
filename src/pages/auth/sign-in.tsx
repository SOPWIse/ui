import { Button } from "@/components/button";
import { FormInput } from "@/components/form-input";
import { useLoginMutation } from "@/hooks/mutations";
import { LoginInput, loginSchema } from "@/schemas/auth";
import { handleToast } from "@/utils/handleToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { SignedOut, SignInButton } from "@clerk/clerk-react";
import { MovingBorderButton } from "@/components/moving-border";
import { KeyRound } from "lucide-react";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLoginMutation();

  const onSubmit = (data: LoginInput) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        handleToast({
          type: "error",
          error,
          message: "Error Logging In",
        });
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8">
      <form
        className="flex flex-col w-2/4 max-w-screen-sm space-y-10"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Welcome Back</h1>
          <p className="mt-2 text-mauve11">
            Welcome Back! Please enter your details
          </p>
        </div>

        <div className="space-y-0">
          <FormInput
            required
            error={errors.email?.message}
            {...register("email")}
            label="E-Mail"
          />
          <div className="relative w-full">
            <FormInput
              required
              type={showPassword ? "text" : "password"}
              error={errors.password?.message}
              {...register("password")}
              label="Password"
            />
            <div className="absolute right-2 top-[45px] flex items-center gap-1 rounded-full p-1 hover:bg-muted">
              {showPassword ? (
                <AiOutlineEyeInvisible
                  className="w-5 h-auto"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              ) : (
                <AiOutlineEye
                  className="w-5 h-auto"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              )}
            </div>
          </div>
          <div className="flex justify-end py-2">
            <Link
              to="/forgot-password"
              className="text-sm font-semibold text-foreground hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <Button
            className="w-full"
            isLoading={loginMutation.isPending}
            type="submit"
          >
            Sign in
          </Button>
          <div className="flex space-x-2 w-full self-center">
            <SignedOut>
              <SignInButton
                children={
                  <MovingBorderButton
                    borderRadius="0.5rem"
                    className="w-full h-10 text-black bg-white dark:bg-slate-900 dark:text-white border-neutral-200 dark:border-slate-800"
                    containerClassName="w-full h-11"
                    type="button"
                    onClick={(e: MouseEvent) => e.preventDefault()}
                  >
                    <KeyRound className="w-4 h-auto m-2" />
                    SSO
                  </MovingBorderButton>
                }
              />
            </SignedOut>
            <Button
              className="w-full"
              variant={"outline"}
              onClick={() => navigate("/sign-up")}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
