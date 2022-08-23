import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import axios from "axios";

const Detail = () => {
  return <div>Detail</div>;
};

const getServerSideProps = async ({ params: { id } }) => {
  const { data } = axios.get("http://localhost:3000/api/post/${id}")
};

export default Detail;
