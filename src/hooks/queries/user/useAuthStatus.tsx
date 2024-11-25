import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useUserQuery } from "./useGetCurrentUser";
import { useSSOLoginMutation } from "@/hooks/mutations/auth/useSSOLoginMutation";
import { useLogoutMutation } from "@/hooks/mutations";
import { handleToast } from "@/utils/handleToast";

interface UseAuthReturn {
  isLoggedIn: boolean;
  isLoading: boolean;
}

const useAuthStatus = (): UseAuthReturn => {
  const { data: userData, isLoading: isUserDataLoading } = useUserQuery();
  const { isSignedIn, user: ssoUser, isLoaded } = useUser();
  const ssoLogin = useSSOLoginMutation();
  const logout = useLogoutMutation();
  const navigate = useNavigate();
  // DO NOT REMOVE THIS useState
  const [initialPath] = useState(location.pathname);

  useEffect(() => {
    if (ssoUser) {
      ssoLogin.mutate(
        {
          email: ssoUser.emailAddresses[0].emailAddress,
          name: ssoUser.fullName ?? ssoUser.firstName ?? "",
          password: ssoUser.id,
          role: "ASSISTANT",
          provider:
            ssoUser.externalAccounts[0].verification?.strategy ??
            ssoUser.externalAccounts[0].provider,
        },
        {
          onSuccess: () => {
            navigate(initialPath);
          },
          onError: (error) => {
            logout.mutate();
            handleToast({
              type: "error",
              error,
              message: "Error Logging In",
            });
            console.log("ERROR LOGGING IN ==>", error);
          },
        }
      );
    }
  }, [ssoUser?.id]);

  const isLoading = isUserDataLoading || !isLoaded || ssoLogin.isPending;
  const isLoggedIn = !!userData || !!isSignedIn;

  return {
    isLoggedIn,
    isLoading,
  };
};

export default useAuthStatus;
