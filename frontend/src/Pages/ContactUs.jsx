import React, { useState } from 'react';
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      setResponseMessage('Message sent successfully!');
      setFormData({ name: '', email: '', phoneNumber: '', message: '' });
    } catch (error) {
      console.error(error);
      setResponseMessage('Failed to send message.');
    }
  };

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-teal-600 font-semibold">Contact Us</span>
            <h2 className="mt-2 text-4xl font-bold text-gray-900">
              We’d love to hear from you
            </h2>
            <p className="mt-4 text-gray-600">
              Please reach out with your queries or feedback. We're here to help.
            </p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                rows="4"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-300"
              >
                Send Message
              </button>
            </form>
            {responseMessage && (
              <p
                className={`mt-4 text-center ${
                  responseMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {responseMessage}
              </p>
            )}
          </div>
          <div>
            <img
              src="../../../assets/contact.jpg"
              alt="Contact Us"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;