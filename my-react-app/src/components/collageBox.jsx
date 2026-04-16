import React, { useRef, useEffect } from 'react';
import { Group, Rect, Image, Transformer, Text } from 'react-konva';
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
    const baseWidth = shapeProps.width || node.width();
    const baseHeight = shapeProps.height || node.height();

    // Reset the scale back to 1
    // Makes the actual width and height change 
    node.scaleX(1);
    node.scaleY(1);

    // Calculate the new values and snap them to the grid
    const newX = Math.round(node.x() / gridSize) * gridSize;
    const newY = Math.round(node.y() / gridSize) * gridSize;
    const newWidth = Math.round((baseWidth * scaleX) / gridSize) * gridSize;
    const newHeight = Math.round((baseHeight * scaleY) / gridSize) * gridSize;

    if (shapeProps.type === 'text') {
      const nextWidth = Math.max(gridSize * 4, newWidth);
      const nextFontSize = Math.max(12, Math.round(shapeProps.fontSize * scaleY));

      onChange({
        ...shapeProps,
        x: newX,
        y: newY,
        width: nextWidth,
        fontSize: nextFontSize,
      });
      return;
    }

    if (shapeProps.type === 'swatchCard') {
      onChange({
        ...shapeProps,
        x: newX,
        y: newY,
        width: Math.max(gridSize * 6, newWidth),
        height: Math.max(gridSize * 8, newHeight),
      });
      return;
    }

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
  } else if (shapeProps.type === 'swatchCard') {
    const swatchHeight = Math.round(shapeProps.height * 0.72);
    const labelHeight = shapeProps.height - swatchHeight;
    const paddingX = Math.max(10, Math.round(shapeProps.width * 0.06));

    content = (
      <Group {...commonProps}>
        <Rect
          width={shapeProps.width}
          height={shapeProps.height}
          fill="#ffffff"
          opacity={0.001}
        />
        <Rect
          listening={false}
          width={shapeProps.width}
          height={swatchHeight}
          fill={shapeProps.fill}
        />
        <Rect
          listening={false}
          y={swatchHeight}
          width={shapeProps.width}
          height={labelHeight}
          fill="#ffffff"
        />
        <Text
          listening={false}
          x={paddingX}
          y={swatchHeight + Math.max(10, Math.round(labelHeight * 0.14))}
          text="PANTONE®"
          fontFamily="Arial"
          fontStyle="bold"
          fontSize={Math.max(18, Math.round(shapeProps.width * 0.12))}
          fill="#111111"
        />
        <Text
          listening={false}
          x={paddingX}
          y={swatchHeight + Math.max(34, Math.round(labelHeight * 0.42))}
          text={shapeProps.hex}
          fontFamily="Arial"
          fontSize={Math.max(12, Math.round(shapeProps.width * 0.07))}
          fill="#111111"
        />
        <Text
          listening={false}
          x={paddingX}
          y={swatchHeight + Math.max(52, Math.round(labelHeight * 0.64))}
          text={shapeProps.name}
          fontFamily="Arial"
          fontStyle="bold"
          fontSize={Math.max(14, Math.round(shapeProps.width * 0.085))}
          fill="#111111"
          width={Math.max(40, shapeProps.width - paddingX * 2)}
        />
      </Group>
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
    // Horizontal dragging changes wrapping; corner dragging also scales the text size
    enabledHandles = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'middle-left', 'middle-right'];
  } else if (shapeProps.type === 'swatchCard') {
    enabledHandles = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center', 'left-center', 'right-center'];
  } else if (shapeProps.type === 'image') {
    // Images can be resized from corners or sides for freer collage layouts
    enabledHandles = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center', 'left-center', 'right-center'];
    shouldKeepRatio = false;
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
