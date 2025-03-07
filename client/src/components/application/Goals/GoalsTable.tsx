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
      <div className="border-tertiary h-[52px] border-b-2 py-2 leading-none">
        <h4 className="">{data.title}</h4>
      </div>
      <div className="p-2">
        {data.labels.map((label, i) => (
          <div key={label} className="flex items-center justify-between">
            <h4 className="">{label}</h4>
            <p className="">{data.values[i]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
