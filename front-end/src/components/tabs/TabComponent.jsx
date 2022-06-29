export default function TabComponent({ index, currentIndex, children }) {
  return <>{index === currentIndex ? children : null}</>;
}
