import React, { useState } from 'react';
import axios from 'axios';

function Dashboard({ setModels }) {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('model', file);
    try {
      await axios.post('http://localhost:5000/api/models', formData);
      alert('Model uploaded successfully');
      setFile(null);
      const response = await axios.get('http://localhost:5000/api/models');
      setModels(response.data);
    } catch (error) {
      console.log('Error uploading model:', error);
      alert('Failed to upload model');
    }
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Upload GLB Model</h2>
      <input
        type="file"
        accept=".glb"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        disabled={!file}
      >
        Upload
      </button>
    </div>
  );
}

export default Dashboard;