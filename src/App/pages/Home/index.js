import { useAuth } from "context/AuthProvider/useAuth";
import { useContext } from "react";
import { siteContext } from "context/HomeContext/siteContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "services/api";
import useWindowDimensions from "shared/components/getWindowDimensions";
import Loader from "shared/components/Loader";
import styled from "styled-components";
import Header from "shared/components/Header/Header.js";

export default function Home() {
  const auth = useAuth();
  const { categoria, setCategoria , page, setPage, search, setSearch, id, setId} = useContext(siteContext)
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    setLoading(true);
    if(categoria && categoria != "Home"){
      Api.get(`/?page=${page}&categoria=${categoria}`).then((r) => {
        console.log(r.data.length)        
        setProdutos(r.data);
        console.log(produtos)
        setLoading(false);
      });
    }
    if(categoria && categoria !="Home" && search)
    Api.get(`/?page=${page}&categoria=${categoria}&search=${search}`).then((r) => {
      console.log(r.data.length)
      setProdutos(r.data);
      console.log(produtos)
      setLoading(false);
      
    });
    if(categoria == "Home"){
      Api.get(`/?page=1`).then((r) => {
        console.log(r.data.length)
        setLoading(false);
        setProdutos(r.data);
        setPage(1)
        setCategoria("")
        console.log(produtos)
        
    })
  }
    if(!categoria && !search){
      Api.get(`/?page=${page}`).then((r) => {
        setProdutos(r.data)
        setLoading(false);
        console.log(r.data.length)
        
    }).catch((err) => console.log(err))}
}, [page, categoria]);

  return (
    <>
      <Header/>
      <Loader loading={loading} />
      <FlexContainer>
        {produtos.length>0?produtos.map((p) => (
          <FlexItem w={width} key={p._id}>
            <ImagemProduto src={p.imagem} />
            <TituloProduto>{p.titulo}</TituloProduto>
            <PrecoProduto>R$ {p.valor}</PrecoProduto>
            <BotaoProduto>COMPRAR</BotaoProduto>
          </FlexItem>
        )): "Não há mais produtos a serem mostrados"}
      </FlexContainer>
      {produtos.length > 0 && (
        <BotaoProximaPagina
          w={width > 900 && "300px"}
          onClick={() => setPage(page + 1)}
        >
          Carregar mais
        </BotaoProximaPagina>
      )}
    </>
  );
}

const FlexContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px;
`;

const FlexItem = styled.div`
  flex-grow: 1;
`;

const ImagemProduto = styled.img`
  max-height: 316px;
  width: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

const TituloProduto = styled.h1`
  margin-top: 12px;
  font-size: 20px;
  font-family: "Raleway";
  color: rgb(254, 248, 236);
`;

const PrecoProduto = styled.p`
  margin-top: 8px;
  font-size: 18px;
  font-family: "Tahoma";
  color: green;
`;

const BotaoProduto = styled.button`
  margin-top: 12px;
  width: 100%;
  outline: none;
  border: none;
  background-color: rgb(26, 113, 45);
  height: 60px;
  border-radius: 4px;
  cursor: pointer;
  font-family: "Raleway";
  font-size: 20px;
  font-weight: bold;
`;

const BotaoProximaPagina = styled(BotaoProduto)`
  background-color: rgb(0 126 255);
  width: ${(props) => (props.w ? props.w : "")};
  display: block;
  margin: 0 auto;
  margin-top: 50px;
`;