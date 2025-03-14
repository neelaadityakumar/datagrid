"use client";
import React, { useState } from "react";
import Table from "./Table";
import { DataRow } from "../types";

interface DataGridProps {
  data: DataRow[];
}

const DataGrid: React.FC<DataGridProps> = ({ data }) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const isAllSelected = selectedRows.length === data.length;
  const isPartialSelected =
    selectedRows.length > 0 && selectedRows.length < data.length;

  const handleSelectAll = () => {
    setSelectedRows(isAllSelected ? [] : data.map((row) => row.id));
  };

  const handleSelectRow = (id: number) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  const canDownload =
    selectedRows.length > 0 &&
    selectedRows.every((id) => {
      return data.find((row) => row.id === id)?.status === "Available";
    });

  const handleDownload = () => {
    if (canDownload) {
      alert(
        "Downloaded Items: " +
          JSON.stringify(
            data.filter((row) => selectedRows.includes(row.id)),
            null,
            2
          )
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Datagrid</h2>
      <div className="mb-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={isAllSelected}
            onChange={handleSelectAll}
            ref={(el) => {
              if (el) {
                el.indeterminate = isPartialSelected;
              }
            }}
          />
          {selectedRows.length > 0
            ? `${selectedRows.length} Selected`
            : "None Selected"}
        </label>
      </div>
      <Table
        data={data}
        handleSelectRow={handleSelectRow}
        selectedRows={selectedRows}
      />

      <button
        className={`mt-4 p-2 bg-blue-500 text-white rounded ${
          !canDownload ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
        }`}
        disabled={!canDownload}
        onClick={handleDownload}
      >
        Download Selected
      </button>
    </div>
  );
};

export default DataGrid;
