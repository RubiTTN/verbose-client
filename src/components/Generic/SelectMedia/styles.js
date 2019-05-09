import styled from 'styled-components'

export const MediaWrapper = styled.div`
  img {
    width: 300px;
    height: 100px;
    display: block;
    border: 2px solid #ccc;
    float: left;
  }
  button {
    float: left;
    margin-left: 2px;
  }
  :after {
    content: ' ';
    display: table;
    clear: both;
  }
`
