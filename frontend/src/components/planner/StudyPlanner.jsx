import { useState, useEffect } from "react";
import { Navabar } from "../common/Navbar";
import { Sidebar } from "../common/sidebar";
import { TaskModal } from "./TaskModal";
import { TaskList } from "./TaskList";
import { v4 as uuidv4 } from "uuid";

export function StudyPlanner() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem("plannerTasks");
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("plannerTasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  }, [tasks]);

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (formData) => {
    if (editingTask?.id) {
      // Update existing task
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id
            ? {
                ...formData,
                id: editingTask.id,
                completed: editingTask.completed,
              }
            : task,
        ),
      );
    } else {
      // Add new task
      const newTask = {
        ...formData,
        id: uuidv4(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTasks([...tasks, newTask]);
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <>
      <Navabar />
      <div className="flex h-screen overflow-hidden">
        <Sidebar defaultOpen={true} />
        <main className="flex-1 bg-gray-50 overflow-auto">
          <div className="p-4 lg:p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div></div>
              <button
                onClick={handleAddTask}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition text-sm font-medium"
              >
                + New Task
              </button>
            </div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div className="bg-white rounded-lg shadow-md p-3 border-l-4 border-blue-500">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-gray-600 font-medium">
                      Total Tasks
                    </p>
                    <p className="text-xl font-bold text-gray-900 mt-1">
                      {tasks.length}
                    </p>
                  </div>
                  <span className="text-lg">📋</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-3 border-l-4 border-green-500">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-gray-600 font-medium">
                      Completed
                    </p>
                    <p className="text-xl font-bold text-gray-900 mt-1">
                      {completedCount}
                    </p>
                  </div>
                  <span className="text-lg">✅</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-3 border-l-4 border-purple-500">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-gray-600 font-medium">Pending</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">
                      {tasks.length - completedCount}
                    </p>
                  </div>
                  <span className="text-lg">⏳</span>
                </div>
              </div>
            </div>

            {/* Header */}
            {/* Main Grid Layout - Compact */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Column 1 - Today's Tasks */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-3">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-sm font-bold text-gray-900">
                      Active Tasks
                    </h2>
                  </div>

                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {tasks.filter((t) => !t.completed).slice(0, 5).length ===
                    0 ? (
                      <p className="text-xs text-gray-500 text-center py-4">
                        No active tasks
                      </p>
                    ) : (
                      tasks
                        .filter((t) => !t.completed)
                        .slice(0, 5)
                        .map((task) => (
                          <div
                            key={task.id}
                            className="p-2 bg-gray-50 rounded text-xs border-l-2 border-orange-500 hover:bg-orange-50 transition cursor-pointer"
                            onClick={() => handleEditTask(task)}
                          >
                            <p className="font-medium text-gray-900 truncate">
                              {task.title}
                            </p>
                            <p className="text-gray-600 text-xs mt-0.5">
                              {task.subject}
                            </p>
                          </div>
                        ))
                    )}
                  </div>

                  <div className="mt-2 text-xs text-gray-600">
                    {tasks.filter((t) => !t.completed).length} active
                  </div>
                </div>
              </div>

              {/* Column 2 - Completed Tasks */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-3">
                  <h2 className="text-sm font-bold text-gray-900 mb-2">
                    Completed
                  </h2>

                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {tasks.filter((t) => t.completed).slice(0, 5).length ===
                    0 ? (
                      <p className="text-xs text-gray-500 text-center py-4">
                        No completed tasks
                      </p>
                    ) : (
                      tasks
                        .filter((t) => t.completed)
                        .slice(0, 5)
                        .map((task) => (
                          <div
                            key={task.id}
                            className="p-2 bg-gray-50 rounded text-xs border-l-2 border-green-500 opacity-75 hover:opacity-100 transition cursor-pointer"
                            onClick={() => handleEditTask(task)}
                          >
                            <p className="font-medium text-gray-900 line-through truncate">
                              {task.title}
                            </p>
                            <p className="text-gray-600 text-xs mt-0.5">
                              {task.subject}
                            </p>
                          </div>
                        ))
                    )}
                  </div>

                  <div className="mt-2 text-xs text-gray-600">
                    {tasks.filter((t) => t.completed).length} completed
                  </div>
                </div>
              </div>

              {/* Column 3-4 - Progress & All Tasks */}
              <div className="md:col-span-2 lg:col-span-2">
                <div className="space-y-4">
                  {/* Progress Section */}
                  <div className="bg-white rounded-lg shadow-md p-3">
                    <h3 className="text-sm font-bold text-gray-900 mb-2">
                      Overall Progress
                    </h3>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-600">
                          Completion Rate
                        </span>
                        <span className="text-xs font-bold text-gray-900">
                          {tasks.length > 0
                            ? Math.round((completedCount / tasks.length) * 100)
                            : 0}
                          %
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-3 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total:</span>
                        <span className="font-bold text-gray-900">
                          {tasks.length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Completed:</span>
                        <span className="font-bold text-green-600">
                          {completedCount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pending:</span>
                        <span className="font-bold text-orange-600">
                          {tasks.length - completedCount}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* All Tasks */}
                  <div className="bg-white rounded-lg shadow-md p-3">
                    <h3 className="text-sm font-bold text-gray-900 mb-2">
                      All Tasks
                    </h3>
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                      {tasks.length === 0 ? (
                        <p className="text-xs text-gray-500 text-center py-4">
                          No tasks yet
                        </p>
                      ) : (
                        <TaskList
                          tasks={tasks}
                          onEdit={handleEditTask}
                          onDelete={handleDeleteTask}
                          onToggleComplete={handleToggleComplete}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        editingTask={editingTask}
      />
    </>
  );
}
