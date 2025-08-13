export function Now({ events }) {
  // Simple debug time setter - change these values to test different times
  const DEBUG_DAY = "Sunday"; // Change to: "Thursday", "Friday", "Saturday"
  const DEBUG_HOUR = 14; // Change to: 0-23 (24-hour format)
  const DEBUG_MINUTE = 0; // Change to: 0-59

  const currentTime = {
    day: DEBUG_DAY,
    hour: DEBUG_HOUR,
    minute: DEBUG_MINUTE,
  };

  const parseTime = (timeStr) => {
    const [time, period] = timeStr.split(/([ap]m)/i);
    const [hours, minutes = 0] = time.split(":").map(Number);
    let hour24 = hours;
    if (period.toLowerCase() === "pm" && hours !== 12) hour24 += 12;
    if (period.toLowerCase() === "am" && hours === 12) hour24 = 0;
    return { hour: hour24, minute: minutes };
  };

  const isEventHappeningNow = (event) => {
    if (event.day_program !== currentTime.day) return false;

    const start = parseTime(event.time_start);
    const end = parseTime(event.time_end);
    const now = currentTime;

    // Handle overnight events
    if (end.hour < start.hour) end.hour += 24;
    if (now.hour < start.hour) now.hour += 24;

    const nowMinutes = now.hour * 60 + now.minute;
    const startMinutes = start.hour * 60 + start.minute;
    const endMinutes = end.hour * 60 + end.minute;

    return nowMinutes >= startMinutes && nowMinutes < endMinutes;
  };

  const currentEvents = events.filter(isEventHappeningNow);

  // Get actual current time for display
  const now = new Date();
  const actualDay = now.toLocaleDateString("en-US", { weekday: "long" });
  const actualTime = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="timetable-container">
      <div className="debug-time">
        Debug: {DEBUG_DAY} {DEBUG_HOUR}:
        {DEBUG_MINUTE.toString().padStart(2, "0")}
      </div>

      <h2 className="timetable-title">{actualDay}</h2>
      <h3 className="timetable-subtitle">{actualTime}</h3>

      <div>
        {currentEvents.map((event) => (
          <div key={event.id} className={`event-card event-${event.type}`}>
            <div className="event-title">{event.title}</div>
            <div className="event-time">
              {event.time_start} - {event.time_end}
            </div>
            <div className="event-stage">{event.stage}</div>
          </div>
        ))}
        {currentEvents.length === 0 && <div>No events happening right now</div>}
      </div>
    </div>
  );
}
