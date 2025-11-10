"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPie,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { ChartDataItem } from "@/types/dashboard";
import styles from "./PieChart.module.css";

export interface PieChartProps {
  data: ChartDataItem[];
  title: string;
  colors?: string[];
}

const DEFAULT_COLORS = [
  "#3b82f6", // primary blue
  "#10b981", // green
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#84cc16", // lime
  "#f97316", // orange
  "#6366f1", // indigo
  "#14b8a6", // teal
];

export function PieChart({
  data,
  title,
  colors = DEFAULT_COLORS,
}: PieChartProps) {
  if (data.length === 0) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.empty}>No data available</div>
      </div>
    );
  }

  // Responsive chart dimensions
  const getOuterRadius = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width <= 375) return 80;
      if (width <= 480) return 90;
      if (width <= 768) return 100;
      return 120;
    }
    return 120;
  };

  // Custom label function for better mobile display
  const customLabel = ({
    name,
    percent,
  }: {
    name?: string;
    percent?: number;
  }) => {
    if (!name || percent === undefined) return "";
    const percentage = (percent * 100).toFixed(1);
    const percentageNum = parseFloat(percentage);

    if (typeof window !== "undefined" && window.innerWidth <= 480) {
      // Show only percentage on very small screens
      return percentageNum > 5 ? `${percentage}%` : "";
    }

    // Show full label on larger screens, but truncate long names
    const displayName = name.length > 15 ? `${name.substring(0, 12)}...` : name;
    return percentageNum > 3 ? `${displayName} (${percentage}%)` : "";
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <ResponsiveContainer width="100%" height={350}>
        <RechartsPie>
          <Pie
            data={data as unknown as Record<string, unknown>[]}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={customLabel}
            outerRadius={getOuterRadius()}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => [`${value} characters`]} />
          <Legend />
        </RechartsPie>
      </ResponsiveContainer>
    </div>
  );
}
