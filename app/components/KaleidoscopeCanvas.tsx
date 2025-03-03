'use client';

import { useRef, useEffect, useState } from 'react';

interface KaleidoscopeCanvasProps {
  symmetry: number;
  strokeColor: string;
  strokeWeight: number;
  backgroundColor: string;
}

const KaleidoscopeCanvas = ({
  symmetry = 6,
  strokeColor = '#FFFFFF',
  strokeWeight = 3,
  backgroundColor = '#323232'
}: KaleidoscopeCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [prevMousePos, setPrevMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        
        // Fill background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [backgroundColor]);
  
  const drawLine = (
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    angle: number,
    mirror: boolean = false
  ) => {
    ctx.save();
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
    ctx.rotate((angle * Math.PI) / 180);
    
    if (mirror) {
      ctx.scale(1, -1);
    }
    
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.restore();
  };
  
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - canvas.width / 2;
    const y = e.clientY - rect.top - canvas.height / 2;
    
    setPrevMousePos({ x, y });
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - canvas.width / 2;
    const y = e.clientY - rect.top - canvas.height / 2;
    
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWeight;
    ctx.lineCap = 'round';
    
    const angle = 360 / symmetry;
    
    for (let i = 0; i < symmetry; i++) {
      // Draw the main line
      drawLine(ctx, prevMousePos.x, prevMousePos.y, x, y, angle * i);
      
      // Draw the mirrored line
      drawLine(ctx, prevMousePos.x, prevMousePos.y, x, y, angle * i, true);
    }
    
    setPrevMousePos({ x, y });
  };
  
  const handleMouseUp = () => {
    setIsDrawing(false);
  };
  
  const handleMouseLeave = () => {
    setIsDrawing(false);
  };
  
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left - canvas.width / 2;
    const y = touch.clientY - rect.top - canvas.height / 2;
    
    setPrevMousePos({ x, y });
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left - canvas.width / 2;
    const y = touch.clientY - rect.top - canvas.height / 2;
    
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWeight;
    ctx.lineCap = 'round';
    
    const angle = 360 / symmetry;
    
    for (let i = 0; i < symmetry; i++) {
      // Draw the main line
      drawLine(ctx, prevMousePos.x, prevMousePos.y, x, y, angle * i);
      
      // Draw the mirrored line
      drawLine(ctx, prevMousePos.x, prevMousePos.y, x, y, angle * i, true);
    }
    
    setPrevMousePos({ x, y });
  };
  
  const handleTouchEnd = () => {
    setIsDrawing(false);
  };
  
  const saveImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = 'kaleidoscope-flower.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };
  
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
  
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full h-[500px] relative border border-gray-300 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full cursor-crosshair"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      </div>
      <div className="flex gap-4 mt-4">
        <button
          onClick={clearCanvas}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Clear Canvas
        </button>
        <button
          onClick={saveImage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Save Image
        </button>
      </div>
    </div>
  );
};

export default KaleidoscopeCanvas; 