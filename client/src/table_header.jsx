import { flexRender } from "@tanstack/react-table";

export function table_header(header){
	return <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : (<div class="header" onClick={header.column.getToggleSortingHandler()}>
			{flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
			<span class="icon"> {{asc: '^', desc: 'v'}[header.column.getIsSorted()]??null}
		      	</span>
		      </div>)}
                </th>
}
