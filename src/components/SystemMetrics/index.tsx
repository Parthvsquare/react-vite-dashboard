import { cpuUtilization, memoryUtilization } from "@/common/endpoints";
import { Paper, Tab, Tabs } from "@mui/material";
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
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>
    </Paper>
  );
}

export default SystemMetrics;
