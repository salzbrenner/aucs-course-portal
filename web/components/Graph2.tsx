import * as d3 from 'd3';
import React from 'react';
import {
  Simulation,
  SimulationLinkDatum,
  SimulationNodeDatum,
} from 'd3';
import { colors, jsBreakpoints } from './GlobalStyles';
import Node from './Node';
import TreePath from './TreePath';
import { AppContext } from '../state';
import CoursePopup from './CoursePopup';

interface NodeDatum extends SimulationNodeDatum {
  name: string;
  id: number;
}

const updateNode = (selection: any) => {
  selection.attr('transform', (d: any) => {
    if (d.x) {
      return 'translate(' + d.x + ',' + d.y + ')';
    }
  });
};

const updatePath = (selection: any) => {
  selection
    .attr('x1', (d: any) => d.source.x)
    .attr('y1', (d: any) => d.source.y)
    .attr('x2', (d: any) => d.target.x)
    .attr('y2', (d: any) => d.target.y);
};

const updateGraph = (selection: any) => {
  selection.selectAll('.node').call(updateNode);
  selection.selectAll('.tree-path').call(updatePath);
};

export interface GraphProps {
  paths: SimulationLinkDatum<NodeDatum>[];
  data: NodeDatum[];
}

class Graph2 extends React.Component<GraphProps> {
  static contextType = AppContext;
  wrapper: any;
  d3Graph: any;
  simulation: Simulation<
    NodeDatum,
    SimulationLinkDatum<NodeDatum>
  > | null = null;

  state = {
    width: 0,
    height: 0,
    circleRadius: 20,
    linkDistance: 100,
    simulation: null,
    pathColor: colors.gray1,
  };

  constructor(props: any) {
    super(props);
    this.wrapper = React.createRef();
    this.updateSimulation = this.updateSimulation.bind(
      this
    );
  }

  getQuads(containerEl: any): number[][] {
    const q1x = containerEl.width * 0.1;
    const q2x = containerEl.width * 0.5;
    const q3x = containerEl.width * 1.1;

    const q1y = containerEl.height * 0.1;
    const q2y = containerEl.height * 0.25;
    const q3y = containerEl.height * 0.5;
    const q4y = containerEl.height;
    const q5y = containerEl.height * 1.15;

    const xQ = [q1x, q2x, q3x];
    const yQ = [q1y, q2y, q3y];

    // prettier-ignore
    return [
      [q1x, q1y], [q2x, q1y], [q3x, q1y],
      [q1x, q2y], [q2x, q2y], [q3x, q2y],
      [q1x, q3y], [q2x, q3y], [q3x, q3y],
      [q1x, q4y], [q2x, q4y], [q3x, q4y],
      [q1x, q5y], [q2x, q5y], [q3x, q5y],
    ]
  }

  setSimulation() {
    const { data, paths } = this.props;

    return d3
      .forceSimulation(data)
      .force(
        'link',
        d3
          .forceLink(paths)
          .id((d: any) => d.id)
          .distance(this.state.linkDistance)
      )
      .force('collide', d3.forceCollide(40).iterations(10))
      .alpha(0.3)
      .restart();
  }

  setRootedNodes(containerEl: any): void {
    const { data, paths } = this.props;

    const xCenter = containerEl.width / 2;
    const yCenter = containerEl.height / 2;

    const node0Offset = containerEl.width * 0.2;
    const node0yOffset = yCenter * 0.15;

    const rootNode = data.filter(
      node => node.id === 1213
    )[0];
    const rootNode2 = data.filter(
      node => node.id === 3243
    )[0];

    const ethicsNode = data.filter(
      node => node.id === 4733
    )[0];

    rootNode.fx = node0Offset;
    rootNode.fy = node0yOffset;
    rootNode2.fx = xCenter * 1.5;
    rootNode2.fy = node0yOffset;
  }

  addNodeEvents() {
    const dragStarted = (d: any) => {
      if (!d3.event.active) {
        this.simulation!.alphaTarget(0.3).restart();
      }
      d.fx = d.x;
      d.fy = d.y;
    };

    const dragging = (d: any) => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    };

    const dragEnded = (d: any) => {
      if (!d3.event.active) this.simulation!.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    };

    d3.selectAll('g.node').call(
      d3
        .drag<any, any>()
        .on('start', dragStarted)
        .on('drag', dragging)
        .on('end', dragEnded)
    );
  }

  componentDidMount() {
    const containerEl = this.wrapper.current.parentNode.getBoundingClientRect();
    this.setState({
      width: containerEl.width,
      height: containerEl.height,
    });

    this.d3Graph = d3.select(this.wrapper.current);
    this.simulation = this.setSimulation();
    this.addNodeEvents();

    this.simulation.on('tick', () => {
      this.d3Graph.call(updateGraph);
    });

    this.setRootedNodes(containerEl);

    this.updateSimulation();

    window.addEventListener(
      'resize',
      this.updateSimulation
    );
  }

  componentWillUnmount(): void {
    window.removeEventListener(
      'resize',
      this.updateSimulation
    );

    this.simulation!.on('tick', null);
    this.d3Graph = null;
    this.simulation = null;

    d3.selectAll('g.node').call(
      d3
        .drag<any, any>()
        .on('start', null)
        .on('drag', null)
        .on('end', null)
    );
  }

  updateSimulation(): void {
    const containerEl = this.wrapper.current.parentNode.getBoundingClientRect();

    this.setState(
      {
        width: containerEl.width,
        height: containerEl.height,
        circleRadius:
          window.innerWidth < jsBreakpoints.md ? 10 : 20,
        linkDistance:
          window.innerWidth < jsBreakpoints.md ? 20 : 100,
      },
      () => {
        const quadrants = this.getQuads(containerEl);
        const xCenter = containerEl.width / 2;
        const yCenter = containerEl.height / 2;

        this.setRootedNodes(containerEl);

        this.simulation! //@ts-ignore
          .force(
            'columnX',
            d3.forceX(
              //@ts-ignore
              n => quadrants[n.position][0]
            )
          )
          .force(
            'columnY',
            //@ts-ignore
            d3.forceY(
              //@ts-ignore
              n => quadrants[n.position][1] * 1.15
            )
          )
          .force('center', d3.forceCenter(xCenter, yCenter))
          .alpha(0.3)
          .restart();
      }
    );
  }

  getPsOfNode(id: number) {
    const { data, paths } = this.props;
    const nodesLinks = paths
      .filter(link => {
        return link.target === id;
      })
      .map(link => link.source);
    return nodesLinks;
  }

  render() {
    const { data, paths } = this.props;
    const { circleRadius, width, height } = this.state;
    const [{ user, coursePopup, courses }] = this.context;

    const mappedLinks = paths.map((path, index) => {
      let color = this.state.pathColor;
      if (user.votes[path.source as number]) {
        color = colors.primary;
      }

      return (
        <TreePath key={index} data={path} color={color} />
      );
    });
    const nodes = data.map(node => {
      let color = colors.primary;
      let fill = false;

      if (!user.name) {
        fill = true;
      }

      if (user.votes[node.id]) {
        color = colors.primary;
        fill = true;
      }

      return (
        <Node
          data={node}
          name={node.name}
          key={node.id}
          color={color}
          fill={fill}
          circleRadius={circleRadius}
          predecessors={this.getPsOfNode(node.id)}
        />
      );
    });

    return (
      <>
        {user.name && (
          <div className={'legend'}>
            <div className={'legend-item'}>
              <span className={'legend-circle'} />
              <span>Completed course</span>
            </div>
            <div className={'legend-item'}>
              <span
                className={
                  'legend-circle legend-circle--alt'
                }
              />
              <span>Pending completion</span>
            </div>
          </div>
        )}
        {coursePopup.id && (
          <CoursePopup
            courseId={coursePopup.id}
            x={coursePopup.x}
            y={coursePopup.y}
          />
        )}

        <svg
          ref={this.wrapper}
          className="graph"
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
        >
          <g>{mappedLinks}</g>
          <g>{nodes}</g>
        </svg>

        <style jsx>{`
          .legend {
            position: absolute;
            background: ${colors.bodyBg};
            padding: 5px;
            bottom: 20px;
            left: 20px;
            font-size: 11px;
          }

          .legend-item {
            margin-bottom: 5px;
          }

          .legend-circle {
            display: inline-block;
            width: 10px;
            height: 10px;
            margin-right: 10px;
            border-radius: 50%;
            border: solid 1px ${colors.primary};
            background: ${colors.secondary};
          }

          .legend-circle--alt {
            background: ${colors.bodyBg};
          }
        `}</style>
      </>
    );
  }
}

export default Graph2;
