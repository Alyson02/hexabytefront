const { default: styled } = require("styled-components");

const Button = styled.button`
  background: #FFFFFF;
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
  color: #000000;
`;

export default Button;
