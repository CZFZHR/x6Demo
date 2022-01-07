import React, { useRef, useEffect } from 'react';
import { Graph, Node, Color } from '@antv/x6';

const Demo = () => {
  const containerRef = useRef();

  useEffect(() => {
    const graph = new Graph({
      container: containerRef.current,
      grid: true,
    });
    console.log(graph);
    const source = graph.addNode({
      x: 40,
      y: 40,
      width: 100,
      height: 40,
      shape: 'circle',
      component: <div>Hello</div>,
    });

    const target = graph.addNode({
      shape: 'circle',
      x: 140,
      y: 160,
      width: 100,
      height: 40,
    });

    graph.addEdge({
      source,
      target,
    });

    const update = () => {
      target.prop('attrs/body/fill', Color.randomHex());
      setTimeout(update, 1000);
    };

    update();
  }, []);

  console.log(containerRef);

  return (
    <div>
      <div>Demo</div>
      <div ref={containerRef}></div>
    </div>
  );
};

export default Demo;
