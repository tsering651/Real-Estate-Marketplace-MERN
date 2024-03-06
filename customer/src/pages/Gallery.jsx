import backgroundImage from "./images/gallary.jpg";


export default function Gallery() {
  return (
    <div
      className="bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    > 
      <div>
        <h1>Gallery me hu m baby</h1>
      </div>
    </div>
  );
}