import { useAuth } from "context/AuthProvider/useAuth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "shared/components/Button";
import Input from "shared/components/Input";
import Loader from "shared/components/Loader";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";



export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [textError, setTextError] = useState("");
  const [loadfing, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit, watch } =
    useForm(
      {
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {},
        resolver: undefined,
        context: undefined,
        criteriaMode: "firstError | all",
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false,
        delayError: undefined
      });

  const auth = useAuth();

  function submit(e) {

    if (error) return;

    const body = {
      name,
      password,
      email,
    };

    setLoading(true);

    auth
      .signup(body)
      .then(() => {
        navigate("/");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  useEffect(() => {
    if (auth.user !== null) navigate("/");
  }, [auth.user]);

  return (
    <Container>
      <Loader loading={loadfing} />
      <TextLogo>Hexabyte</TextLogo>
      <Form onSubmit={handleSubmit(submit)}>
        <Input onChange={(e) => setName(e.target.value)} placeholder="Nome" 
        {...register("Erro nome", {
          required: "Campo obrigatório"
        })}/>
         <ErrorMessage errors={errors} name="Erro nome" as="p" />
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
          onChange={(e) => setPassword(e.target.value) }
          placeholder="Senha"
          name= "password"
          {...register("Erro senha", {
            required: "Campo obrigatório"
          })}
          type="password"
          
        />
                <ErrorMessage errors={errors} name="Erro senha" as="p" />

        <Input
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          
          }}
          {...register("Erro confirma", {
            required: "Campo obrigatório",
            validate: (abc = confirmPassword) => {
              console.log(watch("Erro senha"))
              if (watch("Erro senha") != abc) {
                return "Senhas não coincidem";
              }}
          })}
          placeholder="Confirme a senha"
          type="password"
        />
        <ErrorMessage errors={errors} name="Erro confirma" as="p" />

        <Button>Cadastrar</Button>

      </Form>
      <CustomLink to={"/"}>Já tem uma conta? Entre agora!</CustomLink>
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
  p {
    color: red;
  }
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
`;

const CustomLink = styled(Link)`
  color: white;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
`;

