import React, { useRef } from 'react';
import { Graph, Node, Color } from '@antv/x6';

const Demo = () => {
  const containerRef = useRef();

  return (
    <div>
      <div>Demo</div>
      <div ref={containerRef}></div>
    </div>
  );
};

export default Demo;
