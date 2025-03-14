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
      return data.find((row) => row.id === id)?.status === "available";
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
    <div className="min-w-full ">
      {" "}
      <h2 className="text-2xl font-bold mb-4">Datagrid</h2>
      <div className="mx-auto min-w-full mt-10 p-4 border border-gray-300 rounded shadow-lg">
        <div className="mb-2 flex gap-4 items-center">
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
          <button
            className={`my-4 p-2 rounded flex gap-4 items-center justify-center ${
              canDownload
                ? " text-black cursor-pointer "
                : "text-gray-400 opacity-50 cursor-not-allowed"
            }`}
            disabled={!canDownload}
            onClick={handleDownload}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${
                !canDownload ? "opacity-50" : "opacity-100"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download Selected
          </button>
        </div>
        <Table
          data={data}
          handleSelectRow={handleSelectRow}
          selectedRows={selectedRows}
        />
      </div>{" "}
    </div>
  );
};

export default DataGrid;
