import "./styles.css";

export function Card(props: {
  width?: "fixed" | "wide";
  children: React.ReactNode;
}) {
  return (
    <div
      className={`card ${props.width ?? "wide"}`}
    >
      {props.children}
    </div>
  );
}
