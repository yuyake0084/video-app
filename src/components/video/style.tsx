import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;

  & > video {
    width: 100%;
    vertical-align: bottom;

    &::-webkit-media-controls {
      display: none !important;
    }
  }
`;
