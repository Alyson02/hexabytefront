import { useAuth } from "context/AuthProvider/useAuth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "shared/components/Button";
import Input from "shared/components/Input";
import Loader from "shared/components/Loader";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import swal from "sweetalert";

export default function Signup() {
  const [error, setError] = useState(false);
  const [textError, setTextError] = useState("");
  const [loadfing, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: "firstError | all",
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    delayError: undefined,
  });

  const nome = watch("nome", "");
  const email = watch("email", "");
  const password = watch("senha", "");
  const confirmPassword = watch("confirma", "");

  const auth = useAuth();

  function submit(e) {
    if (error) return;

    const body = {
      nome,
      email,
      password,
    };

    console.log(body);
    console.log(error);
    setLoading(true);

    auth
      .signup(body)
      .then((r) => {
        console.log(r);
        swal("", "Cadastro efetuado! Faça Login.", "success");
        navigate("/login");
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
        <Input
          placeholder="Nome"
          {...register("nome", {
            required: "Campo obrigatório",
          })}
          err={errors.erronome}
        />
        <ErrorMessage errors={errors} name="nome" as="p" />
        <Input
          placeholder="E-mail"
          {...register("email", {
            required: "Campo de email obrigatório",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Favor inserir um email válido",
            },
          })}
          err={errors.email}
        />
        <ErrorMessage errors={errors} name="email" as="p" />

        <Input
          placeholder="Senha"
          name="password"
          {...register("senha", {
            required: "Campo obrigatório",
          })}
          type="password"
          err={errors.errosenha}
        />
        <ErrorMessage errors={errors} name="senha" as="p" />

        <Input
          {...register("confirma", {
            required: "Campo obrigatório",
            validate: (abc = confirmPassword) => {
              if (watch("senha") != abc) {
                return "Senhas não coincidem";
              }
            },
          })}
          placeholder="Confirme a senha"
          type="password"
          err={errors.erroconfirma}
        />
        <ErrorMessage errors={errors} name="confirma" as="p" />

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
  color: rgb(0 126 255);
`;
