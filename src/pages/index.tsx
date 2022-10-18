import type { NextPage } from "next";
import { EpisodeList } from "~/components/episode-list";
import { VideoPlayer } from "~/components/video-player";

const Home: NextPage = () => {
  return (
    <div>
      <VideoPlayer />
      <EpisodeList />
    </div>
  );
};

export default Home;
