
//import backgroundImage from "./images/photo-1592595896551-12b371d546d5.avif";
import backgroundImage from "./images/a.jpg";

export default function About() {
  return (
    <div
      className="bg-cover bg-center min-h-screen flex items-center justify-center "
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    > 
     
     {/* <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
     <source src={videoback} type="video/mp4" />
      </video> */}
      <div>
        <h1>hey baby</h1>
      </div>
    </div>
  );
}