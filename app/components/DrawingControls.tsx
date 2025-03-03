'use client';

import { useState } from 'react';

interface DrawingControlsProps {
  symmetry: number;
  setSymmetry: (value: number) => void;
  strokeColor: string;
  setStrokeColor: (value: string) => void;
  strokeWeight: number;
  setStrokeWeight: (value: number) => void;
  backgroundColor: string;
  setBackgroundColor: (value: string) => void;
}

const DrawingControls = ({
  symmetry,
  setSymmetry,
  strokeColor,
  setStrokeColor,
  strokeWeight,
  setStrokeWeight,
  backgroundColor,
  setBackgroundColor
}: DrawingControlsProps) => {
  const colorOptions = [
    '#FFFFFF', // White
    '#FF0000', // Red
    '#00FF00', // Green
    '#0000FF', // Blue
    '#FFFF00', // Yellow
    '#FF00FF', // Magenta
    '#00FFFF', // Cyan
    '#FFA500', // Orange
    '#800080', // Purple
    '#FFC0CB', // Pink
  ];

  const backgroundOptions = [
    '#323232', // Dark gray
    '#000000', // Black
    '#FFFFFF', // White
    '#0A0A2A', // Dark blue
    '#2A0A0A', // Dark red
    '#0A2A0A', // Dark green
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Drawing Controls</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Symmetry: {symmetry}</label>
        <input
          type="range"
          min="2"
          max="24"
          value={symmetry}
          onChange={(e) => setSymmetry(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Stroke Weight: {strokeWeight}px</label>
        <input
          type="range"
          min="1"
          max="10"
          value={strokeWeight}
          onChange={(e) => setStrokeWeight(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Stroke Color</label>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-full border ${
                strokeColor === color ? 'border-2 border-black' : 'border-gray-300'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setStrokeColor(color)}
              aria-label={`Select ${color} color`}
            />
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Background Color</label>
        <div className="flex flex-wrap gap-2">
          {backgroundOptions.map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-full border ${
                backgroundColor === color ? 'border-2 border-black' : 'border-gray-300'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setBackgroundColor(color)}
              aria-label={`Select ${color} background`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrawingControls; 