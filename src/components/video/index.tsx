import { forwardRef } from "react";
import * as Styled from "./style";

type VideoProps = JSX.IntrinsicElements["video"];

export const Video = forwardRef<HTMLVideoElement, VideoProps>((props, ref) => (
  <Styled.Wrapper>
    <video ref={ref} {...props} />
  </Styled.Wrapper>
));

Video.displayName = "Video";
