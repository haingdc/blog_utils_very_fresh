interface DataItem {
  name: string;
  value: number;
}

interface DataCsv extends Array<DataItem> {
  columns: string[];
}

interface DataBarchart {
  data: DataItem[];
  columns: string[];
}

export type { DataBarchart, DataCsv, DataItem };
