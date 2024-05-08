type EndpointKeys =
  | "allApplications"
  | "memoryUtilization"
  | "cpuUtilization"
  | "eventHistory";

// single source for Endpoints mapping
const endpoints: Map<EndpointKeys, string> = new Map([
  ["allApplications", "/71NNjB/applications"],
  ["memoryUtilization", "/ybFVVH/memoryutilization"],
  ["cpuUtilization", "/Ymxfa2/cpuutilization"],
  ["eventHistory", "/TYjDIe/eventhistory"],
]);

// https://retoolapi.dev/71NNjB/applications
// https://retoolapi.dev/ybFVVH/memoryutilization
// https://retoolapi.dev/Ymxfa2/cpuutilization
// https://retoolapi.dev/TYjDIe/eventhistory
export { endpoints };
