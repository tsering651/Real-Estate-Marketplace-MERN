import backgroundImage from "./images/a.jpg";

export default function Home() {
  return (
    <div
      className="bg-cover bg-center min-h-screen flex items-center justify-center "
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    > </div>
  );
}