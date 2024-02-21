import React, { useCallback, useState } from "react";

const ResizableBox: React.FC = () => {
  const [size, setSize] = useState({ width: 100, height: 100 });
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing) {
        // Рассчитываем новые размеры на основе движения мыши
        const newWidth =
          e.clientX - document.getElementById("resizable-box")!.offsetLeft;
        const newHeight =
          e.clientY - document.getElementById("resizable-box")!.offsetTop;
        setSize({ width: newWidth, height: newHeight });
      }
    },
    [isResizing]
  );

  // Добавляем и удаляем глобальные обработчики событий
  React.useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResizing);
    } else {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    }

    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing, resize, stopResizing]);

  return (
    <div
      id="resizable-box"
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        border: "2px solid black",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          cursor: "nwse-resize",
          width: "20px",
          height: "20px",
          backgroundColor: "red",
        }}
        onMouseDown={startResizing}
      />
    </div>
  );
};

export default ResizableBox;
