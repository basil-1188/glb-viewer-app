import React from 'react';

function ModelSelector({ models, setSelectedModel }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Select Model</h2>
      <select
        onChange={(e) => setSelectedModel(e.target.value)}
        className="p-2 border rounded w-full max-w-xs"
      >
        <option value="">Choose a model</option>
        {models.map(model => (
          <option key={model._id} value={model._id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ModelSelector;