export function StatsCard() {
  const stats = [
    {
      id: 1,
      label: "Study Hours",
      value: "12.5h",
      change: "+2.3h today",
      icon: "⏱️",
      color: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      id: 2,
      label: "Tasks Completed",
      value: "24",
      change: "+3 today",
      icon: "✅",
      color: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      id: 3,
      label: "Streak 🔥",
      value: "7 days",
      change: "Keep it up!",
      icon: "🔥",
      color: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    {
      id: 4,
      label: "Focus Score",
      value: "92%",
      change: "+5% today",
      icon: "🎯",
      color: "bg-purple-50",
      borderColor: "border-purple-200",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className={`${stat.color} ${stat.borderColor} border-2 rounded-lg p-3 transition hover:shadow-md`}
        >
          <div className="flex justify-between items-start mb-1">
            <span className="text-xl">{stat.icon}</span>
            <span className="text-xs text-gray-500">{stat.change}</span>
          </div>
          <p className="text-gray-600 text-xs font-medium">{stat.label}</p>
          <p className="text-lg font-bold text-gray-900 mt-1">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
