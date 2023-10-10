import React from 'react';

function Limitations() {
  return (
    <div className="bg-pink-500 p-8 min-h-full flex flex-col items-center justify-center">
      <h2 className="text-2xl text-center font-extrabold text-white mb-6">Limitations of the Course Selector</h2>
      <ul className="list-disc pl-8 text-white text-lg mb-8">
        <li className="mb-3">The Course Selector does not consider course prerequisites.</li>
        <li className="mb-3">It does not have access to your academic bulletin to check course availability.</li>
        <li className="mb-3">The Course Selector is unaware of your past course history.</li>
      </ul>
 
      <div className="bg-white p-4 rounded-lg">
        <p className="text-black text-sm text-center">While the Course Selector is a valuable tool for academic planning, it's essential to be aware of its limitations. It cannot account for prerequisites, access your bulletin, or track your previous courses.</p>
      </div>
    </div>
  );
}

export default Limitations;
