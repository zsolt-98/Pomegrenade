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
import { AppContext } from "@/context/AppContext";
import { GoalsData } from "@/types";
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

type GoalsTableProps = {
  data: GoalsData;
  refetchGoals: () => void;
};

function EditGoalsModal({ data, refetchGoals }: GoalsTableProps) {
  const { backendUrl } = useContext(AppContext);
  const [formValues, setFormValues] = useState<Record<string, number>>(
    data.rawValues || {},
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key: string, value: string): void => {
    setFormValues((prev) => ({
      ...prev,
      [key]: Number(value),
    }));
  };

  const handleUpdate = async () => {
    setIsLoading(true);

    const endpointSuffix =
      data.title === "Weight Goals" ? "weight" : "nutrition";
    const endpoint = `${backendUrl}/api/goals/${endpointSuffix}`;

    try {
      const { data: response } = await axios.put(endpoint, formValues);

      if (response.success) {
        toast.success("Goals updated successfully!");
        refetchGoals();
      } else {
        toast.error(response.message || "Failed to update goals");
      }
    } catch (error) {
      console.error("Error updating goals:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        {data.rawValues &&
          Object.keys(data.rawValues).map((key, index) => (
            <div key={key} className="flex items-center justify-between">
              <h4 className="font-semibold">{data.labels[index]}</h4>
              <div className="max-w-21 my-1.5">
                <Input
                  type="number"
                  className="text-tertiary"
                  value={formValues[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-end gap-2">
        <DialogClose className="bg-tertiary rounded-4xl text-tertiary-light px-3 py-1.5">
          Cancel
        </DialogClose>
        <Button
          className="bg-tertiary rounded-4xl text-tertiary-light px-3 py-1.5"
          onClick={handleUpdate}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </div>
    </>
  );
}

export default function GoalsTable({ data, refetchGoals }: GoalsTableProps) {
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
              <EditGoalsModal data={data} refetchGoals={refetchGoals} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
