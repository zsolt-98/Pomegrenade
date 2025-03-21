import Input from "@/components/global/shared/Input";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/context/AppContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";

export default function User() {
  const { isLoggedin, isAuthLoading, userData } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthLoading && !isLoggedin) {
      navigate("/login");
    }
  });

  return (
    <main className="bg-tertiary-light relative flex w-full items-center justify-center overflow-hidden">
      <div className="container mx-auto flex max-w-7xl flex-col px-5 2xl:px-0">
        <div className="my-20 flex w-full flex-col gap-5">
          <div className="rounded-4xl border-tertiary bg-secondary-light h-100 flex items-center justify-around gap-10 border-2 px-20 py-10">
            <div className="flex flex-col items-center gap-5">
              <div className="w-50 h-50 rounded-full bg-amber-500"></div>
              <div className="bg-tertiary h-[2px] w-full"></div>
              <div className="[&>a]:hover:text-primary-1 text-tertiary flex flex-col font-medium">
                <a className="">About us</a>
                <a className="">Contact us</a>
                <a className="">Help center</a>
              </div>
            </div>
            <div className="bg-tertiary h-full w-[2px]"></div>
            <div className="text-primary-1 flex h-full min-w-80 flex-col justify-between gap-10">
              <h3 className="text-2xl font-semibold">Personal information</h3>
              <div className="flex w-full flex-col">
                <div className="w-full">
                  <p className="font-medium">First name:</p>
                  <Input type="text" value={userData ? userData.name : ""} />
                </div>
                <div className="mt-5">
                  <p className="font-medium">Email:</p>
                  <Input type="email" value={userData ? userData.email : ""} />
                </div>
                <div className="mt-5 flex justify-end gap-2">
                  <Button className="border-tertiary hover:bg-tertiary text-tertiary hover:text-secondary-light rounded-full border-2 bg-transparent text-sm font-medium">
                    Cancel
                  </Button>
                  <Button className="border-tertiary hover:bg-tertiary text-tertiary hover:text-secondary-light rounded-full border-2 bg-transparent text-sm font-medium">
                    Save changes
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-tertiary h-full w-[2px]"></div>

            <div className="text-primary-1 flex h-full flex-col justify-between gap-10">
              <h3 className="text-2xl font-semibold">Password</h3>
              <div className="">
                <p className="font-medium">Password</p>
                <Input type="password" value="************" />
                <div className="flex justify-end">
                  <Button className="border-tertiary hover:bg-tertiary text-tertiary hover:text-secondary-light mt-5 rounded-full border-2 bg-transparent text-sm font-medium">
                    Reset password
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
