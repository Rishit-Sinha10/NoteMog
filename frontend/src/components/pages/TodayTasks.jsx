import { useState, useEffect } from "react";
import { tasksService } from "../../services";

export function TodayTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch today's tasks from backend
  useEffect(() => {
    const fetchTodayTasks = async () => {
      try {
        setLoading(true);
        const today = new Date().toISOString().split("T")[0];
        const response = await tasksService.getTasks({
          status: "active",
          limit: 10,
        });
        // Service now returns: { data: [...], pagination }
        setTasks(response.data || []);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTodayTasks();
  }, []);

  const toggleTask = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      await tasksService.updateTask(id, { status: newStatus });
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, status: newStatus } : task,
        ),
      );
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Failed to update task");
    }
  };

  const addTask = async () => {
    try {
      const newTaskData = {
        title: "New Task",
        date: new Date().toISOString().split("T")[0],
        durationMins: "60",
        status: "active",
      };
      const response = await tasksService.createTask(newTaskData);
      // Response structure: { success, message, data: {...} }
      const newTask = response.data || response;
      setTasks([...tasks, newTask]);
    } catch (err) {
      console.error("Error creating task:", err);
      setError("Failed to create task");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-3">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-bold text-gray-900">Today's Tasks</h2>
        <button
          onClick={addTask}
          disabled={loading}
          className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium hover:bg-purple-700 transition disabled:opacity-50"
        >
          + Add
        </button>
      </div>

      {loading && <div className="text-xs text-gray-500">Loading tasks...</div>}
      {error && <div className="text-xs text-red-500">{error}</div>}

      <div className="space-y-2 max-h-48 overflow-y-auto">
        {tasks && tasks.length > 0 ? (
          tasks.slice(0, 5).map((task) => {
            // Defensive check: ensure task and required properties exist
            if (!task || !task._id || !task.title) {
              console.warn("Invalid task data:", task);
              return null;
            }
            return (
              <div
                key={task._id}
                className="flex items-center gap-2 p-2 bg-gray-50 rounded hover:bg-gray-100 transition text-xs"
              >
                <input
                  type="checkbox"
                  checked={task.status === "inactive"}
                  onChange={() => toggleTask(task._id, task.status)}
                  className="w-4 h-4 cursor-pointer accent-purple-600"
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-medium truncate ${
                      task.status === "inactive"
                        ? "text-gray-400 line-through"
                        : "text-gray-900"
                    }`}
                  >
                    {task.title}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-xs text-gray-500 text-center py-2">
            No tasks today
          </div>
        )}
      </div>

      <div className="mt-2 text-xs text-gray-600">
        {tasks.filter((t) => t.status === "inactive").length}/{tasks.length}{" "}
        completed
      </div>
    </div>
  );
}
