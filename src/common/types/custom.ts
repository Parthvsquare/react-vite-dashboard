interface EventHistory {
  id: number;
  status: string;
  version: string;
  timestamp: string;
  applicationId: string;
  event: string;
}
interface Application {
  id: number;
  name: string;
  status: string;
  version: string;
  updatedAt: string;
  desiredVersion: string;
}
interface MemoryUtilization {
  id: number;
  timestamp: string;
  applicationId: string;
  memoryUtilization: string;
}
interface CpuUtilization {
  id: number;
  timestamp: string;
  applicationId: string;
  cpuUtilization: string;
}

export type { EventHistory, Application, MemoryUtilization, CpuUtilization };
