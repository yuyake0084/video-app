import type { NextPage } from "next";
import { FormEvent, useCallback, useRef, useState } from "react";
import { Video } from "~/components/video";
import { VideoPlayer } from "~/components/video-player";

const Home: NextPage = () => {
  return <VideoPlayer />;
};

export default Home;
