import { cpuUtilization, memoryUtilization } from "@/common/endpoints";
import { CpuUtilization, MemoryUtilization } from "@/common/types/custom";
import { applicationsStore } from "@/store/jotaiStore";
import { Paper, Tab, Tabs, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ParsedCpuUtilization,
  ParsedMemoryUtilization,
  defaultMultiLineChartCpu,
  defaultMultiLineChartMemory,
} from "./parseUtil";

function SystemMetrics() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(Number(searchParams.get("metrics")) || 0);
  const [allApplicationStore, setApplicationStore] = useAtom(applicationsStore);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: any,
  ) => {
    setValue(value);
    // setSearchParams((prev) => [...prev.entries(), ["metrics", value]]);
  };
  const { data: memoryUtilData, isLoading: isMemoryLoading } = useQuery<
    Record<"data", MemoryUtilization[]>
  >({
    queryKey: ["getMemoryMetric"],
    queryFn: () => memoryUtilization(),
  });

  const multiLineChartMemory = useMemo(() => {
    if (isMemoryLoading || !(memoryUtilData?.data?.length ?? 0 > 0)) {
      return defaultMultiLineChartMemory;
    }

    const parsedData = ParsedMemoryUtilization({
      data: memoryUtilData!.data,
      applications: allApplicationStore,
    });

    return parsedData;
  }, [isMemoryLoading, memoryUtilData?.data]);

  const { data: cpuUtilData, isLoading: cpuLoading } = useQuery<
    Record<"data", CpuUtilization[]>
  >({
    queryKey: ["getCpuMetric"],
    queryFn: () => cpuUtilization(),
  });

  const multiLineChartCpu = useMemo(() => {
    if (cpuLoading || !(cpuUtilData?.data?.length ?? 0 > 0)) {
      return defaultMultiLineChartCpu;
    }

    const parsedData = ParsedCpuUtilization({
      data: cpuUtilData!.data,
      applications: allApplicationStore,
    });
    return parsedData;
  }, [cpuLoading, memoryUtilData?.data]);

  const chart = useMemo(
    () => (value === 0 ? multiLineChartCpu : multiLineChartMemory),
    [value, multiLineChartCpu, multiLineChartMemory],
  );

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
        <section className="py-5">
          <Paper>
            <HighchartsReact highcharts={Highcharts} options={chart} />
          </Paper>
        </section>
      </div>
    </Paper>
  );
}

export default SystemMetrics;
