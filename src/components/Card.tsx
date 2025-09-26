export function Card(props: {
  width?: "fixed" | "wide";
  centered?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`card ${props.width ?? "wide"} ${props.centered ? "centered" : ""}`}>
      {props.children}
      </div>
  );
}
