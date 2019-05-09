import styled from 'styled-components'

export default styled.div`
  width: 300px;
  padding: 20px;

  background: rgba(0, 0, 0, 0.02);
  border-radius: 3px;
  box-shadow: 0 1.5rem 4rem rgba(${props => props.theme.primary}, 0.15);

  font-size: 15px;
  line-height: 1.5;
  font-weight: 600;
  background-color: white;
  z-index: 1000;
  button {
    width: 100%;
  }
`
