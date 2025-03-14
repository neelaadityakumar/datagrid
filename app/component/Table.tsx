import React from "react";
import TableRow from "./TableRow";
import { DataRow } from "../types";

interface TableProps {
  data: DataRow[];
  handleSelectRow: (id: number) => void;
  selectedRows: number[];
}
const Table: React.FC<TableProps> = ({
  data,
  selectedRows,
  handleSelectRow,
}) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Select</th>
          <th className="border p-2">Name</th>
          <th className="border p-2">Device</th>
          <th className="border p-2">Path</th>
          <th className="border p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <TableRow
            key={row.id}
            row={row}
            selected={selectedRows.includes(row.id)}
            onSelect={handleSelectRow}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
