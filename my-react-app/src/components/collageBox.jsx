import React, { useRef, useEffect } from 'react';
import { Rect, Image, Transformer, Text } from 'react-konva';
import useImage from 'use-image';

// This handles drawing either Text, an Image, or a Color Block on the screen
const CollageBox = ({ shapeProps, isSelected, onSelect, onChange, gridSize }) => {
  const shapeRef = useRef();
  const trRef = useRef();
  
  // Try to load the image. If there is no image source, it just returns null
  const [img] = useImage(shapeProps.imageSrc || '');

  // This effect runs whenever the selection changes
  // It tells the "Transformer" (the blue resize box) which item to grab
  useEffect(() => {
    if (isSelected) {
      const node = shapeRef.current;
      trRef.current.nodes([node]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  /**
   * This runs when you finish resizing a box
   * It calculates the new size and snaps it to the grid lines
   */
  const handleTransformEnd = () => {
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // Reset the scale back to 1
    // Makes the actual width and height change 
    node.scaleX(1);
    node.scaleY(1);

    // Calculate the new values and snap them to the grid
    const newX = Math.round(node.x() / gridSize) * gridSize;
    const newY = Math.round(node.y() / gridSize) * gridSize;
    const newWidth = Math.round((node.width() * scaleX) / gridSize) * gridSize;
    const newHeight = Math.round((node.height() * scaleY) / gridSize) * gridSize;

    // Send the updated data back to the main application
    onChange({
      ...shapeProps,
      x: newX,
      y: newY,
      width: Math.max(gridSize, newWidth),
      height: Math.max(gridSize, newHeight),
    });
  };

  // Properties that every single shape (Text, Rect, Image) needs 
  const commonProps = {
    ref: shapeRef,
    ...shapeProps,
    draggable: true,
    onClick: onSelect,
    onTap: onSelect,
    // This function ensures the box stays on the grid while you drag it
    dragBoundFunc: (pos) => {
      return {
        x: Math.round(pos.x / gridSize) * gridSize,
        y: Math.round(pos.y / gridSize) * gridSize,
      };
    },
    onTransformEnd: handleTransformEnd,
  };

  let content;

  if (shapeProps.type === 'text') {
    // Render the Text with all the custom styles
    content = (
      <Text 
        {...commonProps} 
        text={shapeProps.text} 
        fontSize={shapeProps.fontSize} 
        fontFamily={shapeProps.fontFamily} 
        fontStyle={shapeProps.fontStyle}
        textDecoration={shapeProps.textDecoration}
        fill={shapeProps.fill}
        width={shapeProps.width}
      />
    );
  } else if (shapeProps.imageSrc) {
    // Render an Image
    content = <Image image={img} {...commonProps} />;
  } else {
    // Render a plain Color Block 
    content = <Rect {...commonProps} />;
  }

  let enabledHandles;
  let shouldKeepRatio = false;

  if (shapeProps.type === 'text') {
    // Text usually only resizes left and right to change how words wrap
    enabledHandles = ['middle-left', 'middle-right'];
  } else if (shapeProps.type === 'image') {
    // Images should keep their proportions so they don't look squished
    enabledHandles = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    shouldKeepRatio = true;
  } else {
    // Regular blocks can be resized from any side
    enabledHandles = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center', 'left-center', 'right-center'];
  }

  return (
    <>
      {/* Display the content */}
      {content}
      
      {/* If the item is clicked, show the blue selection box (Transformer) */}
      {isSelected && (
        <Transformer
          ref={trRef}
          rotateEnabled={false}
          keepRatio={shouldKeepRatio}
          enabledAnchors={enabledHandles}
          // Snap the resize handles to the grid
          anchorDragBoundFunc={(oldPos, newPos) => {
            return {
              x: Math.round(newPos.x / gridSize) * gridSize,
              y: Math.round(newPos.y / gridSize) * gridSize,
            };
          }}
        />
      )}
    </>
  );
};

export default CollageBox;