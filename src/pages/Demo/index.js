import React, { useRef, useEffect } from 'react';
import { Graph, Node, Color, Addon } from '@antv/x6';
import { Button } from 'antd';
import styles from './index.less';

const Demo = () => {
  const containerRef = useRef();
  let graph = null;

  useEffect(() => {
    graph = new Graph({
      container: containerRef.current,
      grid: true,
      mousewheel: {
        // 画布缩放
        enabled: true,
        zoomAtMousePosition: true,
        modifiers: 'ctrl',
        minScale: 0.5,
        maxScale: 3,
      },
      highlighting: {
        // 高亮
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#5F95FF',
              stroke: '#5F95FF',
            },
          },
        },
      },
      resizing: true,
      rotating: true,
      selecting: {
        enabled: true,
        rubberband: true,
        showNodeSelectionBox: true,
      },
      snapline: true,
      keyboard: true,
      clipboard: true,
    });

    // #region 初始化 stencil
    const stencil = new Addon.Stencil({
      title: '流程图',
      target: graph,
      stencilGraphWidth: 200,
      stencilGraphHeight: 180,
      collapsable: true,
      groups: [
        {
          title: '基础流程图',
          name: 'group1',
        },
      ],
      layoutOptions: {
        columns: 2,
        columnWidth: 80,
        rowHeight: 55,
      },
    });
    document.getElementById('stencil').appendChild(stencil.container);

    const ports = {
      groups: {
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: 'red',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        right: {
          position: 'right',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: 'green',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        left: {
          position: 'left',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
      },
      items: [
        {
          group: 'top',
        },
        {
          group: 'right',
        },
        {
          group: 'bottom',
        },
        {
          group: 'left',
        },
      ],
    };

    Graph.registerNode(
      'custom-rect',
      {
        inherit: 'rect',
        width: 66,
        height: 36,
        attrs: {
          body: {
            strokeWidth: 1,
            stroke: '#5F95FF',
            fill: '#EFF4FF',
          },
          text: {
            fontSize: 12,
            fill: '#262626',
          },
        },
        ports: { ...ports },
      },
      true,
    );

    Graph.registerNode(
      'custom-polygon',
      {
        inherit: 'polygon',
        width: 66,
        height: 36,
        attrs: {
          body: {
            strokeWidth: 1,
            stroke: '#5F95FF',
            fill: '#EFF4FF',
          },
          text: {
            fontSize: 12,
            fill: '#262626',
          },
        },
        ports: {
          ...ports,
          items: [
            {
              group: 'top',
            },
            {
              group: 'bottom',
            },
          ],
        },
      },
      true,
    );

    Graph.registerNode(
      'custom-circle',
      {
        inherit: 'circle',
        width: 45,
        height: 45,
        attrs: {
          body: {
            strokeWidth: 1,
            stroke: '#5F95FF',
            fill: '#EFF4FF',
          },
          text: {
            fontSize: 12,
            fill: '#262626',
          },
        },
        ports: { ...ports },
      },
      true,
    );

    Graph.registerNode(
      'custom-image',
      {
        inherit: 'rect',
        width: 52,
        height: 52,
        markup: [
          {
            tagName: 'rect',
            selector: 'body',
          },
          {
            tagName: 'image',
          },
          {
            tagName: 'text',
            selector: 'label',
          },
        ],
        attrs: {
          body: {
            stroke: '#5F95FF',
            fill: '#5F95FF',
          },
          image: {
            width: 26,
            height: 26,
            refX: 13,
            refY: 16,
          },
          label: {
            refX: 3,
            refY: 2,
            textAnchor: 'left',
            textVerticalAnchor: 'top',
            fontSize: 12,
            fill: '#fff',
          },
        },
        ports: { ...ports },
      },
      true,
    );

    const r1 = graph.createNode({
      shape: 'custom-rect',
      attrs: {
        body: {
          rx: 6,
          ry: 6,
        },
      },
      label: '可选过程',
    });
    const r2 = graph.createNode({
      shape: 'custom-rect',
      attrs: {
        body: {
          rx: 6,
          ry: 6,
        },
      },
      label: '可选过程',
    });
    const r3 = graph.createNode({
      shape: 'custom-rect',
      attrs: {
        body: {
          rx: 6,
          ry: 6,
        },
      },
      label: '可选过程',
    });
    const r4 = graph.createNode({
      shape: 'custom-rect',
      attrs: {
        body: {
          rx: 6,
          ry: 6,
        },
      },
      label: '可选过程',
    });

    stencil.load([r1, r2, r3, r4], 'group1');

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
    console.log(containerRef, graph.toJSON());
  };
  // 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

  return (
    <div style={{ display: 'flex', padding: 24 }} className={styles.demo}>
      <div id="stencil" style={{ width: 300, position: 'relative' }}></div>
      <div
        ref={containerRef}
        style={{ height: 1000, flex: 1, border: '1px solid #e1e1e1' }}
      ></div>
      <div style={{ width: 300 }}>right</div>
    </div>
  );
};

export default Demo;
