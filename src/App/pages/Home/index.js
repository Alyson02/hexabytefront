import { useAuth } from "context/AuthProvider/useAuth";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "services/api";
import H1 from "shared/components/H1";
import Loader from "shared/components/Loader";
import styled from "styled-components";
import {
  Button,
  ButtonWrapper,
  Container,
  Header,
  HistoryWrapper,
  TextNoRegistersWrapper,
  P,
  TextNoRegisters,
  History,
  MovementWrapper,
  Movement,
  DateAndDescription,
  BalanceWrapper,
  Balance,
  Total,
} from "./style";

export default function Home() {
  const auth = useAuth();
  const [movements, setMovements] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const res = await Api.get("history");
      setMovements(res.data);
      setLoading(false);
    };

    loadData();
  }, []);

  function getTotal() {
    let total = 0;
    movements.forEach((m) => {
      if (m.type === "deposit") {
        total += Number(m.value);
      } else {
        total -= Number(m.value);
      }
    });
    return total;
  }

  function logout() {
    const really = window.confirm("Deseja realmente sair?");
    if (really) {
      auth.logout();
      navigate("/login");
    }
  }

  async function deleteMovement(m) {
    try {
      const really = window.confirm(
        "Deseja realmente deletar essa movimentação?"
      );
      if (really) {
        const arrayFiltred = movements.filter((x) => m._id != x._id);
        setMovements(arrayFiltred);
        const res = await Api.delete(`deleteMovement/${m._id}`);
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Header>
        <H1>Olá, {auth.user?.name}</H1>
        <svg
          onClick={logout}
          width="23"
          height="24"
          viewBox="0 0 23 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.21053 24C0.889475 24 0.581573 23.8736 0.354555 23.6485C0.127537 23.4235 0 23.1183 0 22.8V1.2C0 0.88174 0.127537 0.576515 0.354555 0.351472C0.581573 0.126428 0.889475 0 1.21053 0H18.1579C18.4789 0 18.7868 0.126428 19.0139 0.351472C19.2409 0.576515 19.3684 0.88174 19.3684 1.2V4.8H16.9474V2.4H2.42105V21.6H16.9474V19.2H19.3684V22.8C19.3684 23.1183 19.2409 23.4235 19.0139 23.6485C18.7868 23.8736 18.4789 24 18.1579 24H1.21053ZM16.9474 16.8V13.2H8.47368V10.8H16.9474V7.2L23 12L16.9474 16.8Z"
            fill="white"
          />
        </svg>
      </Header>
      <HistoryWrapper>
        {movements === null ? (
          <Loader loading={loading} />
        ) : movements.length > 0 ? (
          <>
            <History>
              {movements.map((m) => {
                return (
                  <MovementWrapper key={m._id}>
                    <DateAndDescription>
                      <Movement textColor="#C6C6C6">
                        {dayjs(m.date).format("DD/MM")}
                      </Movement>
                      <Movement
                        textColor="#000"
                        onClick={() =>
                          navigate("/addMovement", {
                            state: {
                              type: m.type === "deposit" ? "entrada" : "saida",
                              method: "put",
                              id: m._id,
                            },
                          })
                        }
                      >
                        {m.description
                          .substring(0, 12)
                          .concat("", m.description.length > 12 ? "..." : "")}
                      </Movement>
                    </DateAndDescription>
                    <span style={{ paddingLeft: 10, paddingRight: 20 }}>
                      <Movement
                        textColor={m.type === "deposit" ? "#03AC00" : "#C70000"}
                      >
                        {Number(m.value).toFixed(2).replace(".", ",")}
                      </Movement>
                    </span>
                    <span
                      onClick={() => deleteMovement(m)}
                      style={{
                        paddingLeft: 10,
                        fontFamily: "Raleway",
                        position: "absolute",
                        right: 0,
                        color: "#C6C6C6",
                      }}
                    >
                      X
                    </span>
                  </MovementWrapper>
                );
              })}
            </History>
            <BalanceWrapper>
              <Balance>SALDO</Balance>
              <Total value={getTotal()}>{getTotal().toFixed(2)}</Total>
            </BalanceWrapper>
          </>
        ) : (
          <TextNoRegistersWrapper>
            <TextNoRegisters>
              Não há registros de entrada ou saída
            </TextNoRegisters>
          </TextNoRegistersWrapper>
        )}
      </HistoryWrapper>
      <ButtonWrapper>
        <Button
          onClick={() =>
            navigate("/addMovement", {
              state: { type: "entrada", method: "post" },
            })
          }
        >
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
            <path
              d="M16.9922 11.7188H13.2812V8.00781C13.2812 7.90039 13.1934 7.8125 13.0859 7.8125H11.9141C11.8066 7.8125 11.7188 7.90039 11.7188 8.00781V11.7188H8.00781C7.90039 11.7188 7.8125 11.8066 7.8125 11.9141V13.0859C7.8125 13.1934 7.90039 13.2812 8.00781 13.2812H11.7188V16.9922C11.7188 17.0996 11.8066 17.1875 11.9141 17.1875H13.0859C13.1934 17.1875 13.2812 17.0996 13.2812 16.9922V13.2812H16.9922C17.0996 13.2812 17.1875 13.1934 17.1875 13.0859V11.9141C17.1875 11.8066 17.0996 11.7188 16.9922 11.7188Z"
              fill="white"
            />
            <path
              d="M12.5 1.5625C6.45996 1.5625 1.5625 6.45996 1.5625 12.5C1.5625 18.54 6.45996 23.4375 12.5 23.4375C18.54 23.4375 23.4375 18.54 23.4375 12.5C23.4375 6.45996 18.54 1.5625 12.5 1.5625ZM12.5 21.582C7.48535 21.582 3.41797 17.5146 3.41797 12.5C3.41797 7.48535 7.48535 3.41797 12.5 3.41797C17.5146 3.41797 21.582 7.48535 21.582 12.5C21.582 17.5146 17.5146 21.582 12.5 21.582Z"
              fill="white"
            />
          </svg>
          <P>
            Nova
            <br /> entrada
          </P>
        </Button>
        <Button
          onClick={() =>
            navigate("/addMovement", {
              state: { type: "saida", method: "post" },
            })
          }
        >
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
            <path
              d="M16.9922 11.7188H8.00781C7.90039 11.7188 7.8125 11.8066 7.8125 11.9141V13.0859C7.8125 13.1934 7.90039 13.2812 8.00781 13.2812H16.9922C17.0996 13.2812 17.1875 13.1934 17.1875 13.0859V11.9141C17.1875 11.8066 17.0996 11.7188 16.9922 11.7188Z"
              fill="white"
            />
            <path
              d="M12.5 1.5625C6.45996 1.5625 1.5625 6.45996 1.5625 12.5C1.5625 18.54 6.45996 23.4375 12.5 23.4375C18.54 23.4375 23.4375 18.54 23.4375 12.5C23.4375 6.45996 18.54 1.5625 12.5 1.5625ZM12.5 21.582C7.48535 21.582 3.41797 17.5146 3.41797 12.5C3.41797 7.48535 7.48535 3.41797 12.5 3.41797C17.5146 3.41797 21.582 7.48535 21.582 12.5C21.582 17.5146 17.5146 21.582 12.5 21.582Z"
              fill="white"
            />
          </svg>
          <P>
            Nova
            <br /> saida
          </P>
        </Button>
      </ButtonWrapper>
    </Container>
  );
}
