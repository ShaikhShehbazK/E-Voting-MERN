import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Step 1: Register or Log In",
      desc: "Create an account or log in with your voter ID credentials.",
    },
    {
      title: "Step 2: View Candidates",
      desc: "See the list of approved candidates with party symbols and images.",
    },
    {
      title: "Step 3: Cast Your Vote",
      desc: "Choose your candidate and submit your vote. You can vote only once.",
    },
    {
      title: "Step 4: View Results",
      desc: "Once voting ends, you can view the results in the Results section.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-gradient-to-br from-blue-50 via-white to-blue-100 shadow-2xl rounded-2xl border border-blue-200">
      <h2 className="text-4xl font-extrabold text-center mb-4 text-blue-800 drop-shadow">
        How It Works
      </h2>
      <p className="text-center text-gray-600 mb-8 text-lg">
        Follow these simple steps to cast your vote securely and easily.
      </p>
      <ol className="relative border-l-2 border-blue-300 pl-6 space-y-0">
        {steps.map((step, index) => (
          <li key={index} className="mb-10 ml-4 flex items-start group">
            <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full shadow-lg ring-4 ring-blue-200 group-hover:bg-blue-700 transition text-2xl font-bold -ml-16 mr-6">
              {index + 1}
            </span>
            <div>
              <h3 className="text-2xl font-semibold text-blue-800 mb-1 group-hover:underline transition">
                {step.title}
              </h3>
              <p className="text-gray-700 text-base">{step.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
