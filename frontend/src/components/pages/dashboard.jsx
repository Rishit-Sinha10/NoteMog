import { UserButton } from "@clerk/react";
import { Sidebar } from "../common/sidebar";
export function Dashboard() {
  return (
    <>

      <Sidebar>
        <div className="flex h-screen">
          <Sidebar defaultOpen={true} />
          <main className="flex-8">...</main>
        </div>
      </Sidebar>
    </>
  );
}

// Inside your layout:
