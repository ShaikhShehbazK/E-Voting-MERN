import React from "react";

const faqs = [
  {
    question: "Who can vote on this platform?",
    answer:
      "Only registered users with valid login credentials and voter IDs are allowed to vote.",
  },
  {
    question: "Can I vote more than once?",
    answer:
      "No. Each user is allowed to vote only once. After voting, your status will be locked.",
  },
  {
    question: "Is my vote anonymous?",
    answer:
      "Yes. Your vote is recorded securely without linking it to your personal identity.",
  },
  {
    question: "How do I know my vote was counted?",
    answer:
      "After submitting your vote, a confirmation message will be shown, and your status will change to 'Voted'.",
  },
  {
    question: "Can I change my vote after submitting?",
    answer: "No. Once a vote is submitted, it cannot be changed or reversed.",
  },
  {
    question: "Is the platform secure?",
    answer:
      "Yes. We use encrypted connections and session-based access to protect your data and ensure vote integrity.",
  },
];

export default function FAQ() {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Frequently Asked Questions
      </h2>

      {faqs.map((faq, index) => (
        <details
          key={index}
          className="mb-4 border rounded-lg p-4 cursor-pointer open:bg-gray-50"
        >
          <summary className="font-medium text-lg text-blue-700">
            {faq.question}
          </summary>
          <p className="mt-2 text-gray-700">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
