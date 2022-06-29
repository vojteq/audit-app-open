export const FiltersSection = ({ children, visible }) => {
  return <div>{visible ? children : null}</div>;
};
