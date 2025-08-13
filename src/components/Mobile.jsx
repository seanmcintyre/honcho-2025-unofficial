import React from "react";

function Mobile({
  stages,
  days,
  schedule,
  sortEventsByTime,
  getEventStyleClasses,
}) {
  return (
    <div className="block md:hidden">
      {/* Mobile: Swipeable Stage View */}
      <div className="overflow-x-auto snap-x snap-mandatory">
        <div className="flex" style={{ width: `${stages.length * 100}vw` }}>
          {stages.map((stage, stageIdx) => (
            <div key={stage} className="w-screen flex-shrink-0 px-4 snap-start">
              {/* Stage Header */}
              <div className="bg-gray-800 p-3 font-bold text-white text-center border-2 border-gray-600 mb-4">
                {stage.toUpperCase()}
              </div>

              {/* Days Grid for this stage */}
              <div className="space-y-4">
                {days.map((day) => (
                  <div key={`${day}-${stage}`}>
                    <div className="bg-gray-700 p-2 font-bold text-white text-sm border border-gray-600 mb-2">
                      {day.toUpperCase()}
                    </div>
                    <div className="bg-gray-900 p-2 border border-gray-600 min-h-[80px]">
                      {sortEventsByTime(schedule[day][stage]).map(
                        (event, idx) => (
                          <div key={idx} className="mb-1">
                            <div
                              className={`p-2 rounded text-xs ${getEventStyleClasses(
                                event
                              )}`}
                            >
                              {event.time !== "TBA" &&
                                event.time !== "Various" &&
                                event.time !== "Late Night" && (
                                  <div className="font-bold">{event.time}</div>
                                )}
                              <div className="font-bold">{event.title}</div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Stage Indicator */}
      <div className="flex justify-center mt-4 gap-2">
        {stages.map((stage, idx) => (
          <div key={idx} className="w-2 h-2 bg-gray-600 rounded-full"></div>
        ))}
      </div>
    </div>
  );
}

export default Mobile;
