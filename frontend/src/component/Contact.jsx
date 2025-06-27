import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-gradient-to-br from-blue-50 via-white to-blue-100 shadow-2xl rounded-2xl border border-blue-200">
      <h2 className="text-4xl font-extrabold text-center mb-2 text-blue-800 drop-shadow">
        Contact Us
      </h2>
      <p className="text-center text-gray-600 mb-6">
        We'd love to hear from you! Fill out the form below and our team will
        get back to you soon.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-blue-900 mb-1"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-blue-900 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-blue-900 mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Type your message here..."
            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
            rows="5"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition"
        >
          Send Message
        </button>
      </form>
      <div className="mt-8 text-center text-sm text-blue-900/80">
        <div className="flex flex-col items-center gap-1">
          <span className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-blue-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M16 12a4 4 0 01-8 0V8a4 4 0 018 0v4z" />
              <path d="M12 16v2m0 0h-2m2 0h2" />
            </svg>
            support@evoting.gov.in
          </span>
          <span className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-blue-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm10-10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            1800-123-4567
          </span>
        </div>
      </div>
    </div>
  );
}
