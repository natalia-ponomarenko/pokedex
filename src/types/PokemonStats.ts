export interface Stats {
  stats: Statistic[];
}

export interface Statistic {
  base_stat: number;
  stat: { name: string };
}
