import { cpuUtilization, memoryUtilization } from "@/common/endpoints";
import { Paper, Tab, Tabs, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function SystemMetrics() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(Number(searchParams.get("metrics")) || 0);
  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: any,
  ) => {
    setValue(value);
    // setSearchParams((prev) => [...prev.entries(), ["metrics", value]]);
  };
  const { data: memoryUtilData } = useQuery({
    queryKey: ["getMemoryMetric"],
    queryFn: () => memoryUtilization(),
  });

  const { data: cpuUtilData } = useQuery({
    queryKey: ["getCpuMetric"],
    queryFn: () => cpuUtilization(),
  });

  return (
    <Paper>
      <Typography variant="h6" className="p-5 font-bold">
        System Metrics
      </Typography>
      <div className="mx-auto w-11/12">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          variant="fullWidth"
          className="w-full"
        >
          <Tab label="CPU" />
          <Tab label="Memory" />
        </Tabs>
        <section>{/* graph */}</section>
      </div>
    </Paper>
  );
}

export default SystemMetrics;
