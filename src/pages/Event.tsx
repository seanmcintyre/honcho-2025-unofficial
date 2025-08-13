import { Nav } from "../components/Nav";
import { Details } from "../components/Details";

export function Page_Events ({events}) {
  return (
    <div>
      <Nav />
      <Details events={events} />
    </div>
  );
};