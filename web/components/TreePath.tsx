import React from 'react';
import * as d3 from 'd3';
import { colors } from './GlobalStyles';

class TreePath extends React.Component<any> {
  line: any;

  constructor(props: any) {
    super(props);
    this.line = React.createRef();
  }

  componentDidMount(): void {
    d3.select(this.line.current).datum(this.props.data);
  }

  render() {
    const { color, data } = this.props;
    return (
      <>
        <defs>
          <marker
            id={`triangle-${colors.gray1}`}
            viewBox="0 -5 10 10"
            refX="22"
            refY="0"
            markerWidth="10"
            markerHeight="8"
            orient="auto"
          >
            <path
              d="M 0,-5 L 10 ,0 L 0,5"
              fill={colors.gray1}
            />
          </marker>
          <marker
            id={`triangle-${colors.primary}`}
            viewBox="0 -5 10 10"
            refX="22"
            refY="0"
            markerWidth="10"
            markerHeight="8"
            orient="auto"
          >
            <path
              d="M 0,-5 L 10 ,0 L 0,5"
              fill={colors.primary}
            />
          </marker>
        </defs>
        <line
          ref={this.line}
          strokeWidth={2}
          stroke={color}
          className="tree-path"
          markerEnd={`url(#triangle-${color})`}
        />
      </>
    );
  }
}

export default TreePath;
