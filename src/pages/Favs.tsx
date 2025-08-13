import { Nav } from "../components/Nav";
import { Favs } from "../components/Favs.jsx";

export function Page_Favs ({ events }) {
  return (
    <div>
      <Nav />
      <Favs events={events} />
    </div>
  );
};