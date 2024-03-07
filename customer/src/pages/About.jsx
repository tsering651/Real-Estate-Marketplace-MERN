import backgroundImage from "./images/about.jpg";

export default function About() {
  return (
    <div
      className="bg-cover bg-center min-h-screen flex items-center justify-center "
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="py-20 px-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-white">About TVA Group</h1>
        <p className="mb-4 text-white">
          One of the top real estate companies, TVA Group, focuses on assisting
          customers in purchasing, renting out, and selling real estate in the
          most sought-after areas. Our seasoned team of agents is committed to
          provide outstanding customer service and facilitating a seamless
          buying and selling process.
        </p>
        <p className="mb-4 text-white">
          Our purpose is to assist our customers in reaching their real estate
          objectives by offering knowledgeable counsel, individualised
          attention, and in-depth knowledge of the regional real estate market.
          We can assist you at any stage of the process, whether you're wanting
          to purchase, sell, or rent a property.
        </p>
        <p className="mb-4 text-white">
          Our team of agents is dedicated to giving our clients the best
          possible service, and we have a plethora of real estate industry
          expertise and knowledge. We are committed to making it a reality for
          each and every one of our clients because we think that purchasing or
          selling a property should be an exciting and fulfilling process.
        </p>
      </div>
    </div>
  );
}
