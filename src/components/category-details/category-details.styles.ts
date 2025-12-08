import styled from 'styled-components'

export const Container = styled.div`
  padding: 0px 40px 20px 40px;
`

export const CategoryTitle = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  gap: 10px;

  p {
    font-size: 2rem;
    font-weight: 500;
    margin: 0;
  }
`

export const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: start;
  margin-top: 5px;
  grid-row-gap: 20px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`

export const IconContainer = styled.div`
  display: flex;

  &:hover {
    cursor: pointer;
  }
`