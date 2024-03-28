import backgroundImage from "./images/home.jpg";

export default function Home() {
  return (
    <div
      className="bg-cover bg-bottom min-h-screen flex items-center justify-center "
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
    </div>
  );
}





