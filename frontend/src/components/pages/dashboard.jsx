import { Navabar } from "../common/Navbar";
import { Sidebar } from "../common/sidebar";
import { StatsCard } from "./StatsCard";
import { TodayTasks } from "./TodayTasks";
import { AISuggestions } from "./AISuggestions";
import { ProgressChart } from "./ProgressChart";
import { RecentNotes } from "./RecentNotes";
export function Dashboard() {
  return (
    <>
      <Navabar />
      <div className="flex h-screen overflow-hidden">
        <Sidebar defaultOpen={true} />
        <main className="flex-1 bg-gray-50 overflow-auto">
          <div className="p-4 lg:p-6">
            {/* Stats Cards - Minimized */}
            <div className="mb-4">
              <StatsCard />
            </div>

            {/* Main Grid Layout - Compact */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Column 1 - Today's Tasks */}
              <div className="md:col-span-1">
                <TodayTasks />
              </div>

              {/* Column 2 - AI Suggestions */}
              <div className="md:col-span-1">
                <AISuggestions />
              </div>

              {/* Column 3-4 - Progress Chart & Recent Notes */}
              <div className="md:col-span-2 lg:col-span-2">
                <div className="space-y-4">
                  <ProgressChart />
                  <RecentNotes />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
