import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { notesService } from "../../services";
export function RecentNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Fetch recent notes from backend
  useEffect(() => {
    const fetchRecentNotes = async () => {
      try {
        setLoading(true);
        const response = await notesService.getNotes({
          limit: 5,
          skip: 0,
          status: "active",
        });
        // Service now returns: { data: [...], pagination }
        setNotes(response.data || []);
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("Failed to load notes");
      } finally {
        setLoading(false);
      }
    };
    fetchRecentNotes();
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    if (diffHours === 0) return "Just now";
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    return date.toLocaleDateString();
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-3">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-bold text-gray-900">📝 Recent Notes</h2>
        <Link
          to="/notes"
          className="text-purple-600 hover:text-purple-700 text-xs font-medium"
        >
          View All →
        </Link>
      </div>

      {loading && <div className="text-xs text-gray-500">Loading notes...</div>}
      {error && <div className="text-xs text-red-500">{error}</div>}

      <div className="space-y-1 max-h-40 overflow-y-auto">
        {notes && notes.length > 0 ? (
          notes.slice(0, 3).map((note) => {
            // Defensive check: ensure note and required properties exist
            if (!note || !note._id || !note.title) {
              console.warn("Invalid note data:", note);
              return null;
            }
            return (
              <Link
                key={note._id}
                to={`/notes/${note._id}`}
                className="block p-2 border border-gray-200 rounded hover:border-purple-400 hover:bg-purple-50 transition cursor-pointer group"
              >
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className="text-xs font-semibold text-gray-900 group-hover:text-purple-600 transition truncate">
                    {note.title}
                  </h3>
                </div>
                <p className="text-xs text-gray-600 line-clamp-1 mb-1">
                  {note.rawText
                    ? note.rawText.substring(0, 50) + "..."
                    : "No content"}
                </p>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-xs text-gray-500">
                    {note.createdAt
                      ? formatDate(note.createdAt)
                      : "Unknown date"}
                  </span>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="text-xs text-gray-500 text-center py-2">
            No notes found
          </div>
        )}
      </div>
      <button className="w-full mt-2 py-1.5 border-2 border-gray-200 rounded text-xs text-gray-700 hover:border-purple-400 hover:text-purple-600 transition font-medium">
        + New Note
      </button>
    </div>
  );
}
