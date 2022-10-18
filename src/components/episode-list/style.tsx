import styled from "styled-components";

export const List = styled.ul`
  padding: 20px;

  & > li {
    margin-top: 12px;
    padding: 12px;
    color: #fff;
    background-color: #66dccc;
    border-radius: 12px;

    &:first-of-type {
      margin-top: 0;
    }
  }
`;
