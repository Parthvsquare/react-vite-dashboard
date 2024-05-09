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

export type { EventHistory, Application };
