import { useAuth } from "context/AuthProvider/useAuth";
import styled from "styled-components";
import { FaBars, FaSearch } from "react-icons/fa";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Input from "../Input";
import useWindowDimensions from "../getWindowDimensions";
import { BsCart } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Header({ itensCart }) {
  const auth = useAuth();
  const [sideBar, setSidebar] = useState(false);
  const showSiderbar = () => setSidebar(!sideBar);
  const { width } = useWindowDimensions();
  const navigate = useNavigate();

  return (
    <Container>
      <HeaderWrapper>
        <HeaderLeft>
          <FaBars color="white" onClick={showSiderbar} />
          {sideBar && (
            <Test>
              <Sidebar active={setSidebar} />
            </Test>
          )}
          <TextLogo onClick={() => navigate("/")}>Hexabyte</TextLogo>
        </HeaderLeft>
        {width >= 998 && (
          <Search>
            <FaSearch size={"1.2em"} />
            <InputSearch />
          </Search>
        )}
        <HeaderRight>
          {auth.user ? <p>{auth.user.nome}</p> : <p>Login</p>}
          <BsCart onClick={() => navigate("/cart")} size={"1.5em"} />
          <span style={{ fontFamily: "Arial" }}>{itensCart}</span>
        </HeaderRight>
      </HeaderWrapper>
      {width < 998 && (
        <SearchMobile>
          <InputSearchMobile fixPlaceHolder={sideBar} placeholder="Pesquisar" />
        </SearchMobile>
      )}
    </Container>
  );
}

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: fixed;
  padding: 10px 20px;
  align-items: center;
  background-color: rgb(42 42 42);
  top: 0;
  left: 0;
  z-index: 1000;
`;

const TextLogo = styled.h1`
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 50px;
  color: #fff;
  font-family: "Origin tech demo", regular;
`;

const HeaderLeft = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Search = styled.form`
  width: 500px;
  position: relative;

  > svg {
    position: absolute;
    right: 20px;
    height: 100%;
  }
`;

const SearchMobile = styled.form`
  width: 100%;
  height: 50px;
  border-top: 2px rgb(0 126 255) solid;
`;

const InputSearchMobile = styled.input`
  outline: none;
  border: none;
  padding: 20px 10px;
  width: 100%;
  background: rgb(42 42 42);

  ::placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    font-family: "Raleway";
    color: rgb(119 119 119);
    position: relative;
    z-index: ${(props) => (props.fixPlaceHolder ? -1 : 1)};
  }

  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  font-family: "Raleway";
  color: rgb(119 119 119);

  :focus {
    color: rgb(0 126 255);

    ::placeholder {
      color: rgb(0 126 255);
    }
  }
`;

const Container = styled.div`
  padding-top: 70px;
`;

const Test = styled.div`
  position: relative;
  background-color: red;
`;

const A = styled.a`
  padding-left: 8px;
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
`;

const InputSearch = styled(Input)`
  height: 40px;
`;
