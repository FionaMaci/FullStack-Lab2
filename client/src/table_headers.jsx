import { table_header } from "./table_header.jsx"

export function table_headers(headerGroup){
	return	<tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
			table_header(header)
              ))}
            </tr>
}
