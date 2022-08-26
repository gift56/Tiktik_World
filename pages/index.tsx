import axios from "axios";
import NoResult from "../components/NoResult";
import VideoCard from "../components/VideoCard";
import { Video } from "../types";
import { BASE_URL } from "../utils";

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: Video) => <VideoCard post={video} key={video._id} />)
      ) : (
        <NoResult text={"No Videos"} />
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let reponse = null;
  if (topic) {
    reponse = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    reponse = await axios.get(`${BASE_URL}/api/post`);
  }

  return {
    props: {
      videos: reponse.data,
    },
  };
};

export default Home;
