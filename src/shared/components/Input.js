import styled from "styled-components";

const Input = styled.input`
  background: #ffffff;
  border-radius: 5px;
  border: none;
  outline: none;
  height: 58px;
  padding-left: 15px;
  width: ${(props) => (props.w ? props.w : "100%")};

  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  font-family: "Raleway";
  color: #000000;

  ::placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    font-family: "Raleway";
    color: #000000;
  }
`;
export default Input;
