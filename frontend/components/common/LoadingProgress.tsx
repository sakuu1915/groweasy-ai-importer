"use client";

import { Progress } from "@/components/ui/progress";

interface Props{

progress:number;

}

export default function LoadingProgress({

progress,

}:Props){

return(

<div className="mt-8 rounded-xl border bg-white p-6">

<h3 className="font-semibold">

AI Processing...

</h3>

<p className="mt-2 text-sm text-slate-500">

Extracting CRM fields

</p>

<Progress
value={progress}
className="mt-5"
/>

<p className="mt-3 text-right text-sm">

{progress}%

</p>

</div>

);

}