import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import useAuthStore from "../store/authStore";
import { client } from "../utils/client";

const Upload = () => {
  return (
    <div className="flex w-full h-full">
      <div className="bg-white rounded-lg">
        <div>
          <div>
            <p>Upload a Video</p>
            <p>Post videos to your account</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
