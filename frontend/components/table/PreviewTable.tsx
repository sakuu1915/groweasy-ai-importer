"use client";

import { CsvRow } from "@/types/csv";

interface Props{
    data:CsvRow[];
}

export default function PreviewTable({data}:Props){

    if(data.length===0) return null;

    const columns=Object.keys(data[0]);

    return(

<div className="mt-10 overflow-hidden rounded-xl border bg-white">

<div className="overflow-auto max-h-[450px]">

<table className="min-w-full">

<thead className="sticky top-0 bg-slate-100">

<tr>

{columns.map((column)=>(

<th
key={column}
className="border-b px-4 py-3 text-left font-semibold"
>

{column}

</th>

))}

</tr>

</thead>

<tbody>

{data.slice(0,10).map((row,index)=>(

<tr
key={index}
className="hover:bg-slate-50"
>

{columns.map((column)=>(

<td
key={column}
className="border-b px-4 py-3 whitespace-nowrap"
>

{row[column]}

</td>

))}

</tr>

))}

</tbody>

</table>

</div>

</div>

    );

}