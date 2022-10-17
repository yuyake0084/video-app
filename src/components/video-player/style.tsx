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

export const VideoBox = styled.div``;

export const SeekBox = styled.div`
  width: calc(100% - 24px);
  height: ${BAR_HEIGHT}px;
  padding: 12px;
  box-sizing: border-box;
`;

export const Seekbar = styled.input`
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  position: absolute;
  box-sizing: border-box;
  cursor: pointer;
  background: #d4d4d4;
  width: 100%;
  height: ${BAR_HEIGHT}px;
  box-sizing: border-box;

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
    appearance: none;
    width: 0;
    height: 0;
  }
  &::-moz-range-thumb {
    width: 0;
    height: 0;
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
