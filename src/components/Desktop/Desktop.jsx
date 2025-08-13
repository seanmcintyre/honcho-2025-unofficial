import React from "react";
import "./Desktop.css";

export function Desktop({ stages, days, schedule, sortEventsByTime }) {
  const getEventStyleClass = (event) => {
    const isUnknownTime =
      event.time === "TBA" ||
      event.time === "Various" ||
      event.time === "Late Night";

    const baseClass = `event-${event.type}`;
    return isUnknownTime ? `${baseClass}-unknown` : baseClass;
  };

  // Convert time string to minutes for sorting
  const timeToMinutes = (timeStr) => {
    if (
      !timeStr ||
      timeStr === "TBA" ||
      timeStr === "Various" ||
      timeStr === "Late Night"
    ) {
      return 9999; // Put unknown times at the end
    }

    const time = timeStr.toLowerCase();
    const isPM = time.includes("pm");
    const isAM = time.includes("am");

    // Extract hour and minute
    let hour = parseInt(time.match(/(\d+)/)[1]);
    let minute = 0;

    if (time.includes(":")) {
      const parts = time.split(":");
      hour = parseInt(parts[0]);
      minute = parseInt(parts[1].replace(/[^\d]/g, ""));
    }

    // Convert to 24-hour format
    if (isPM && hour !== 12) hour += 12;
    if (isAM && hour === 12) hour = 0;

    // For times after midnight (12 AM), add 24 hours to make them come after PM times
    if (isAM && hour < 6) hour += 24;

    return hour * 60 + minute;
  };

  // Get all unique times from events, grouped by day
  const getEventTimesByDay = () => {
    const timesByDay = {};
    days.forEach((day) => {
      timesByDay[day] = new Set();
      stages.forEach((stage) => {
        const dayEvents = schedule[day]?.[stage] || [];
        dayEvents.forEach((event) => {
          if (
            event.time &&
            event.time !== "TBA" &&
            event.time !== "Various" &&
            event.time !== "Late Night"
          ) {
            timesByDay[day].add(event.time);
          }
        });
      });
    });

    // Convert to sorted arrays
    Object.keys(timesByDay).forEach((day) => {
      timesByDay[day] = Array.from(timesByDay[day]).sort(
        (a, b) => timeToMinutes(a) - timeToMinutes(b)
      );
    });

    return timesByDay;
  };

  const eventTimesByDay = getEventTimesByDay();

  // Get events for a specific time slot
  const getEventsForTimeSlot = (day, stage, timeSlot) => {
    const dayEvents = schedule[day]?.[stage] || [];
    return dayEvents.filter((event) => {
      const eventTime = event.time;
      if (
        !eventTime ||
        eventTime === "TBA" ||
        eventTime === "Various" ||
        eventTime === "Late Night"
      ) {
        return false; // Skip unknown times for now
      }

      // Only show events that start at this exact time slot
      return eventTime === timeSlot;
    });
  };

  // Format time for display
  const formatTimeSlot = (timeSlot) => {
    const time = timeSlot.toLowerCase();
    const isPM = time.includes("pm");
    const isAM = time.includes("am");

    // Extract hour and minute
    let hour = parseInt(time.match(/(\d+)/)[1]);
    let minute = 0;

    if (time.includes(":")) {
      const parts = time.split(":");
      hour = parseInt(parts[0]);
      minute = parseInt(parts[1].replace(/[^\d]/g, ""));
    }

    // Convert to 24-hour format for comparison
    if (isPM && hour !== 12) hour += 12;
    if (isAM && hour === 12) hour = 0;

    // Format for display
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const ampm = hour >= 12 ? "PM" : "AM";
    return `${displayHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };

  // Check if a time slot has any events across all stages for a day
  const hasEventsAtTime = (day, timeSlot) => {
    return stages.some((stage) => {
      const events = getEventsForTimeSlot(day, stage, timeSlot);
      return events.length > 0;
    });
  };

  return (
    <div className="desktop-schedule">
      <div className="schedule-grid">
        {/* Header Row */}
        <div className="header-cell time-header">TIME</div>
        <div className="header-cell">DAY</div>
        {stages.map((stage) => (
          <div key={stage} className="header-cell">
            {stage.toUpperCase()}
          </div>
        ))}

        {/* Time-based rows for each day */}
        {days.map((day, dayIndex) => {
          const dayEventTimes = eventTimesByDay[day] || [];
          return (
            <React.Fragment key={day}>
              {dayEventTimes.map((timeSlot, timeIndex) => {
                // Find the last time slot that has any events ending at 7:00am
                const isLastTimeSlotWithSevenAMEnd = (() => {
                  // Check if this time slot has any events ending at 7:00am
                  const hasEventEndingAtSevenAM = stages.some((stage) => {
                    const events = getEventsForTimeSlot(day, stage, timeSlot);
                    return events.some((event) => {
                      if (event.end_time) {
                        const endTimeInMinutes = timeToMinutes(event.end_time);
                        const sevenAMInMinutes = 7 * 60; // 7:00am in minutes
                        return endTimeInMinutes === sevenAMInMinutes;
                      }
                      return false;
                    });
                  });

                  if (!hasEventEndingAtSevenAM) return false;

                  // Check if this is the last time slot with a 7:00am ending event
                  for (let i = timeIndex + 1; i < dayEventTimes.length; i++) {
                    const futureTimeSlot = dayEventTimes[i];
                    const futureHasSevenAMEnd = stages.some((stage) => {
                      const events = getEventsForTimeSlot(
                        day,
                        stage,
                        futureTimeSlot
                      );
                      return events.some((event) => {
                        if (event.end_time) {
                          const endTimeInMinutes = timeToMinutes(
                            event.end_time
                          );
                          const sevenAMInMinutes = 7 * 60; // 7:00am in minutes
                          return endTimeInMinutes === sevenAMInMinutes;
                        }
                        return false;
                      });
                    });
                    if (futureHasSevenAMEnd) return false;
                  }

                  return true;
                })();

                const isLastDay = dayIndex === days.length - 1;
                const shouldAddDivider =
                  isLastTimeSlotWithSevenAMEnd && !isLastDay;

                return (
                  <React.Fragment key={`${day}-${timeSlot}`}>
                    <div
                      className={`time-cell ${
                        shouldAddDivider ? "day-divider" : ""
                      }`}
                    >
                      {formatTimeSlot(timeSlot)}
                    </div>
                    <div
                      className={`day-cell ${
                        shouldAddDivider ? "day-divider" : ""
                      }`}
                    >
                      {/* {day.toUpperCase()} */}
                      {day === "Thursday Aug 14" && <span>THUR</span>}
                      {day === "Friday Aug 15" && <span>FRI</span>}
                      {day === "Saturday Aug 16" && <span>SAT</span>}
                      {day === "Sunday Aug 17" && <span>SUN</span>}
                    </div>
                    {stages.map((stage) => {
                      const events = getEventsForTimeSlot(day, stage, timeSlot);
                      return (
                        <div
                          key={`${day}-${stage}-${timeSlot}`}
                          className={`event-cell ${
                            shouldAddDivider ? "day-divider" : ""
                          }`}
                        >
                          {events.map((event, idx) => (
                            <div key={idx} className="event-item">
                              <div
                                className={`event-card ${getEventStyleClass(
                                  event
                                )}`}
                              >
                                <div className="event-time">{event.time}</div>
                                <div className="event-title">{event.title}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
