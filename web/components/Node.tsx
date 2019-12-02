import * as React from 'react';
import * as d3 from 'd3';
import { colors, jsBreakpoints } from './GlobalStyles';
import { AppContext } from '../state';
import { coursePopupActions } from '../state/reducers/coursePopupReducer';

class Node extends React.Component<any> {
  static contextType = AppContext;

  d3Node: any;
  node: any;
  circle: any;

  state = {
    showLabel: false,
  };

  constructor(props: any) {
    super(props);
    this.node = React.createRef();
    this.circle = React.createRef();
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  componentDidMount() {
    this.d3Node = d3
      .select(this.node.current)
      .datum(this.props.data);
  }

  onMouseOver(e: any) {
    if (window.innerWidth < jsBreakpoints.md) {
      return;
    }

    const { data } = this.props;
    const { id } = data;
    const [{}, dispatch] = this.context;

    dispatch({
      type: coursePopupActions.SHOW_COURSE_POPUP,
      payload: { id, x: e.pageX, y: e.pageY },
    });
  }

  onMouseLeave() {
    if (window.innerWidth < jsBreakpoints.md) {
      return;
    }

    const [{}, dispatch] = this.context;

    dispatch({
      type: coursePopupActions.HIDE_COURSE_POPUP,
    });
  }

  render() {
    const { circleRadius, color, fill, data } = this.props;
    const { id, name } = data;
    const { showLabel } = this.state;

    return (
      <g className="node" ref={this.node}>
        <defs>
          {/*<filter*/}
          {/*  x="-0.15"*/}
          {/*  y="-0.15"*/}
          {/*  width="1.3"*/}
          {/*  height="1.3"*/}
          {/*  filterUnits="objectBoundingBox"*/}
          {/*  id="border"*/}
          {/*>*/}
          {/*  <feFlood floodColor={colors.primary} />*/}
          {/*  <feComposite in="SourceGraphic" />*/}
          {/*</filter>*/}
          <filter
            x="-0.1"
            y="-0.1"
            width="1.2"
            height="1.2"
            filterUnits="objectBoundingBox"
            id="solid"
          >
            <feFlood floodColor={colors.bodyBg} />
            <feComposite in="SourceGraphic" />
          </filter>
        </defs>
        <circle
          className={'circle'}
          ref={this.circle}
          fill={fill ? colors.secondary : colors.bodyBg}
          stroke={color}
          strokeWidth={2}
          r={circleRadius}
          onMouseOver={this.onMouseOver}
          onMouseLeave={this.onMouseLeave}
        />
        <g>
          <text
            fontSize="15"
            fontWeight="bold"
            dx={-40}
            dy={-30}
            fill={colors.bodyColor}
            filter="url(#solid)"
          >
            {id}
          </text>
        </g>

        {showLabel && (
          <text dx={20} dy={30}>
            {name}
          </text>
        )}

        <style jsx>{`
          .circle:hover {
            cursor: pointer;
          }
        `}</style>
      </g>
    );
  }
}

export default Node;
