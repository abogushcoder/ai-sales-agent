// src/api.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5050/api";

export type AgentStatus = { running: boolean };
export type LeadAllocation = { percentage: number };
export type AnalyticsSummary = {
  total_calls: number;
  successful_calls: number;
  nurture_count: number;
};
export type NurtureLead = {
  id: string;
  name: string;
  phone: string;
  stage: string;
  last_contacted: string;
};

export type PlanUsage = {
  current_leads: number;
  max_leads: number;
  conversation_minutes: number;
  tier: string;
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with status ${res.status}`);
  }

  return res.json();
}

export const api = {
  getAgentStatus: () => request<AgentStatus>("/agent/status"),
  setAgentStatus: (running: boolean) =>
    request<AgentStatus>("/agent/status", {
      method: "POST",
      body: JSON.stringify({ running }),
    }),

  getLeadAllocation: () => request<LeadAllocation>("/agent/lead-allocation"),
  setLeadAllocation: (percentage: number) =>
    request<LeadAllocation>("/agent/lead-allocation", {
      method: "POST",
      body: JSON.stringify({ percentage }),
    }),

  getAnalyticsSummary: () => request<AnalyticsSummary>("/analytics/summary"),
  getNurtureLeads: () => request<NurtureLead[]>("/analytics/nurture-leads"),
  removeNurtureLead: (leadId: string) =>
    request<{ status: string }>(`/analytics/nurture-leads/${leadId}`, {
      method: "DELETE",
    }),

  getPlanUsage: () => request<PlanUsage>("/plan/usage"),
};
