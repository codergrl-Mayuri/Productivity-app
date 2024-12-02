import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const DraggableItem = ({ id, children, className }) => {
  const { attributes, listeners, setNodeRef, isDragging, transform, transition } = useDraggable({ id });

  // Add styles to position the item while it's being dragged
  const style = {
    transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
    transition: isDragging ? 'none' : transition,  // Remove transition during dragging
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}  // Add drag listeners to make the item draggable
      {...attributes} // Add accessibility attributes
      className={`${className} ${isDragging ? 'opacity-50' : ''}`}
      style={style}   // Apply the transform style to move the item
    >
      {children}
    </div>
  );
};

export default DraggableItem;
