import SingleRowView from "./SingleRowView";

export default function ManagedCompaniesList({ companies, managed, onChange }) {
  const listOfCompanies = companies.map((company) => {
    return (
      <SingleRowView
        key={company.id}
        item={company}
        onChange={onChange}
        managed={managed}
      />
    );
  });

  return !companies.length && managed ? (
    <div>Nie wybrano żadnej spółki.</div>
  ) : !companies.length && !managed ? (
    <div>Nie znaleziono spółek.</div>
  ) : (
    <div>{listOfCompanies}</div>
  );
}
