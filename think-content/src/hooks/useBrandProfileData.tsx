import { getDocs, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/firebase";
import { BrandProfile, brandProfileState } from "@/src/atoms/brandProfilesAtom";
import { useRecoilState } from "recoil";

const useBrandProfileData = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [brandProfileStateValue, setBrandProfileStateValue] =
    useRecoilState(brandProfileState);

  const getBrandProfiles = async () => {
    setLoading(true);
    try {
      const profileDocs = await getDocs(
        collection(db, `users/${user?.uid}/brandProfiles`)
      );
      const profiles = profileDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as BrandProfile[];

      setBrandProfileStateValue((prev) => ({
        ...prev,
        brandProfiles: profiles,
      }));
    } catch (error: any) {
      console.log("getting brand profiles error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getBrandProfiles()
  }, []); // Run only once on component mount

  return {
    loading,
    error,
    getBrandProfiles,
    brandProfileStateValue,
    setBrandProfileStateValue
  };
};
export default useBrandProfileData;
