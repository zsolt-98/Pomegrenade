import { Link } from "react-router";
import pomegrenadeLogo from "../../assets/pomegrenade-logo-tertiary-light-636x295px.png";

interface AuthLayoutProps {
  h2: string;
  content: JSX.Element;
}

export default function AuthLayout({ h2, content }: AuthLayoutProps) {
  return (
    <section className="bg-tertiary-light flex items-center py-20">
      <div className="container mx-auto flex w-full max-w-7xl justify-center px-5">
        <div className="bg-secondary-light border-tertiary rounded-4xl border-3 flex w-full max-w-[650px] flex-col items-center p-5 md:p-20">
          <Link to="/" className="outline-tertiary flex justify-center">
            <img src={pomegrenadeLogo} className="md:h-30 h-20" alt="" />
          </Link>
          <h2 className="text-primary-1 mb-10 inline-block text-nowrap text-center text-2xl font-semibold md:text-5xl">
            {h2}
          </h2>
          {content}
        </div>
      </div>
    </section>
  );
}
