import React, { useEffect } from "react";
import { auth } from "@/src/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { Spinner } from "@chakra-ui/react";
import { authModalState } from "../atoms/authModalAtom";
import { useSetRecoilState } from "recoil";
import useWorkspaceData from "./useWorkspaceData";

/*
 * Should be used for any pages that are protected from authenticated users.
 * Wrap the export - i.e. export default withPublic(profile)
 */
export function withPublic(Component: any) {
  return function WithPublic(props: any) {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const { getRecentWorkspace } = useWorkspaceData()

    useEffect(() => {
      const redirectToRecentWorkspace = async () => {
        if (user) {
          const recentWorkspace = await getRecentWorkspace(user);
          if (recentWorkspace) {
            router.replace(`/workspace/${recentWorkspace}`);
          } else {
            router.replace("/");
          }
        }
      };

      redirectToRecentWorkspace();
    }, [user, router]);

    if (user) {
      if (typeof window === "undefined") return null;
      return <></>;
    }

    return <Component auth={auth} {...props} />;
  };
}

/*
 * Should be used for any pages that are protected from non-authenticated users.
 * Wrap the export - i.e. export default withProtected(profile)
 */
export function withProtected(Component: any) {
  return function WithProtected(props: any) {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();
    const setAuthModalState = useSetRecoilState(authModalState);

    useEffect(() => {
      if (!(user || loading)) {
        console.log("REJECTED!")
        router.replace(`/?from=${encodeURIComponent(router.asPath)}`);
        setAuthModalState({ open: true, view: "login" })
      }
    }, [user, loading]);

    return <Component auth={auth} {...props} />;
  };
}