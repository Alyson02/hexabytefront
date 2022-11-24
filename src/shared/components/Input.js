import styled from "styled-components";

const Input = styled.input`
  background: rgb(42 42 42);
  border-radius: 5px;
  border: ${(props) => (props.err == undefined ? "" : "solid 2px red")};
  outline: none;
  height: 58px;
  padding-left: 15px;
  width: ${(props) => (props.w ? props.w : "100%")};

  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  font-family: "Raleway";
  color: rgb(119 119 119);
  border: 1px solid #6e6e6e;

  ::placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    font-family: "Raleway";
    color: rgb(119 119 119);
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: rgb(119 119 119);
    -webkit-box-shadow: 0 0 0px 1000px rgb(42 42 42) inset;
    font-size: 23px;
  }
`;
export default Input;
