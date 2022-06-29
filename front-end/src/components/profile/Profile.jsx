import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useMyEmployeeInfo from "../../hooks/useMyEmployeeInfo";
import {
  HeaderContainer,
  Header,
  PageContainer,
  ProfileViewContainer,
  Container,
} from "../../styled";
import { SectionContainer } from "../../styled/containers";
import { Button } from "../buttons/Button";
import InfoList from "../infoList";
import Spinner from "../loader";
import { getRoleString } from "../utils/mappers/roleEnumToString";

export default function Profile() {
  const [infoList, setInfoList] = useState([]);

  const {
    isLoading: isLoadingMyEmployeeInfo,
    error: errorMyEmployeeInfo,
    data: myEmployeeInfo,
  } = useMyEmployeeInfo();

  useEffect(() => {
    if (!!myEmployeeInfo) {
      setInfoList([
        { label: "Imię i nazwisko", value: myEmployeeInfo.name },
        { label: "Adres email", value: myEmployeeInfo.email },
        { label: "Zespół", value: myEmployeeInfo.teamName },
        { label: "Rola", value: getRoleString(myEmployeeInfo.role) },
      ]);
    }
  }, [myEmployeeInfo]);

  return (
    <PageContainer>
      <ProfileViewContainer>
        <SectionContainer>
          <HeaderContainer>
            <Header>Profil</Header>
            <Link to="/profil/zmiana-hasla">
              <Button>Zmiana hasła</Button>
            </Link>
          </HeaderContainer>
        </SectionContainer>
        <SectionContainer>
          <Container>
            {!!errorMyEmployeeInfo ? (
              <div>Wystąpił błąd podczas ładowania danych.</div>
            ) : isLoadingMyEmployeeInfo ? (
              <Spinner />
            ) : (
              <InfoList elements={infoList} />
            )}
          </Container>
        </SectionContainer>
      </ProfileViewContainer>
    </PageContainer>
  );
}
