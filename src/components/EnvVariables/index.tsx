import { Paper } from "@mui/material";

function EnvironmentVariables() {
  return (
    <Paper>
      <div className="p-5">
        <h2 className="font-bold">Environment Variables</h2>
        <div className="flex items-center justify-between">
          <div className="w-1/2">
            <p className="text-sm text-gray-500">
              Environment variables are key-value pairs that are used to
              configure the application. These variables are injected into the
              application at runtime.
            </p>
          </div>
          <div className="w-1/2"></div>
        </div>
      </div>
    </Paper>
  );
}

export default EnvironmentVariables;
