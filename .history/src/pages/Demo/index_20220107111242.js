import React, { useRef, useEffect } from 'react';
import { Graph, Node, Color } from '@antv/x6';
import { Button } from 'antd';

const Demo = () => {
  const containerRef = useRef();
  let graph = null;

  useEffect(() => {
    graph = new Graph({
      container: containerRef.current,
      grid: true,
    });
    console.log(graph);

    const source = graph.addNode({
      x: 40,
      y: 40,
      width: 200,
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
      source.prop('attrs/body/fill', Color.randomHex());
      setTimeout(update, 1000);
    };

    update();

    console.log(graph.toJSON());
  }, []);

  const submit = () => {
    console.log(containerRef, graph);
  };

  return (
    <div style={{ display: 'flex', padding: 24 }}>
      <div style={{ width: 300 }}>
        <Button type="primary" onClick={submit}>
          点击
        </Button>
      </div>
      <div
        ref={containerRef}
        style={{ height: 1000, flex: 1, border: '1px solid #e1e1e1' }}
      ></div>
      <div style={{ width: 300 }}>right</div>
    </div>
  );
};

export default Demo;
