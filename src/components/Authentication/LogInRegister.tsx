import { Link } from "react-router";
import pomegrenadeLogo from "../../assets/pomegrenade-logo-tertiary-light-636x295px.png";

interface LogInRegisterProps {
  h2: string;
  content: JSX.Element;
}

export default function LogInRegister({ h2, content }: LogInRegisterProps) {
  return (
    <section className="bg-tertiary-light flex items-center py-20">
      <div className="container mx-auto flex max-w-7xl justify-center">
        <div className="">
          <div className="bg-secondary-light border-tertiary mx-5 flex max-w-[650px] flex-col items-center rounded-4xl border-3 p-10 md:p-20">
            <Link to="/" className="flex justify-center">
              <img src={pomegrenadeLogo} className="h-30" alt="" />
            </Link>
            <h2 className="text-primary-1 mb-10 inline-block text-center text-3xl font-semibold text-nowrap md:text-5xl">
              {h2}
            </h2>
            <div className="flex w-full max-w-[364px] flex-col items-center gap-3">
              {content}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
