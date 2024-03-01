import type { TableColumn } from "./table-column.type";

export interface TableSort {
  column: TableColumn | null;
  desc: boolean | null;
}
