import SingleRowView from "./SingleRowView";

export default function SelectedTeamMembersList({
  employees,
  managed,
  onChange,
}) {
  const listOfEmployees = employees.map((employee) => {
    return (
      <SingleRowView
        key={employee.id}
        item={employee}
        onChange={onChange}
        managed={managed}
      />
    );
  });

  return !employees.length && managed ? (
    <div>Nie wybrano żadnego członka zespołu.</div>
  ) : !employees.length && !managed ? (
    <div>Nie znaleziono żadnych pracowników.</div>
  ) : (
    <div>{listOfEmployees}</div>
  );
}
