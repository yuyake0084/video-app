import * as Styled from "./style";

export const EpisodeList = () => {
  return (
    <Styled.List>
      {[...new Array(12)].map((_, idx) => (
        <li key={Math.random()}>エピソード{idx + 1}</li>
      ))}
    </Styled.List>
  );
};
