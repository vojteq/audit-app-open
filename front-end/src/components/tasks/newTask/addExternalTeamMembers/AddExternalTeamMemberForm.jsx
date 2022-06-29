import { useForm } from "react-hook-form";
import styled from "styled-components";
import { FormControl } from "../../../../styled/form-control";
import FormInputErrorMessage from "../../../utils/FormInputErrorMessage";

const Container = styled.div``;

export default function AddExternalTeamMemberForm({
  addExternalTeamMemberName,
  externalTeamMembersNames,
}) {
  const {
    register,
    formState: { errors },
    setError,
  } = useForm({
    mode: "all",
  });

  const handleAddTeamMemberName = async (name) => {
    addExternalTeamMemberName(name);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value === "") {
        setError("externalTeamMemberName", {
          type: "isEmpty",
          message: "Pole nie może być puste",
        });
        return;
      }
      if (externalTeamMembersNames.includes(e.target.value)) {
        setError("externalTeamMemberName", {
          type: "alreadyExists",
          message: "Dodano już członka zespołu o podanym imieniu i nazwisku",
        });
      } else {
        handleAddTeamMemberName(e.target.value);
      }
      e.target.value = "";
    }
  };

  return (
    <Container>
      <FormControl
        type="text"
        id="externalTeamMemberNameInput"
        defaultValue=""
        htmlFor="externalTeamMemberName"
        placeholder="Podaj imię i nazwisko członka zespołu"
        onKeyDown={handleKeyDown}
        {...register("externalTeamMemberName", {
          maxLength: 100,
        })}
        error={errors.externalTeamMemberName}
      />
      {errors.externalTeamMemberName?.type === "isEmpty" && (
        <FormInputErrorMessage
          errorMessage={errors.externalTeamMemberName?.message}
        />
      )}
      {errors.externalTeamMemberName?.type === "alreadyExists" && (
        <FormInputErrorMessage
          errorMessage={errors.externalTeamMemberName?.message}
        />
      )}
      {errors.externalTeamMemberName?.type === "maxLength" && (
        <FormInputErrorMessage errorMessage="Imię i nazwisko nie może być dłuższe niż 100 znaków" />
      )}
    </Container>
  );
}
