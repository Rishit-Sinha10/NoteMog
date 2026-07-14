import { Trash2, Edit2, CheckCircle2, Clock } from "lucide-react";

export function TaskList({
  tasks,
  onEdit,
  onDelete,
  onToggleComplete,
  isToday,
}) {
  const getPriorityLabel = (priority) => {
    const labels = {
      high: { label: "High", color: "bg-red-500" },
      medium: { label: "Medium", color: "bg-yellow-500" },
      low: { label: "Low", color: "bg-green-500" },
    };
    return labels[priority] || labels.medium;
  };

  const convertTo12Hour = (time24) => {
    const [hours, minutes] = time24.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const groupedTasks = {
    today: [],
    upcoming: [],
    overdue: [],
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  tasks.forEach((task) => {
    const taskDate = new Date(task.date);
    taskDate.setHours(0, 0, 0, 0);

    if (taskDate.getTime() === today.getTime()) {
      groupedTasks.today.push(task);
    } else if (taskDate > today) {
      groupedTasks.upcoming.push(task);
    } else {
      groupedTasks.overdue.push(task);
    }
  });

  const TaskItem = ({ task, category }) => (
    <div
      className={`p-3 rounded-lg border-2 transition ${
        task.completed
          ? "bg-gray-100 border-gray-300 opacity-60"
          : category === "overdue"
            ? "bg-red-50 border-red-300 hover:border-red-400"
            : category === "today"
              ? "bg-yellow-50 border-yellow-300 hover:border-yellow-400"
              : "bg-blue-50 border-blue-300 hover:border-blue-400"
      }`}
    >
      <div className="flex items-start gap-2 mb-2">
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`flex-shrink-0 mt-0.5 ${
            task.completed
              ? "text-green-600"
              : "text-gray-400 hover:text-gray-600"
          }`}
          title={task.completed ? "Mark incomplete" : "Mark complete"}
        >
          <CheckCircle2 size={18} />
        </button>

        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-sm ${
              task.completed ? "text-gray-500 line-through" : "text-gray-900"
            }`}
          >
            {task.title}
          </h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-xs text-gray-600 flex items-center gap-1">
              <Clock size={12} />
              {convertTo12Hour(task.time)}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
              {task.subject}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full text-white ${
                getPriorityLabel(task.priority).color
              }`}
            >
              {getPriorityLabel(task.priority).label}
            </span>
          </div>
          {task.description && (
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>

        <div className="flex gap-1 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 hover:bg-yellow-200 rounded transition"
            title="Edit task"
          >
            <Edit2 size={16} className="text-yellow-600" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 hover:bg-red-200 rounded transition"
            title="Delete task"
          >
            <Trash2 size={16} className="text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Overdue Tasks */}
      {groupedTasks.overdue.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-red-600 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
            Overdue ({groupedTasks.overdue.length})
          </h3>
          <div className="space-y-2">
            {groupedTasks.overdue.map((task) => (
              <TaskItem key={task.id} task={task} category="overdue" />
            ))}
          </div>
        </div>
      )}

      {/* Today's Tasks */}
      {groupedTasks.today.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-yellow-600 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-600 rounded-full"></span>
            Today ({groupedTasks.today.length})
          </h3>
          <div className="space-y-2">
            {groupedTasks.today.map((task) => (
              <TaskItem key={task.id} task={task} category="today" />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Tasks */}
      {groupedTasks.upcoming.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-blue-600 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            Upcoming ({groupedTasks.upcoming.length})
          </h3>
          <div className="space-y-2">
            {groupedTasks.upcoming.map((task) => (
              <TaskItem key={task.id} task={task} category="upcoming" />
            ))}
          </div>
        </div>
      )}

      {tasks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg font-medium mb-2">No tasks yet</p>
          <p className="text-sm">Create your first task to get started!</p>
        </div>
      )}
    </div>
  );
}
