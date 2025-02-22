import bannerImg from "../../../assets/frame.png";

const Banner = () => {
  return (
    <section className="w-11/12 max-w-7xl lg:w-9/12 mx-auto my-20">
      <div className="flex items-center justify-between flex-col md:flex-row">
        {/* Image Section */}
        <div className="flex justify-center md:order-2">
          <img
            className="w-80 "
            src={bannerImg}
            width="326"
            height="290"
            alt="frame"
          />
        </div>

        {/* Text Section */}
        <div className="text-center md:text-left">
          <h1 className="mb-4 text-blue-500 text-4xl font-bold lg:text-5xl">
            Task management
          </h1>
          <p className="mb-6 text-lg text-gray-600">
            Effortlessly Organize, Prioritize, and Conquer Tasks with Tasker -
            Your Personal Productivity <br /> Ally for Seamless Goal Achievement
            and Stress-Free Task Management.
          </p>
          <button className="rounded-full bg-blue-500 px-6 py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-blue-600">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
