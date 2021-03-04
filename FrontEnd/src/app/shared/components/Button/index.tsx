import styled from 'styled-components';

export const Button = styled.button`
  background: #2d6133;
  border-radius: 3px;
  color: #fff;
  height: 32px;
  display: block;
  width: 100%;
  text-align: center;
  cursor: pointer;
  border: none;
  transition: background ease-in-out 250ms;
  &[disabled] {
    opacity: 0.3;
  }
  :hover {
    background: #16361a;
  }
`;
