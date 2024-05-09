import {
  Application,
  CpuUtilization,
  MemoryUtilization,
} from "@/common/types/custom";

const defaultMultiLineChartMemory = {
  title: {
    text: "Memory Utilization",
  },
  xAxis: {
    type: "datetime",
    title: {
      text: "Timestamp",
    },
  },
  yAxis: {
    title: {
      text: "Memory Utilization",
    },
  },
  tooltip: {
    xDateFormat: "%e %b %l:%M %p",
  },
  series: [],
};

function ParsedMemoryUtilization({
  data,
  applications,
}: {
  data: MemoryUtilization[];
  applications: Application[];
}) {
  const parsedSeries = applications.map((app) => {
    const appData = data.filter((d) => Number(d.applicationId) === app.id);

    return {
      name: app.name,
      data: appData.map((d) => [
        Number(d.timestamp),
        parseFloat(d.memoryUtilization),
      ]),
      marker: {
        enabled: false,
      },
    };
  });

  const multiLineChart = {
    ...defaultMultiLineChartMemory,
    series: parsedSeries,
  };

  return multiLineChart;
}

const defaultMultiLineChartCpu = {
  title: {
    text: "CPU Utilization(%)",
  },
  xAxis: {
    type: "datetime",
    title: {
      text: "Timestamp",
    },
  },
  yAxis: {
    title: {
      text: "CPU Utilization",
    },
  },
  tooltip: {
    xDateFormat: "%e %b %l:%M %p",
  },
  series: [],
};

function ParsedCpuUtilization({
  data,
  applications,
}: {
  data: CpuUtilization[];
  applications: Application[];
}) {
  const parsedSeries = applications.map((app) => {
    const appData = data.filter((d) => Number(d.applicationId) === app.id);

    return {
      name: app.name,
      data: appData.map((d) => [
        Number(d.timestamp),
        parseFloat(d.cpuUtilization),
      ]),
      marker: {
        enabled: false,
      },
    };
  });

  const multiLineChart = {
    ...defaultMultiLineChartCpu,
    series: parsedSeries,
  };

  return multiLineChart;
}

export {
  ParsedMemoryUtilization,
  defaultMultiLineChartMemory,
  defaultMultiLineChartCpu,
  ParsedCpuUtilization,
};
