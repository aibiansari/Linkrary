"use client";
import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";
import { toast } from "sonner";

const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null); // Form reference

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const result = await emailjs.sendForm(
        "service_4wk6tem",
        "template_1qg9bsu",
        event.target as HTMLFormElement,
        "2K0y90IOnZ3BYCtYL"
      );
      console.log("Message sent successfully:", result.text);
      toast.success("Message sent successfully!");

      // Reset form fields
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.log("Message sending error:", error);
      toast.error("Message sending error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <form
        ref={formRef} // Attach ref to the form
        onSubmit={handleSubmit}
        className="flex flex-col items-center"
      >
        <div className="relative w-full max-w-4xl px-8">
          <label
            htmlFor="message"
            className="absolute -top-3 left-12 font-medium text-neutral-800 dark:text-slate-200 px-2 bg-white dark:bg-body transition-colors duration-300"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Write your message"
            autoComplete="off"
            rows={12}
            required
            className="w-full p-3 font-sans text-neutral-800 dark:text-neutral-400 placeholder:dark:text-neutral-600 bg-transparent border border-neutral-600 dark:border-slate-200 rounded-md shadow-lg shadow-black/35 transition-colors duration-300"
          ></textarea>
        </div>
        <div className="flex justify-center mt-4 mb-10">
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-sans md:w-48 py-2 px-6 rounded-md transition-colors duration-100 ${
              loading
                ? "bg-neutral-500 text-neutral-300 cursor-not-allowed"
                : "bg-neutral-800 text-white hover:bg-neutral-900 dark:bg-neutral-300 dark:font-medium dark:text-black dark:hover:bg-neutral-100"
            }`}
          >
            {loading ? "Please wait..." : "Send"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Contact;
