import pomegrenadeLogo from "../assets/pomegrenade-logo-tertiary-light-text-590x590px.png";

export default function Footer() {
  return (
    <footer className="bg-tertiary h-screen">
      <div className="container mx-auto flex max-w-7xl flex-col items-start justify-center py-20 text-center">
        <img src={pomegrenadeLogo} className="h-30" alt="Pomegrenade logo" />
      </div>
    </footer>
  );
}
