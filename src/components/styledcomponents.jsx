import styled from "styled-components";
const But = styled.button`
  background-color: white;
  border: none;
  height: 50px;
  color: darkblue;
  font-size: 24px;
  font-weight: 700;
  padding: 5px 20px;
  margin: 5px;
  cursor: pointer;
  :hover {
    background-color: darkblue;
    color: white;
  }
`;
const Box = styled.div`
  width: 40px;
  font-size: 24px;
  font-weight: 700;
  padding: 10px 15px;
  border: 1px solid orangered;
  color: white;
`;
const ButFlx = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  > div {
    display: flex;
    flex-direction: column;
  }
  > div > input {
    width: 200px;
    height: 50px;
    background-color: darkblue;
    color: white;
    border: 1px solid white;
    outline: none;
    border-radius: 10px;
    font-size: 18px;
    line-height: 1.9;
    padding: 5px;
  }
`;
const Main = styled.div`
  width: 1200px;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > textarea {
    background-color: darkblue;
    color: white;
    outline-color: rgb(97, 218, 251);
    border-radius: 10px;
    font-size: 28px;
    line-height: 1.5;
    width: 35%;
    text-align: start;
    top: -7px;
  }
`;
export { Main, ButFlx, Box, But };
