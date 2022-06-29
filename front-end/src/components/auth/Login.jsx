import Form from "react-bootstrap/Form";
import { Button } from "../buttons/Button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import FormInputErrorMessage from "../utils/FormInputErrorMessage";
import {
  ContainerCenter,
  PageContainer,
  LoginViewContainer,
} from "../../styled";
import { SectionContainer } from "../../styled/containers";
import { useAuth } from "../auth/useAuth";
import { useMutation } from "react-query";
import Spinner from "../loader";
import CustomSnackbar from "../snackbar/CustomSnackbar";
import useLocalStorage from "../utils/useLocalStorage";

export default function Login() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [loggedIn] = useLocalStorage("loggedIn");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "all" });

  const auth = useAuth();
  const history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const mutationObtainToken = useMutation(
    (formData) => auth.login(formData.email, formData.password),
    { onError: () => setAlertOpen(true) }
  );

  const handleLogin = async (formData) => {
    mutationObtainToken.mutate(formData);
  };

  if (auth.user) {
    history.replace(from);
  }

  if (mutationObtainToken.isLoading || loggedIn) {
    return (
      <PageContainer>
        <ContainerCenter>
          <Spinner />
        </ContainerCenter>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <LoginViewContainer>
        <SectionContainer>
          {mutationObtainToken.isError && (
            <CustomSnackbar
              isOpen={alertOpen}
              setIsOpen={setAlertOpen}
              severity="error"
              message="Błędny login lub hasło."
            />
          )}
          <ContainerCenter>
            <h1 className="my-4">Zaloguj się</h1>
          </ContainerCenter>
          <Form
            onSubmit={handleSubmit(handleLogin)}
            style={{ paddingBottom: "2em" }}
          >
            <Form.Group>
              <Form.Label htmlFor="email">Adres email</Form.Label>
              <Form.Control
                type="email"
                id="emailInput"
                placeholder="Podaj adres email"
                {...register("email", { required: true, maxLength: 100 })}
              />
              {errors.email?.type === "maxLength" && (
                <FormInputErrorMessage errorMessage="Adres email nie może być dłuższy niż 100 znaków" />
              )}
              {errors.email?.type === "required" && (
                <FormInputErrorMessage errorMessage="Adres email jest wymagany" />
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="password">Hasło</Form.Label>
              <Form.Control
                type="password"
                id="passwordInput"
                placeholder="Podaj hasło"
                {...register("password", { required: true, maxLength: 100 })}
              />
              {errors.password?.type === "maxLength" && (
                <FormInputErrorMessage errorMessage="Hasło nie może być dłuższe niż 100 znaków" />
              )}
              {errors.password?.type === "required" && (
                <FormInputErrorMessage errorMessage="Hasło jest wymagane" />
              )}
            </Form.Group>

            <Button width={100} id="logInButton">
              Zaloguj
            </Button>
          </Form>
        </SectionContainer>
      </LoginViewContainer>
    </PageContainer>
  );
}
