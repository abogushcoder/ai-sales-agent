// src/pages/DashboardPage.tsx
import AgentStatusCard from "../components/AgentStatusCard";
import LeadAllocationCard from "../components/LeadAllocationCard";

export default function DashboardPage() {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            <AgentStatusCard />
            <LeadAllocationCard />
        </div>
    );
}
