import { Nav } from "../components/Nav";
import { TimeTable } from "../components/TimeTable";

export function Page_Schedule({ events }) {
  return (
    <div>
      <Nav />
      <TimeTable events={events} />
    </div>
  );
}
