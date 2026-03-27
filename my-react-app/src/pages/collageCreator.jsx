<<<<<<< HEAD
import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import CollageBox from '../components/collageBox.jsx';
import './collageCreator.css';

const GRID_SIZE = 20;
const BASE_WIDTH = 800;
const BASE_HEIGHT = 600;

export default function CollagePage() {
  const [rects, setRects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [stageSize, setStageSize] = useState({ width: BASE_WIDTH, height: BASE_HEIGHT, scale: 1 });
  
  const stageRef = useRef();
  const containerRef = useRef();

  // Handle Responsive Scaling
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newScale = containerWidth / BASE_WIDTH;
        if (newScale < 1) {
          setStageSize({
            width: containerWidth,
            height: BASE_HEIGHT * newScale,
            scale: newScale
          });
        } else {
          setStageSize({ width: BASE_WIDTH, height: BASE_HEIGHT, scale: 1 });
        }
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle Delete
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if the user is currently typing in an input or text area
      const isTyping = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT';
      
      if (!isTyping && (e.key === 'Backspace' || e.key === 'Delete') && selectedId) {
        setRects(prev => prev.filter(r => r.id !== selectedId));
        setSelectedId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId]);

  const addBox = () => {
    const id = `rect${Date.now()}`;
    setRects([...rects, { id, x: 40, y: 40, width: 140, height: 140, fill: '#000000', type: 'rect' }]);
    setSelectedId(id);
  };

  const addText = () => {
    const id = `text${Date.now()}`;
    setRects([...rects, { 
      id, x: 100, y: 100, text: 'NEW TEXT', fontSize: 40, 
      fontFamily: 'Arial', fill: '#000000', type: 'text' 
    }]);
    setSelectedId(id);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target.result;
        img.onload = () => {
          const scaleFactor = img.width > 500 ? 500 / img.width : 1;
          setRects(prev => [...prev, {
            id: `img${Date.now()}-${Math.random()}`,
            x: GRID_SIZE * 2, y: GRID_SIZE * 2,
            width: Math.round((img.width * scaleFactor) / GRID_SIZE) * GRID_SIZE,
            height: Math.round((img.height * scaleFactor) / GRID_SIZE) * GRID_SIZE,
            imageSrc: event.target.result,
            type: 'image'
          }]);
        };
      };
      reader.readAsDataURL(file);
    });
    e.target.value = null; 
  };

  const moveLayer = (direction) => {
    if (!selectedId) return;
    const index = rects.findIndex(r => r.id === selectedId);
    const newRects = [...rects];
    const element = newRects.splice(index, 1)[0];
    direction === 'front' ? newRects.push(element) : newRects.unshift(element);
    setRects(newRects);
  };

  const downloadPNG = () => {
    setSelectedId(null);
    requestAnimationFrame(() => {
      const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
      const customName = window.prompt("Name your collage:", "fashion-collage");
      if (customName) {
        const link = document.createElement('a');
        link.download = `${customName}.png`;
        link.href = uri;
        link.click();
      }
    });
  };

  const selectedItem = rects.find(r => r.id === selectedId);

  return (
    <div className="collage-app">
      <aside className="sidebar">
        <h2 className="sidebar-title">Editor</h2>
        
        <div className="tool-section">
          <label>Elements</label>
          <button className="secondary-btn" onClick={addBox}>+ Add Block</button>
          <button className="secondary-btn" onClick={addText}>+ Add Text</button>
        </div>

        <div className="tool-section">
          <label>Photos</label>
          <input type="file" id="file-upload" multiple accept="image/*" onChange={handleImageUpload} hidden />
          <label htmlFor="file-upload" className="upload-label">Upload Images</label>
        </div>

        <div className="tool-section">
          <label>Background</label>
          <div className="color-picker-wrapper">
             <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
             <span>{bgColor.toUpperCase()}</span>
          </div>
        </div>

        {selectedId && (
          <div className="tool-section selection-tools">
            <label>Arrangement</label>
            <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
              <button className="small-btn" onClick={() => moveLayer('front')}>Front</button>
              <button className="small-btn" onClick={() => moveLayer('back')}>Back</button>
            </div>

            {selectedItem?.type === 'text' && (
              <div className="text-edit-group">
                <label>Content</label>
                <input 
                  type="text" 
                  className="text-input"
                  value={selectedItem.text}
                  onChange={(e) => setRects(rects.map(r => r.id === selectedId ? {...r, text: e.target.value} : r))}
                />
                <div>
                  <label>Font</label>
                  <select 
                    className="font-select"
                    value={selectedItem.fontFamily}
                    onChange={(e) => setRects(rects.map(r => r.id === selectedId ? {...r, fontFamily: e.target.value} : r))}
                  >
                    <option value="Arial">Arial</option>
                    <option value="Courier New">Courier</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times</option>
                  </select>
                </div>
              </div>
            )}

            {!selectedItem?.imageSrc && (
               <div className="color-picker-wrapper">
                 <input 
                   type="color" 
                   value={selectedItem?.fill || '#000000'}
                   onChange={(e) => setRects(rects.map(r => r.id === selectedId ? {...r, fill: e.target.value} : r))} 
                 />
                 <span>Edit Color</span>
               </div>
            )}
            <button className="delete-btn" onClick={() => { setRects(rects.filter(r => r.id !== selectedId)); setSelectedId(null); }}>Delete</button>
          </div>
        )}

        <button onClick={downloadPNG} className="download-btn">Download PNG</button>
      </aside>

      <main className="canvas-area" ref={containerRef}>
        <div className="canvas-wrapper">
          <Stage 
            width={stageSize.width} height={stageSize.height} 
            scaleX={stageSize.scale} scaleY={stageSize.scale}
            ref={stageRef} className="canvas-stage"
            onMouseDown={(e) => e.target === e.target.getStage() && setSelectedId(null)}
          >
            <Layer>
              <Rect width={BASE_WIDTH} height={BASE_HEIGHT} fill={bgColor} />
              {rects.map((rect, i) => (
                <CollageBox
                  key={rect.id} shapeProps={rect}
                  isSelected={rect.id === selectedId}
                  onSelect={() => setSelectedId(rect.id)}
                  gridSize={GRID_SIZE}
                  onChange={(newAttrs) => {
                    const newList = [...rects];
                    newList[i] = newAttrs;
                    setRects(newList);
                  }}
                />
              ))}
            </Layer>
          </Stage>
        </div>
      </main>
=======
import React from 'react'; 
import "./collageCreator.css";

export default function CollagePage() {
  return (
    <div>
      <h1>This is the collage creator page</h1>
      <p>Start building your content here.</p>
>>>>>>> origin/jennifer_branch
    </div>
  );
}