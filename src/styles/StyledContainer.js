import styled from 'styled-components'

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: linear-gradient(
    to right bottom,
    ${props => props.theme.primaryLight},
    ${props => props.theme.primaryDark}
  );
  background-size: cover;
  background-repeat: no-repeat;
`

export default StyledContainer
