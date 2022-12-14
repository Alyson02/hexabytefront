import { useAuth } from "context/AuthProvider/useAuth";
import { useContext } from "react";
import { siteContext } from "context/HomeContext/siteContext";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Api } from "services/api";
import useWindowDimensions from "shared/components/getWindowDimensions";
import Loader from "shared/components/Loader";
import styled from "styled-components";
import Header from "shared/components/Header/Header.js";

export default function Home() {
  const auth = useAuth();
  const {
    categoria,
    setCategoria,
    page,
    setPage,
    search,
    setSearch,
    id,
    setId,
  } = useContext(siteContext);
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions();

  const { itensCart, setItensCart } = useOutletContext();

  useEffect(() => {
    setLoading(true);
    if (categoria && categoria != "Home") {
      Api.get(`/?page=${page}&categoria=${categoria}`).then((r) => {
        setProdutos(r.data);
        setLoading(false);
      });
    }
    if (categoria && categoria != "Home" && search)
      console.log(`/?page=${page}&categoria=${categoria}&search=${search}`);
    Api.get(`/?page=${page}&categoria=${categoria}&search=${search}`).then(
      (r) => {
        setProdutos(r.data);
        setLoading(false);
      }
    );
    if (categoria == "Home") {
      Api.get(`/?page=1`).then((r) => {
        setLoading(false);
        setProdutos(r.data);
        setPage(1);
        setCategoria("");
      });
    }
    if (!categoria && !search) {
      Api.get(`/?page=${page}`)
        .then((r) => {
          setProdutos(r.data);
          setLoading(false);
        })
        .catch((err) => console.log("Erro"));
    }
  }, [page, categoria, search]);

  function createOrAddCart(id) {
    setItensCart(itensCart + 1);
    Api.post("/cart")
      .then((x) => console.log(x))
      .then(() => {
        Api.post("/cart/addproduct", { products: [id] });
      });
  }

  return (
    <>
      <Header />
      <Loader loading={loading} />
      <FlexContainer>
        {produtos.length > 0
          ? produtos.map((p) => (
              <FlexItem w={width} key={p._id}>
                <ImagemProduto src={p.imagem} />
                <TituloProduto>{p.titulo}</TituloProduto>
                <PrecoProduto>R$ {p.valor}</PrecoProduto>
                <BotaoProduto onClick={() => createOrAddCart(p._id)}>
                  COMPRAR
                </BotaoProduto>
              </FlexItem>
            ))
          : "N??o h?? mais produtos a serem mostrados"}
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
  grid-gap: 10px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  /* Screen larger than 900px? 3 columns */
  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1500px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const FlexItem = styled.div``;

const ImagemProduto = styled.img`
  min-height: 223px;
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
