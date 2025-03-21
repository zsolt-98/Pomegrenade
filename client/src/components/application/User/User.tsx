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
          <div className="rounded-4xl h-120 border-tertiary bg-secondary-light flex items-center justify-between gap-10 border-2 px-20">
            <div className="flex flex-col items-center gap-10">
              <div className="w-50 h-50 rounded-full bg-amber-500"></div>
              <div className="[&>a]:hover:text-primary-1 flex flex-col">
                <a className="">About us</a>
                <a className="">Contact us</a>
                <a className="">Help center</a>
              </div>
            </div>

            <div className="">
              <Input type="text" placeholder={userData ? userData.name : ""} />
              <Input
                type="email"
                placeholder={userData ? userData.email : ""}
              />
            </div>
            <div className="">
              <Button>Reset password</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
