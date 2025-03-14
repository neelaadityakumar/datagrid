"use client";

import { DataRow } from "../types";

const TableRow: React.FC<{
  row: DataRow;
  selected: boolean;
  onSelect: (id: number) => void;
}> = ({ row, selected, onSelect }) => (
  <tr className="border">
    <td className="p-2 text-center">
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onSelect(row.id)}
      />
    </td>
    <td className="p-2">{row.name}</td>
    <td className="p-2">{row.device}</td>
    <td className="p-2 max-w-[300px] overflow-hidden text-ellipsis">
      {row.path}
    </td>
    <td className="p-2 flex items-center">
      {row.status === "available" && (
        <span className="h-2 w-2 bg-green-500 rounded-full mr-2 min-w-2"></span>
      )}
      {row.status}
    </td>
  </tr>
);

export default TableRow;
