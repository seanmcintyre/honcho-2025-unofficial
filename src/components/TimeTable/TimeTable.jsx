export function TimeTable({ events }) {
  const timeSlots = [
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
    "12:00 AM",
    "1:00 AM",
    "2:00 AM",
    "3:00 AM",
    "4:00 AM",
    "5:00 AM",
    "6:00 AM",
  ];

  const stages = [
    "Hemlock Hole",
    "Circle of Whispers",
    "The Grove",
    "Critter's Lounge",
  ];

  // Helper functions
  const parseTime = (timeStr) => {
    const [time, period] = timeStr.split(/([ap]m)/i);
    const [hours, minutes = 0] = time.split(":").map(Number);
    let hour24 = hours;
    if (period.toLowerCase() === "pm" && hours !== 12) hour24 += 12;
    if (period.toLowerCase() === "am" && hours === 12) hour24 = 0;
    return hour24 + minutes / 60;
  };

  const calculateDuration = (event) => {
    const startHour = parseTime(event.time_start);
    let endHour = parseTime(event.time_end);
    if (endHour < startHour) endHour += 24; // Handle overnight events
    return endHour - startHour;
  };

  const renderEventCard = (event, isHalfHour = false) => {
    const gridRowSpan = calculateDuration(event);
    return (
      <div
        key={event.id}
        className={`event-card event-${event.type}`}
        style={{
          height:
            isHalfHour || gridRowSpan > 1 ? `${gridRowSpan * 100}%` : "auto",
          position: isHalfHour || gridRowSpan > 1 ? "absolute" : "static",
          width: isHalfHour || gridRowSpan > 1 ? "100%" : "auto",
          top: isHalfHour ? "50%" : gridRowSpan > 1 ? 0 : "auto",
          left: isHalfHour || gridRowSpan > 1 ? 0 : "auto",
          zIndex: isHalfHour || gridRowSpan > 1 ? 10 : "auto",
        }}
      >
        {event.title}
      </div>
    );
  };

  const renderEventsForSlot = (day, stage, timeSlot) => {
    const onHourEvents = events.filter(
      (event) =>
        event.day_program === day &&
        event.stage === stage &&
        event.time_start === timeSlot.toLowerCase().replace(" ", "")
    );

    const halfHourEvents = events.filter(
      (event) =>
        event.day_program === day &&
        event.stage === stage &&
        event.time_start ===
          timeSlot.toLowerCase().replace(" ", "").replace(":00", ":30")
    );

    return (
      <>
        {onHourEvents.map((event) => renderEventCard(event, false))}
        {halfHourEvents.map((event) => renderEventCard(event, true))}
      </>
    );
  };

  const renderDaySchedule = (day) => (
    <div key={day}>
      <h2 className="timetable-title">{day.toUpperCase()}</h2>
      <div className="schedule-grid">
        <div className="time-header">TIME</div>
        {stages.map((stage) => (
          <div key={stage} className="stage-header">
            {stage.toUpperCase()}
          </div>
        ))}

        {timeSlots.map((timeSlot, index) => (
          <>
            <div key={`time-${index}`} className="time-slot">
              {timeSlot.replace(":00", "")}
            </div>
            {stages.map((stage) => (
              <div key={`${stage}-${index}`} className="time-cell">
                {renderEventsForSlot(day, stage, timeSlot)}
              </div>
            ))}
          </>
        ))}
      </div>
    </div>
  );

  return (
    <div className="timetable-container">
      {renderDaySchedule("Thursday")}
      {renderDaySchedule("Friday")}
      {renderDaySchedule("Saturday")}
      {renderDaySchedule("Sunday")}
    </div>
  );
}
