import React, { useEffect } from "react";
import { auth } from "@/src/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { Spinner } from "@chakra-ui/react";

/*
 * Should be used for any pages that are protected from authenticated users.
 * Wrap the export - i.e. export default withPublic(profile)
 */
export function withPublic(Component: any) {
  return function WithPublic(props: any) {
    const [user] = useAuthState(auth);
    const router = useRouter();

    if (user) {
      if (typeof window === "undefined") return null;
      router.replace("/");
      return <Spinner />;
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

    useEffect(() => {
      if (!(user || loading)) {
        router.replace("/");
      }
    }, [user, loading]);

    return <Component auth={auth} {...props} />;
  };
}
