import React, { useState } from 'react';

const ShoppingList = ({ items, onRemoveItem, onUpdateItem, onClearList, onPrintList }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editMeasure, setEditMeasure] = useState('');

  const handleEdit = (index, currentMeasure) => {
    setEditingIndex(index);
    setEditMeasure(currentMeasure);
  };

  const handleSave = (index) => {
    onUpdateItem(index, { measure: editMeasure });
    setEditingIndex(null);
    setEditMeasure('');
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditMeasure('');
  };

  const toggleChecked = (index) => {
    const item = items[index];
    onUpdateItem(index, { checked: !item.checked });
  };

  const checkedItems = items.filter(item => item.checked);
  const uncheckedItems = items.filter(item => !item.checked);

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
          Your shopping list is empty!
        </div>
        <p className="text-gray-600 dark:text-gray-500">
          Add ingredients from recipe details to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Shopping List ({items.length} items)
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onPrintList}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            🖨️ Print List
          </button>
          <button
            onClick={onClearList}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            🗑️ Clear All
          </button>
        </div>
      </div>

      {/* Unchecked Items */}
      {uncheckedItems.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            To Buy ({uncheckedItems.length})
          </h3>
          <div className="space-y-2">
            {uncheckedItems.map((item, originalIndex) => {
              const globalIndex = items.findIndex(i => i === item);
              return (
                <div key={globalIndex} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <input
                    type="checkbox"
                    checked={item.checked || false}
                    onChange={() => toggleChecked(globalIndex)}
                    className="w-5 h-5 text-orange-500 rounded focus:ring-orange-400"
                  />
                  
                  <div className="flex-1">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {item.ingredient}
                    </span>
                    {editingIndex === globalIndex ? (
                      <div className="flex gap-2 mt-1">
                        <input
                          type="text"
                          value={editMeasure}
                          onChange={(e) => setEditMeasure(e.target.value)}
                          className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Enter quantity..."
                        />
                        <button
                          onClick={() => handleSave(globalIndex)}
                          className="px-2 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-2 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        {item.measure && (
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {item.measure}
                          </span>
                        )}
                        <button
                          onClick={() => handleEdit(globalIndex, item.measure || '')}
                          className="text-xs text-blue-500 hover:text-blue-600"
                        >
                          ✏️ Edit
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => onRemoveItem(globalIndex)}
                    className="p-1 text-red-500 hover:text-red-600 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Checked Items */}
      {checkedItems.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Purchased ({checkedItems.length})
          </h3>
          <div className="space-y-2 opacity-60">
            {checkedItems.map((item, originalIndex) => {
              const globalIndex = items.findIndex(i => i === item);
              return (
                <div key={globalIndex} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <input
                    type="checkbox"
                    checked={true}
                    onChange={() => toggleChecked(globalIndex)}
                    className="w-5 h-5 text-orange-500 rounded focus:ring-orange-400"
                  />
                  <div className="flex-1">
                    <span className="font-medium text-gray-900 dark:text-white line-through">
                      {item.ingredient}
                    </span>
                    {item.measure && (
                      <div className="text-sm text-gray-600 dark:text-gray-400 line-through">
                        {item.measure}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => onRemoveItem(globalIndex)}
                    className="p-1 text-red-500 hover:text-red-600 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingList;