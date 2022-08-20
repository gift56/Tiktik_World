import React, { useState, useEffect, useRef } from "react";
import { NextPage } from "next";
import { Video } from "../types";

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  return <div>VideoCard</div>;
};

export default VideoCard;
