import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { RiFullscreenLine } from "react-icons/ri";
import { CgMiniPlayer } from "react-icons/cg";
import { Grid, Button, Loading } from "@nextui-org/react";

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

  console.log(["hoge", "fuga"].at(0));

  useEffect(() => {
    videoRef.current?.play().catch((err) => {
      console.log(err);
      setIsAutoPlayBlocked(true);
      setIsLoadingMetadata(false);
    });
  }, []);

  const handleSeek = useCallback((e: FormEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;

    const currentTime = e.currentTarget.valueAsNumber;

    videoRef.current.currentTime = currentTime;
    setCurrentTime(currentTime);
  }, []);

  const onMiniPlayer = () => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    videoElement.requestPictureInPicture();
  };

  const onFullscreen = useCallback(async () => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    const requestFullscreen =
      videoElement.requestFullscreen ||
      videoElement.webkitRequestFullscreen ||
      videoElement.webkitEnterFullscreen;

    if (typeof requestFullscreen === undefined) return;

    try {
      await requestFullscreen.call(videoElement);
    } catch (e) {
      if (e instanceof Error) {
        console.warn(e);
      }
    }
  }, []);

  return (
    <Styled.Wrapper>
      <div>
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
            onLoadedMetadata={(e) => {
              console.log("loadedmetadata", e);
            }}
            onPlaying={useCallback(() => {
              console.log("playing");
              setIsLoadingMetadata(false);
            }, [])}
            onTimeUpdate={(e) => {
              const { currentTime } = e.currentTarget;

              console.log(currentTime);

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

          <Styled.Controller>
            <Button
              auto
              icon={<CgMiniPlayer size={20} />}
              css={{
                background: "#000",
              }}
              onClick={onMiniPlayer}
              onTouchEnd={onMiniPlayer}
            />
            <Button
              auto
              icon={<RiFullscreenLine size={20} />}
              css={{
                background: "#000",
              }}
              onClick={onFullscreen}
              onTouchEnd={onFullscreen}
            />
          </Styled.Controller>
        </Styled.VideoBox>

        <Styled.SeekBox>
          <Styled.Seekbar
            type="range"
            value={currentTime}
            min={0}
            max={duration}
            onInput={handleSeek}
          />

          <Styled.SeekbarActive
            style={{
              width: `${playRate || 0}%`,
            }}
          >
            <Styled.SliderThumb />
          </Styled.SeekbarActive>
        </Styled.SeekBox>
      </div>
    </Styled.Wrapper>
  );
};
