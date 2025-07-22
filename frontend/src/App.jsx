import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import ModelSelector from './components/ModelSelector';
import ModelViewer from './components/ModelViewer';

function App() {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/models')
      .then(response => {
        console.log('Fetched models:', response.data);
        setModels(response.data);
      })
      .catch(error => console.error('Error fetching models:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {selectedModel ? (
        <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center text-white bg-black">Loading model...</div>}>
          <div className="fixed inset-0 w-screen h-screen">
            <ModelViewer modelId={selectedModel} />
            <button
              onClick={() => setSelectedModel(null)}
              className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 z-10"
            >
              Back
            </button>
          </div>
        </Suspense>
      ) : (
        <div className="p-4 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-center">3D Model Viewer</h1>
          <Dashboard setModels={setModels} />
          <ModelSelector models={models} setSelectedModel={setSelectedModel} />
          {models.length === 0 && <p className="text-center text-gray-500">No models available</p>}
        </div>
      )}
    </div>
  );
}

export default App;