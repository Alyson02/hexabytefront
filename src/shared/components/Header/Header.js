import { useAuth } from "context/AuthProvider/useAuth";
import styled from "styled-components";
import { FaBars, FaSearch } from "react-icons/fa";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Input from "../Input";
import useWindowDimensions from "../getWindowDimensions";
import { useContext } from "react";
import { siteContext } from "context/HomeContext/siteContext";

export default function Header() {
  const auth = useAuth();
  const [sideBar, setSidebar] = useState(false);
  const showSiderbar = () => setSidebar(!sideBar);
  const { width } = useWindowDimensions();
  const { categoria, search, setSearch } = useContext(siteContext)

  console.log(categoria)
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
          <TextLogo>Hexabyte</TextLogo>
        </HeaderLeft>
        {width >= 998 && (
          <Search>
            <FaSearch size={"2em"}  />
            <Input 
              placeholder = {categoria? `Pesquisar em ${categoria}`: "Pesquisar"} 
              value={search}
              onChange={ e => setSearch(e.target.value)}
              />
          </Search>
        )}
        {auth.user ? <p>{auth.user.nome}</p> : <p>Login</p>}
      </HeaderWrapper>
      {width < 998 && (
        <SearchMobile>
          <InputSearchMobile fixPlaceHolder={sideBar}   />
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
  width: 600px;
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
  background: rgb(255 255 255);

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
