import * as d3 from 'd3';
import { ReactDOM } from 'react';
import * as React from 'react';
import {
  Simulation,
  SimulationLinkDatum,
  SimulationNodeDatum,
} from 'd3';
import { colors } from './GlobalStyles';
const width = 1080;
const height = 250;
const color = d3.scaleOrdinal(d3.schemeCategory10);

interface NodeDatum extends SimulationNodeDatum {
  name: string;
  id: number;
}

const data: NodeDatum[] = [
  { name: 'fruit', id: 1 },
  { name: '3333 - Algorithms 2', id: 4 },
  { name: 'apple', id: 3 },
  { name: 'banana', id: 2 },
];

const links: SimulationLinkDatum<SimulationNodeDatum>[] = [
  { source: 1, target: 2 },
  { source: 1, target: 3 },
  { source: 1, target: 4 },
];

const updateNode = (selection: any) => {
  selection.attr('transform', (d: any) => {
    return 'translate(' + d.x + ',' + d.y + ')';
  });
};

const updateLink = (selection: any) => {
  selection
    .attr('x1', (d: any) => d.source.x)
    .attr('y1', (d: any) => d.source.y)
    .attr('x2', (d: any) => d.target.x)
    .attr('y2', (d: any) => d.target.y);
};

const updateGraph = (selection: any) => {
  selection.selectAll('.node').call(updateNode);
  selection.selectAll('.link').call(updateLink);
};

class Node extends React.Component<any> {
  d3Node: any;
  node: any;
  circle: any;

  constructor(props: any) {
    super(props);
    this.node = React.createRef();
    this.circle = React.createRef();
  }

  componentDidMount() {
    this.d3Node = d3
      .select(this.node.current)
      .datum(this.props.data);
  }

  componentDidUpdate() {
    // this.d3Node.datum(this.props.data).call(updateNode);
  }

  handle(e: any) {
    console.log(this.props.data.id + ' been clicked');
  }

  render() {
    return (
      <g className="node" ref={this.node}>
        <circle
          ref={this.circle}
          fill={colors.primaryShade1}
          strokeWidth={2}
          stroke={colors.five}
          r={40}
          onClick={this.handle.bind(this)}
        />

        {/*<text fill={colors.bodyBg}>*/}
        {/*  {this.props.data.name}*/}
        {/*</text>*/}
        <text
          fontSize="12"
          dx={-40}
          dy={-20}
          fill="#008F68"
        >
          {this.props.data.name}
        </text>
        {/*<a href="#code">*/}
        {/*  <text fontSize="12" fill="#008F68" dx={45} dy={0}>*/}
        {/*    visit*/}
        {/*    /!*<tspan>Some Text</tspan>*!/*/}
        {/*  </text>*/}
        {/*</a>*/}
      </g>
    );
  }
}

//////////////////////////////////////////////////////////
/////// Link component

class Link extends React.Component<any> {
  line: any;
  d3Link: any;

  constructor(props: any) {
    super(props);
    this.line = React.createRef();
  }

  componentDidMount() {
    this.d3Link = d3
      .select(this.line.current)
      .datum(this.props.data);
    // .call(enterLink);
  }

  componentDidUpdate() {
    // this.d3Link.datum(this.props.data)
    // .call(updateLink);
  }

  render() {
    return (
      <line
        ref={this.line}
        strokeWidth={2}
        stroke={'red'}
        className="link"
      />
    );
  }
}

class Graph extends React.Component {
  wrapper: any;
  d3Graph: any;
  simulation: Simulation<
    NodeDatum,
    SimulationLinkDatum<NodeDatum>
  > | null = null;

  state = {
    width: 0,
    height: 0,
    simulation: null,
  };

  constructor(props: any) {
    super(props);
    this.wrapper = React.createRef();
    this.setDimensions = this.setDimensions.bind(this);
  }

  componentDidMount() {
    this.d3Graph = d3.select(this.wrapper.current);

    this.simulation = d3
      .forceSimulation(data)
      .force('charge', d3.forceManyBody().strength(-10))
      .force(
        'link',
        d3
          .forceLink(links)
          .strength(0.5)
          .id(function(d: any) {
            return d.id;
          })
          .distance(50)
      )
      .force(
        'center',
        d3.forceCenter(
          this.state.width / 2,
          this.state.height / 2
        )
      )
      .force('collide', d3.forceCollide(70).iterations(10));

    this.simulation.alpha(0.3).restart();
    const dragStarted = (d: any) => {
      if (!d3.event.active)
        this.simulation!.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };

    function dragging(d: any) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    const dragEnded = (d: any) => {
      if (!d3.event.active) this.simulation!.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    };

    const node = d3.selectAll('g.node').call(
      d3
        .drag<any, any>()
        .on('start', dragStarted)
        .on('drag', dragging)
        .on('end', dragEnded)
    );

    this.simulation.on('tick', () => {
      this.d3Graph.call(updateGraph);
    });

    // this.setState({
    //   simulation
    // });
    this.setDimensions();
    window.addEventListener('resize', this.setDimensions);
  }

  componentWillUnmount(): void {
    window.removeEventListener(
      'resize',
      this.setDimensions
    );
  }

  setDimensions(simulation?: any): void {
    const containerEl = this.wrapper.current.parentNode.getBoundingClientRect();
    this.setState(
      {
        width: containerEl.width,
        height: containerEl.height,
      },
      () => {
        // const { simulation } = this.state;

        if (this.simulation) {
          this.simulation
            .force(
              'center',
              d3.forceCenter(
                this.state.width / 2,
                this.state.height / 2
              )
            )
            .alpha(0.3)
            .restart();
        }
      }
    );
  }

  render() {
    const nodes = data.map(node => {
      return (
        <Node data={node} name={node.name} key={node.id} />
      );
    });
    const mappedLinks = links.map((link, i) => {
      return (
        <Link
          key={(link.target as number) + i}
          data={link}
        />
      );
    });

    return (
      <svg
        ref={this.wrapper}
        className="graph"
        width={this.state.width}
        height={this.state.height}
      >
        <linearGradient
          id="grad1"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop
            offset="0%"
            style={{
              stopColor: `${colors.fourth}`,
              stopOpacity: 1,
            }}
          />
          <stop
            offset="100%"
            style={{
              stopColor: `${colors.primaryShade1}`,
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <g>{mappedLinks}</g>
        <g>{nodes}</g>
      </svg>
    );
  }
}

export default Graph;
