import styled from "styled-components";

const BAR_HEIGHT = 4;
const THUMB_SIZE = 16;
const COLOR = "#df4e4e";

const isTouchDisplay =
  typeof window !== "undefined" && typeof window.ontouchend !== "undefined";

export const Wrapper = styled.div`
  height: 100vh;
  height: 100dvh;
  background-color: #000;
`;

export const VideoBox = styled.div`
  position: relative;
`;

export const LoadingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const SeekBox = styled.div`
  position: relative;
  width: 100%;
  height: ${BAR_HEIGHT}px;
`;

export const PlayButtonBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Seekbar = styled.input`
  position: absolute;
  -webkit-appearance: none;
  appearance: none;
  box-sizing: border-box;
  cursor: pointer;
  background: #d4d4d4;
  width: 100%;
  height: ${BAR_HEIGHT}px;
  border-radius: 12px;

  &::before {
    display: ${isTouchDisplay ? "none" : "block"};
    content: "";
    position: absolute;
    top: calc(-30px / 2);
    left: 0;
    width: 100%;
    height: 30px;
  }

  &:focus {
    box-shadow: 0 0 3px rgb(255, 118, 118);
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    cursor: pointer;
    width: ${THUMB_SIZE}px;
    height: ${THUMB_SIZE}px;
    opacity: 0;
  }

  &::-moz-range-thumb {
    width: ${THUMB_SIZE}px;
    height: ${THUMB_SIZE}px;
    opacity: 0;
    border: none;
  }

  &::-moz-focus-outer {
    border: 0;
  }
`;

export const SeekbarActive = styled.p`
  position: absolute;
  cursor: pointer;
  background: ${COLOR};
  height: ${BAR_HEIGHT}px;
  pointer-events: none;
`;

export const SliderThumb = styled.span`
  position: absolute;
  top: -${(THUMB_SIZE - BAR_HEIGHT) / 2}px;
  right: -${THUMB_SIZE / 2}px;
  background: ${COLOR};
  width: ${THUMB_SIZE}px;
  height: ${THUMB_SIZE}px;
  border-radius: 50%;
`;
