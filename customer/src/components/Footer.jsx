

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <a href="/" className="text-xl font-bold text-white hover:text-gray-400">
            TVA Group
          </a>
          <p className="mt-4 text-base text-gray-400 sm:mt-0">
            © {new Date().getFullYear()} TVA Group . All rights reserved.
          </p>
        </div>

        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-gray-300">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;