import Input from "@/components/global/shared/Input";
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
          <div className="rounded-4xl h-120 border-tertiary divide-tertiary bg-secondary-light flex items-center divide-y-2 border-2">
            <div className="w-50 h-50 bg-amber-500"></div>
            <div className="">
              <Input type="text" placeholder={userData ? userData.name : ""} />
              <Input
                type="email"
                placeholder={userData ? userData.email : ""}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
