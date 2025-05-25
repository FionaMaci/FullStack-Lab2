import React, { useEffect, useState } from 'react'
import './App.css'
import { createColumnHelper, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { getCoreRowModel } from '@tanstack/react-table'
import { table_row } from "./table_row.jsx"
import { table_headers } from "./table_headers.jsx"

const helper = createColumnHelper()

const columns =[
	helper.accessor('Employee_ID', {
			header: () => <span>Employee ID </span>,
		}),
		helper.accessor('Employee_name', {
			header: () => <span>Employee name </span>
		}),
		helper.accessor('Project_name', {
			header: () => <span>Project name </span>
		}),
		helper.accessor('start_date', {
			header: () => <span>Start date </span>
		})
]

function App() {

	const [data, setData] = useState([])


	const fetchData = () => {
		fetch("http://localhost:8080/api/project_assignments")
			.then(data => data.json())
			.then(data => setData(data))
			.catch(err => {console.log("Chould not fetch Data")})
	}


	useEffect(() => {
		fetchData()
		const interval = setInterval(fetchData, 60000);
		return () => clearInterval(interval)
	}, [])


	const [sorting, setSorting] = React.useState([])


	const table = useReactTable({
		columns,
		data,
		state: {
			sorting
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	})

	
 	return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
		table_headers(headerGroup)
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
		table_row(row)
          ))}
        </tbody>
      </table>
      <div className="h-4" />
      <button onClick={() => fetchData()} className="border p-2">
        Refresh
      </button>
    </div>
  )
}

export default App
