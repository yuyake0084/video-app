import { FormEvent, useCallback, useMemo, useRef, useState } from "react";
import Loading from "react-loading";

import { Video } from "~/components/video";
import * as Styled from "./style";

export const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(true);
  const duration = videoRef.current?.duration ?? 0;
  const playRate = useMemo(() => {
    return (currentTime / duration) * 100;
  }, [duration, currentTime]);

  return (
    <Styled.Wrapper>
      <Styled.VideoBox>
        <Video
          ref={videoRef}
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          muted
          autoPlay
          onClick={() => {
            if (videoRef.current?.paused) {
              videoRef.current.play();
            } else {
              videoRef.current?.pause();
            }
          }}
          onPlaying={useCallback(() => {
            setIsLoadingMetadata(false);
          }, [])}
          onTimeUpdate={(e) => {
            const { currentTime } = e.currentTarget;

            setCurrentTime(Math.floor(currentTime));
          }}
        />
        {isLoadingMetadata && (
          <Styled.LoadingBox>
            <Loading type="spin" />
          </Styled.LoadingBox>
        )}
      </Styled.VideoBox>

      <Styled.SeekBox>
        <Styled.Seekbar
          type="range"
          value={currentTime}
          min={0}
          max={duration}
          onInput={useCallback((e: FormEvent<HTMLInputElement>) => {
            if (!videoRef.current) return;

            const currentTime = e.currentTarget.valueAsNumber;

            videoRef.current.currentTime = currentTime;
            setCurrentTime(currentTime);
          }, [])}
        />

        <Styled.SeekbarActive
          style={{
            width: `${playRate || 0}%`,
          }}
        >
          <Styled.SliderThumb />
        </Styled.SeekbarActive>
      </Styled.SeekBox>
    </Styled.Wrapper>
  );
};
