import styled from 'styled-components'

export const LayoutContainer = styled.div`
  max-width: 70rem;
  height: calc(100vh - 10rem);

  margin: 5rem auto;

  padding: 2.5rem 6rem;

  background: ${(props) => props.theme['gray-800']};

  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;

  /* @media (max-width: 768px) {
    margin: 2rem;
  } */
`
