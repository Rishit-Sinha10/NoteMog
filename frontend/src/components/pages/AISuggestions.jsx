export function AISuggestions() {
  const suggestions = [
    {
      id: 1,
      message: "You should revise DSA today",
      reason: "Based on your study pattern",
      icon: "💡",
      actionLabel: "Open DSA Notes",
    },
    {
      id: 2,
      message: "Summarize your OS notes",
      reason: "You studied OS for 45 minutes",
      icon: "📝",
      actionLabel: "Create Summary",
    },
    {
      id: 3,
      message: "Take a break!",
      reason: "You've been focused for 2 hours",
      icon: "☕",
      actionLabel: "Start Timer",
    },
    {
      id: 4,
      message: "Review SQL concepts",
      reason: "Quiz coming up in 2 days",
      icon: "🗂️",
      actionLabel: "Start Review",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-3">
      <h2 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-1">
        <span>🤖</span> AI Suggestions
      </h2>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        {suggestions.slice(0, 3).map((suggestion) => (
          <div
            key={suggestion.id}
            className="border-l-4 border-purple-500 bg-purple-50 p-2 rounded-r text-xs"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="text-sm">{suggestion.icon}</span>
                  <p className="font-semibold text-gray-900 truncate">
                    {suggestion.message}
                  </p>
                </div>
                <p className="text-xs text-gray-600 truncate">
                  {suggestion.reason}
                </p>
              </div>
              <button className="ml-1 bg-purple-600 text-white px-2 py-0.5 rounded text-xs hover:bg-purple-700 transition whitespace-nowrap flex-shrink-0">
                {suggestion.actionLabel.split(" ")[0]}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
        💬 Updated based on your study patterns
      </div>
    </div>
  );
}
