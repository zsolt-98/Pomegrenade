import Input from "@/components/global/shared/Input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type GoalsData = {
  title: string;
  labels: string[];
  values: string[];
};

type GoalsTableProps = {
  data: GoalsData;
};

function EditGoalsModal({ data }: GoalsTableProps) {
  return (
    <div>
      {data.labels.map((label, i) => (
        <div key={label} className="flex items-center justify-between">
          <h4 className="font-semibold">{label}</h4>
          <div className="max-w-21 my-1.5">
            <Input
              type="number"
              className="text-tertiary"
              placeholder={data.values[i]}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

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
          <Dialog>
            <DialogTrigger className="bg-tertiary rounded-4xl text-tertiary-light px-3 py-1.5">
              Edit
            </DialogTrigger>
            <DialogContent className="bg-secondary-light text-primary-1 border-tertiary border-3">
              <DialogHeader>
                <DialogTitle className="border-b-1 border-tertiary pb-2 text-2xl">
                  Edit goals
                </DialogTitle>
              </DialogHeader>
              <EditGoalsModal data={data} />
              <div className="flex justify-end gap-2">
                <DialogClose className="bg-tertiary rounded-4xl text-tertiary-light px-3 py-1.5">
                  Cancel
                </DialogClose>
                <Button className="bg-tertiary rounded-4xl text-tertiary-light px-3 py-1.5">
                  Update
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
