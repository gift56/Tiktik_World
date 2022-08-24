import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../store/authStore";

const SugesstedAccount = () => {
  const { fetchAllUsers, allUsers } = useAuthStore();
  
  useEffect(() => {
    fetchAllUsers();
  }, []);

  return <div>SugesstedAccount</div>;
};

export default SugesstedAccount;
