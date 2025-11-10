export interface ChartDataItem {
  name: string;
  value: number;
  percentage?: number;
}

export interface DashboardData {
  byLocation: ChartDataItem[];
  total: number;
}
