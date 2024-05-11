import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'task', headerName: 'Task ', width: 430 },
  {
    field: 'priority',
    headerName: 'Priority',
    width: 130,
    sortable: false,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    description: 'This column has a value status and is not sortable.',
    sortable: false,
  },
  {
    field: 'Date',
    headerName: 'Date',
    width: 220,
    description: 'This column has a value Date and is not sortable.',
    sortable: false,
  },
];

const rows = [
  {
    id: 1,
    task: 'Buy groceries',
    priority: 'High',
    status: 'Pending',
    Date: '2022-01-01',
  },
  {
    id: 2,
    task: 'Meeting at 10 am',
    priority: 'Low',
    status: 'Completed',
    Date: '2022-01-02',
  },
  {
    id: 3,
    task: 'Call mom',
    priority: 'Medium',
    status: 'Pending',
    Date: '2022-01-03',
  },
  {
    id: 4,
    task: 'Read a book',
    priority: 'Low',
    status: 'Pending',
    Date: '2022-01-04',
  },
  {
    id: 5,
    task: 'Workout',
    priority: 'High',
    status: 'Completed',
    Date: '2022-01-05',
  },
  {
    id: 6,
    task: 'Buy groceries',
    priority: 'High',
    status: 'Pending',
    Date: '2022-01-01',
  },
  {
    id: 7,
    task: 'Meeting at 10 am',
    priority: 'Low',
    status: 'Completed',
    Date: '2022-01-02',
  },
  {
    id: 8,
    task: 'Call mom',
    priority: 'Medium',
    status: 'Pending',
    Date: '2022-01-03',
  },
  {
    id: 9,
    task: 'Read a book',
    priority: 'Low',
    status: 'Pending',
    Date: '2022-01-04',
  },
  {
    id: 10,
    task: 'Workout',
    priority: 'High',
    status: 'Completed',
    Date: '2022-01-05',
  },
];

export default function TableDataGrid() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        checkboxSelection
      />
    </div>
  );
}
