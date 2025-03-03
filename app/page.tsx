'use client';

import { useState } from 'react';
import KaleidoscopeCanvas from './components/KaleidoscopeCanvas';
import DrawingControls from './components/DrawingControls';

export default function Home() {
  const [symmetry, setSymmetry] = useState(6);
  const [strokeColor, setStrokeColor] = useState('#FFFFFF');
  const [strokeWeight, setStrokeWeight] = useState(3);
  const [backgroundColor, setBackgroundColor] = useState('#323232');

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Kaleidoscope Flower Drawing
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <KaleidoscopeCanvas
              symmetry={symmetry}
              strokeColor={strokeColor}
              strokeWeight={strokeWeight}
              backgroundColor={backgroundColor}
            />
          </div>
          
          <div>
            <DrawingControls
              symmetry={symmetry}
              setSymmetry={setSymmetry}
              strokeColor={strokeColor}
              setStrokeColor={setStrokeColor}
              strokeWeight={strokeWeight}
              setStrokeWeight={setStrokeWeight}
              backgroundColor={backgroundColor}
              setBackgroundColor={setBackgroundColor}
            />
            
            <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">Instructions</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Click and drag to draw on the canvas</li>
                <li>Adjust symmetry to change the number of reflections</li>
                <li>Change colors and stroke weight using the controls</li>
                <li>Click "Save Image" to download your creation</li>
                <li>Click "Clear Canvas" to start over</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 