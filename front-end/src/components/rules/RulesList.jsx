import styled from "styled-components";

const rules = [
  "Kierownik kontroli ma wgląd do wszystkich zadań kontrolnych realizowanych przez zespół kontroli i Spółki",
  "Dyrektor ma wgląd do wszystkich zadań",
  "Zespół może zostać usunięty z systemu tylko wtedy, gdy nie jest powiązany z żadnymi pracownikami i zadaniami.",
  "Spółka może zostać usunięta z systemu tylko wtedy, gdy nie jest powiązana z żadnymi zadaniami.",
];

const List = styled.ul`
  margin: 0;
`;
const ListItem = styled.li`
  font-size: 1.2em;
  padding: 0.5em 0;
`;

export default function RulesList() {
  return (
    <div>
      <List>
        {rules.map((rule) => (
          <ListItem>{rule}</ListItem>
        ))}
      </List>
    </div>
  );
}
