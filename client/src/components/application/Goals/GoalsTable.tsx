import { Button } from "@/components/ui/button";

type GoalsData = {
  title: string;
  labels: string[];
  values: string[];
};

type GoalsTableProps = {
  data: GoalsData;
};

export default function GoalsTable({ data }: GoalsTableProps) {
  return (
    <div className="w-[50%]">
      <div className="border-tertiary flex h-[52px] items-center justify-center border-b-2 py-2 leading-none">
        <h4 className="">{data.title}</h4>
      </div>
      <div className="p-2">
        {data.labels.map((label, i) => (
          <div key={label} className="flex items-center justify-between">
            <h4 className="">{label}</h4>
            <p className="">{data.values[i]}</p>
          </div>
        ))}
        <div className="mt-5 flex justify-end">
          <Button className="bg-tertiary rounded-4xl text-tertiary-light px-3 py-1.5">
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
