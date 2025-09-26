export function Navbar(props: { userName: string }) {
  return (
    <nav className="navbar">
      <p>Personal Profile Dashboard</p>
      <p>{props.userName}</p>
    </nav>
  );
}
