import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button, Loading } from "@nextui-org/react";

import { Video } from "~/components/video";
import * as Styled from "./style";

export const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(true);
  const [isAutoPlayBlocked, setIsAutoPlayBlocked] = useState(false);
  const duration = videoRef.current?.duration ?? 0;
  const playRate = useMemo(() => {
    return (currentTime / duration) * 100;
  }, [duration, currentTime]);

  useEffect(() => {
    videoRef.current?.play().catch((err) => {
      console.log(err);
      setIsAutoPlayBlocked(true);
      setIsLoadingMetadata(false);
    });
  }, []);

  return (
    <Styled.Wrapper>
      <Styled.VideoBox>
        <Video
          ref={videoRef}
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          muted
          autoPlay
          playsInline
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
            <Loading />
          </Styled.LoadingBox>
        )}
        {isAutoPlayBlocked && (
          <Styled.PlayButtonBox>
            <Button
              onTouchEnd={(e) => {
                e.preventDefault();
                setIsAutoPlayBlocked(false);
                videoRef.current?.play();
              }}
            >
              再生
            </Button>
          </Styled.PlayButtonBox>
        )}
      </Styled.VideoBox>

      <Styled.SeekBox>
        <Styled.Seekbar
          type="range"
          value={currentTime}
          min={0}
          max={duration}
          onInput={useCallback((e: FormEvent<HTMLInputElement>) => {
            console.log(e);
            if (!videoRef.current) return;

            const currentTime = e.currentTarget.valueAsNumber;

            videoRef.current.currentTime = currentTime;
            setCurrentTime(currentTime);
          }, [])}
          onChange={useCallback((e: FormEvent<HTMLInputElement>) => {
            console.log(e);
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
