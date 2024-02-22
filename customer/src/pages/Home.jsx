import videoback from "./images/video.mp4"
import backgroundImage from "./images/Property-.jpg";

export default function Home() {
  return (
    <div
      // className="bg-cover bg-center min-h-screen flex items-center justify-center "
      // style={{
      //   backgroundImage: `url(${backgroundImage})`,
      // }}
    > 
     
     <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
     <source src={videoback} type="video/mp4" />
      </video>
        <div className="absolute w-full h-full flex justify-center items-center text-black font-bold">
        <h1>Welcome to my website</h1>
      </div>
    </div>
  );
}
