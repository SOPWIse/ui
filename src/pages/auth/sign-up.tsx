import { Button } from "@/components/button";
import { FormInput } from "@/components/form-input";
import { MovingBorderButton } from "@/components/moving-border";
import { useRegisterMutation } from "@/hooks/mutations/auth/useRegisterMutation";
import { RegisterInput, registerSchema } from "@/schemas/auth";
import { handleToast } from "@/utils/handleToast";
import { SignedOut, SignInButton } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useRegisterMutation();

  const onSubmit = (data: RegisterInput) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        handleToast({
          message: "Registeration successful",
          type: "success",
          description: "Please proceed for login with same credentials",
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      },
      onError: (error) => {
        handleToast({
          error,
          message: "Error while registeration",
          type: "error",
        });
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8">
      <form
        className="flex flex-col w-2/4 max-w-screen-sm space-y-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* <img className="w-auto h-16" src={Logo} alt="Company Logo" /> */}
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Welcome Back</h1>
          <p className="mt-2 text-mauve11">
            Welcome Back! Please enter your details
          </p>
        </div>

        <div className="space-y-0">
          <FormInput
            required
            error={errors.name?.message}
            {...register("name")}
            label="Name"
          />
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
        </div>
        <div className="space-y-4">
          <Button
            className="w-full"
            isLoading={registerMutation.isPending}
            type="submit"
          >
            Sign Up
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
              onClick={() => navigate("/")}
            >
              Sign In
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
