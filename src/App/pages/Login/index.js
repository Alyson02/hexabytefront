import { useAuth } from "context/AuthProvider/useAuth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "shared/components/Button";
import Input from "shared/components/Input";
import Loader from "shared/components/Loader";
import styled from "styled-components";
import {useForm} from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message";
import swal from "sweetalert"


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true)
  const { register, formState: { errors }, handleSubmit } = 
  useForm(
  {mode: 'onSubmit',
  reValidateMode: 'onChange',
  defaultValues: {},
  resolver: undefined,
  context: undefined,
  criteriaMode: "firstError | all",
  shouldFocusError: true,
  shouldUnregister: false,
  shouldUseNativeValidation: false,
  delayError: undefined});
  const auth = useAuth();

  function onFinish(e) {
    setLoading(true);

    auth
      .authenticate(email, password)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        if(err){
        swal("Ops", "Usuário ou senha inválidos!", "error");
        setLoading(false);
        }
      });
  }

  useEffect(() => {
    if (auth.user !== null) navigate("/");
  }, [auth.user]);

  return (
    <Container>
      <Loader loading={loading} />
      <TextLogo>Hexabyte</TextLogo>
      <Form onSubmit={handleSubmit(onFinish)}>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          {...register("email", {
            required: 'Campo de email obrigatório',
            pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Favor inserir um email válido',
            },
          })}
          
                
        />
              <ErrorMessage errors={errors} name="email" as="p" />



        <Input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          type="password"
          {...register("Erro senha", {
            required: "Campo obrigatório"
          })}
        />
        <ErrorMessage errors={errors} name="Erro senha" as="p" />
      
        
        <Button>Entrar</Button>
       
      </Form>
      <CustomLink to={"/cadastro"}>Não tem conta? Cadastre-se!</CustomLink>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding: 0 24px;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const TextLogo = styled.h1`
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 50px;
  color: #fff;
  font-family: "Origin tech demo", regular;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 13px;
  width: 100%;
  p {
    color: red;
  }
`;

const CustomLink = styled(Link)`
  color: white;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
`;
