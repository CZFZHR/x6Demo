import React, { useRef, useEffect } from 'react';
import { Graph, Node, Color } from '@antv/x6';

const Demo = () => {
  const containerRef = useRef();

  useEffect(() => {}, []);

  return (
    <div>
      <div>Demo</div>
      <div ref={containerRef}></div>
    </div>
  );
};

export default Demo;
