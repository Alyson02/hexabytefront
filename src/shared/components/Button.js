const { default: styled } = require("styled-components");

const Button = styled.button`
  background: rgb(0 126 255);;
  border-radius: 5px;
  height: 46px;
  outline: none;
  border: none;
  width: ${(props) => (props.w ? props.w : "100%")};

  font-family: "Origin tech demo", regular;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  color: #fff;
`;

export default Button;
