'use client';

import { useEffect, useState } from 'react';


export default function Gemini() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [response, setResponse] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobDescription.trim()) return;

    setLoadingResponse(true);
    setResponse('');

    try {
      const res = await fetch('/api/auth/gemini/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobDescription }),
      });

      const data = await res.json();
      setResponse(data.html || '<p>No response from Gemini.</p>');
    } catch (error) {
      console.error('Error sending message:', error);
      setResponse('<p>Error getting response from Gemini.</p>');
    } finally {
      setLoadingResponse(false);
    }
  };

 
  return (
    <main className=" p-8 flex flex-col lg:flex-row  gap-4  w-900px  position-relative top-5">
      <section className=" mx-auto mb-8 bg-white  flex flex-col">
     <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full mx-auto">
          <label htmlFor="jobDescription" className="block text-gray-700 font-semibold text-lg">
            Enter Job Description
          </label>
         <textarea
  id="jobDescription"
  value={jobDescription}
  onChange={(e) => {
    setJobDescription(e.target.value);
    e.target.style.height = 'auto';  
    e.target.style.height = e.target.scrollHeight + 'px';  
  }}
  placeholder="Paste the full job description here..."
  className="w-full border border-gray-300 rounded-md p-4 max-h-[70vh] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
  disabled={loadingResponse}
/>

          <button
            type="submit"
            disabled={loadingResponse}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#6A38C2] px-6 py-2 text-white font-semibold hover:bg-[#6A38C2] transition disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loadingResponse && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            )}
            {loadingResponse ? 'Analyzing...' : 'Analyze Job Description'}
          </button>
        </form>
      </section>

    {response && (
 <section className="w-full  mx-auto" style={{  overflow:'visible'}}>
  <iframe
    title="Gemini Resume Output"
    srcDoc={response}
    sandbox="allow-scripts allow-same-origin"
    style={{ width: "100%", height: '100%', border: '1px solid #ccc', borderRadius: '8px',overflow:'visible' ,backgroundColor:'white'}}
  />
</section>


)}

    </main>
  );
}
