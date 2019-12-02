import React, { Component, Ref } from 'react';
import { AppContext } from '../state';
import {
  difficultyLabels,
  qualityLabels,
  timeChartLabels,
} from '../lib/process-response.utils';
import PieChart from './PieChart';
import { colors } from './GlobalStyles';

type CoursePopupProps = {
  courseId: number;
  x: number;
  y: number;
};

class CoursePopup extends Component<CoursePopupProps> {
  static contextType = AppContext;
  container = React.createRef<HTMLDivElement>();
  state = {
    x: this.props.x,
    y: this.props.y,
    positionFromLeft: true,
    positionFromTop: true,
  };

  constructor(props: CoursePopupProps) {
    super(props);
  }

  componentDidMount(): void {
    const rect = this.container.current!.getBoundingClientRect() as DOMRect;
    if (
      this.props.x + rect.width >
      window.innerWidth - 300
    ) {
      this.setState({
        positionFromLeft: false,
        x: window.innerWidth - this.props.x,
      });
    }

    if (
      this.props.y + rect.height >
      window.innerHeight + window.pageYOffset
    ) {
      this.setState({
        positionFromTop: false,
        y: 30,
      });
    } else {
      this.setState({
        positionFromTop: true,
        y: this.props.y - window.pageYOffset,
      });
    }
  }

  render() {
    const [{ courses }] = this.context;
    const { courseId, x, y } = this.props;
    const course = courses[courseId];

    const { qualities, difficulties, time, name } = course;

    const charts = [
      {
        data: qualities,
        labels: qualityLabels,
        title: `quality`,
      },
      {
        data: difficulties,
        labels: difficultyLabels,
        title: `difficulty`,
      },
      {
        data: time,
        labels: timeChartLabels,
        title: `time commitment`,
      },
    ];

    return (
      <>
        <div
          ref={this.container}
          className={'course-popup'}
        >
          <p>
            {courseId} - {name}
          </p>

          <div className="row charts">
            {charts.map(element => {
              if (element) {
                return (
                  <div
                    className={'col-xs-12 col-sm-4'}
                    key={element.title}
                  >
                    {element.data &&
                    element.data.total > 0 ? (
                      <div className={'chart-col'}>
                        <p className={'chart-title'}>
                          {element.title}&nbsp;
                          {element.title ===
                            'time commitment' && (
                            <span className={'title-sub'}>
                              (hrs/week)
                            </span>
                          )}
                        </p>
                        <div className="chart">
                          <PieChart
                            type={element.title}
                            data={element.data}
                            labels={element.labels}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className={'no-data'}>
                        <p>No data for {element.title}</p>
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </div>
        </div>

        <style jsx>{`
          .course-popup {
            position: fixed;
            z-index: 100;
            padding: 20px;
            border: solid 1px ${colors.primary};
            background: ${colors.bodyBg};
            top: ${this.state.positionFromTop
              ? `${this.state.y + 10}px`
              : 'unset'};
            bottom: ${!this.state.positionFromTop
              ? `${this.state.y + 10}px`
              : 'unset'};
            left: ${this.state.positionFromLeft
              ? `${this.state.x + 10}px`
              : 'unset'};
            right: ${!this.state.positionFromLeft
              ? `${this.state.x + 10}px`
              : 'unset'};
            min-height: 200px;
            width: 600px;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
              0 3px 6px rgba(0, 0, 0, 0.23);
          }

          .chart-col {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
          }

          .chart-title {
            text-transform: capitalize;
          }

          .title-sub {
            font-size: 0.5rem;
            line-height: 1;
          }
        `}</style>
      </>
    );
  }
}

export default CoursePopup;
