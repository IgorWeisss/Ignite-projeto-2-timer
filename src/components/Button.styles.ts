import styled from "styled-components";

export const ButtonContainer = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  margin-right: 1rem;
  background-color: ${props => props.theme["green-500"]}
`