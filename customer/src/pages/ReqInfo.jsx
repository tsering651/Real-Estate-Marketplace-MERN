import React from 'react'
import { useState } from 'react'
import backgroundImage from "./images/req.jpg";
import { useNavigate } from 'react-router-dom';

function ReqInfo() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        subject: '',
        message: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch("/api/information/send-info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log(data);
            if (data.success === false) {
                setLoading(false);
                setError(data.message);
                return;
            }
            setLoading(false);
            setError(null);
            navigate("/");
            // Show alert for successful data submission
            window.alert("Data sent successfully!");
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };
    
      
  return (
    <div
    className="bg-cover bg-top min-h-screen flex items-center justify-center "
    style={{
      backgroundImage: `url(${backgroundImage})`,
    }}
    >
    <div className="max-w-lg mx-auto w-[27%] p-8 mt-[6%] mr-[8%] backdrop-blur-md rounded-3xl border shadow-2xl">
    <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          id="name"
          name="name"
          placeholder='Name'
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <input
          type="email"
          id="email"
          name="email"
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <input
          type="tel"
          id="contact"
          name="contact"
          placeholder='Contact No.'
          value={formData.contact}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          id="subject"
          name="subject"
          placeholder='Subject'
          value={formData.subject}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <textarea
          id="message"
          name="message"
          placeholder='Write your query'
          value={formData.message}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full h-32 focus:outline-none focus:border-blue-500"
          required
        ></textarea>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-700 text-white p-2 w-full rounded hover:bg-opacity-75"
        >
          Submit
        </button>
      </div>

    </form>
  </div>
  </div>
  )
}

export default ReqInfo


