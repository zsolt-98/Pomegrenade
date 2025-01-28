import pomegrenadeLogo from "../assets/pomegrenade-logo-586x245px.png";

export default function Homepage() {
  return (
    <main className="bg-secondary-light h-screen w-full">
      <div className="bg-secondary-light container mx-auto h-full">
        <nav className="bg-tertiary h-32 w-full rounded-b-4xl">
          <img src={pomegrenadeLogo} className="h-full p-6" alt="" />
        </nav>
      </div>
    </main>
  );
}
