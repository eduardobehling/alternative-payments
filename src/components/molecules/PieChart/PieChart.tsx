"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPie,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { ChartDataItem } from "@/types/chart";
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

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <RechartsPie>
          <Pie
            data={data as unknown as Record<string, unknown>[]}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent = 0 }) =>
              `${name} (${(percent * 100).toFixed(1)}%)`
            }
            outerRadius={120}
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
