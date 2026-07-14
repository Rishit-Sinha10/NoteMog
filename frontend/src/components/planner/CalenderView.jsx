import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function CalendarView({ tasks, onTaskClick, selectedDate, onDateSelect, isToday }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month"); // "month" or "week"

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getTasksForDate = (date) => {
    return tasks.filter(
      (task) =>
        new Date(task.date).toDateString() === date.toDateString()
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 border-red-400 text-red-700";
      case "medium":
        return "bg-yellow-100 border-yellow-400 text-yellow-700";
      case "low":
        return "bg-green-100 border-green-400 text-green-700";
      default:
        return "bg-gray-100 border-gray-400 text-gray-700";
    }
  };

  const renderMonthView = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="bg-gray-50 p-2 min-h-24"></div>
      );
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayTasks = getTasksForDate(date);
      const isToday_ = isToday(date);
      const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();

      days.push(
        <div
          key={day}
          onClick={() => onDateSelect(date)}
          className={`border-2 p-2 min-h-24 cursor-pointer transition ${
            isToday_
              ? "bg-yellow-50 border-yellow-400 ring-2 ring-yellow-300"
              : isSelected
              ? "bg-yellow-100 border-yellow-400"
              : "bg-white border-gray-200 hover:border-yellow-300"
          }`}
        >
          <div className="flex justify-between items-start mb-1">
            <span
              className={`text-sm font-bold ${
                isToday_
                  ? "text-yellow-600 bg-yellow-400 rounded-full w-6 h-6 flex items-center justify-center text-white"
                  : "text-gray-700"
              }`}
            >
              {day}
            </span>
            {dayTasks.length > 0 && (
              <span className="text-xs font-semibold bg-yellow-300 text-yellow-900 px-2 py-0.5 rounded-full">
                {dayTasks.length}
              </span>
            )}
          </div>
          <div className="space-y-1">
            {dayTasks.slice(0, 2).map((task) => (
              <button
                key={task.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onTaskClick(task);
                }}
                className={`w-full text-xs p-1 rounded border-2 truncate hover:opacity-75 transition ${getPriorityColor(
                  task.priority
                )}`}
                title={task.title}
              >
                {task.time} - {task.title}
              </button>
            ))}
            {dayTasks.length > 2 && (
              <p className="text-xs text-gray-600 text-center">
                +{dayTasks.length - 2} more
              </p>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  };

  const renderWeekView = () => {
    const weekStart = getWeekStart(currentDate);
    const weekDays = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      weekDays.push(date);
    }

    return (
      <div className="bg-white rounded-lg border-2 border-gray-200 overflow-x-auto">
        <div className="grid grid-cols-7 gap-0">
          {weekDays.map((date) => {
            const dayTasks = getTasksForDate(date);
            const isToday_ = isToday(date);

            return (
              <div
                key={date.toDateString()}
                className={`border-r-2 border-gray-200 p-4 min-w-44 ${
                  isToday_
                    ? "bg-yellow-50"
                    : "bg-white"
                }`}
              >
                <div className="text-center mb-3">
                  <p className="text-sm font-semibold text-gray-600">
                    {DAYS[date.getDay()]}
                  </p>
                  <p
                    className={`text-xl font-bold ${
                      isToday_
                        ? "text-yellow-600 bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center mx-auto text-white"
                        : "text-gray-900"
                    }`}
                  >
                    {date.getDate()}
                  </p>
                </div>
                <div className="space-y-2">
                  {dayTasks.map((task) => (
                    <button
                      key={task.id}
                      onClick={() => onTaskClick(task)}
                      className={`w-full text-xs p-2 rounded border-2 text-left transition hover:opacity-75 ${getPriorityColor(
                        task.priority
                      )}`}
                      title={task.title}
                    >
                      <div className="font-semibold">{task.time}</div>
                      <div className="truncate">{task.title}</div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header Controls */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>

        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("month")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                viewMode === "month"
                  ? "bg-yellow-400 text-gray-900"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode("week")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                viewMode === "week"
                  ? "bg-yellow-400 text-gray-900"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Week
            </button>
          </div>

          <button
            onClick={goToToday}
            className="px-4 py-2 bg-yellow-300 text-gray-900 rounded-lg hover:bg-yellow-400 transition font-medium text-sm"
          >
            Today
          </button>

          <div className="flex gap-2">
            <button
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      {viewMode === "month" ? (
        <div>
          <div className="grid grid-cols-7 gap-0 mb-4 bg-yellow-100">
            {DAYS.map((day) => (
              <div
                key={day}
                className="text-center py-3 font-bold text-gray-900"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0 border-2 border-gray-200 rounded-lg overflow-hidden">
            {renderMonthView()}
          </div>
        </div>
      ) : (
        renderWeekView()
      )}
    </div>
  );
}
