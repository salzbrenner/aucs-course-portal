import React, { useState } from 'react';
import { VictoryLegend, VictoryPie } from 'victory';
import { CourseMetricInterface } from '../hoc/withCourseData';
import { processMetric } from '../lib/process-response.utils';
import { colors, fonts } from './GlobalStyles';

const PieChart = ({
  data,
  labels,
  type,
}: {
  data: CourseMetricInterface;
  labels: string[];
  type: string;
}) => {
  const processed = processMetric(data, labels);
  const [innerLabel, setInnerLabel] = useState('');

  let colorScale = [
    colors.b,
    colors.d,
    colors.primary,
    colors.e,
    colors.f,
  ];

  if (type === 'difficulty') {
    colorScale = colorScale.reverse();
  } else if (type === 'time commitment') {
    colorScale = [colors.e, colors.c, colors.d, colors.b];
  }

  const legendData = labels.map((label, index) => ({
    name: label,
    symbol: {
      fill: colorScale[index],
    },
  }));

  return (
    <div className={'chart-wrap'}>
      <div className="legend-wrap">
        <VictoryLegend
          standalone={true}
          height={90}
          orientation="vertical"
          gutter={35}
          itemsPerRow={legendData.length % 2 === 0 ? 2 : 3}
          symbolSpacer={10}
          style={{
            labels: {
              fontFamily: fonts.mono,
              fontSize: 18,
              lineHeight: 1,
            },
            //@ts-ignore
            title: {
              fontSize: 20,
              fontFamily: fonts.mono,
              fontWeight: 'bold',
              textTransform: 'capitalize',
            },
          }}
          data={legendData}
        />
      </div>

      <div className="pie-chart">
        <div className="pie-label">{innerLabel}</div>
        <VictoryPie
          innerRadius={100}
          padding={30}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onMouseOver: () => {
                  return [
                    {
                      target: 'data',
                      //@ts-ignore
                      mutation: ({ style, datum }) => {
                        setInnerLabel(
                          `${datum.y.toFixed(2) * 100}%`
                        );
                        return {
                          style: {
                            ...style,
                            fillOpacity: 0.6,
                          },
                        };
                      },
                    },
                  ];
                },
                onMouseLeave: () => {
                  return [
                    {
                      target: 'data',
                      //@ts-ignore
                      mutation: ({ style }) => {
                        setInnerLabel(``);
                        return {
                          style: {
                            ...style,
                            fillOpacity: 0.95,
                          },
                        };
                      },
                    },
                  ];
                },
              },
            },
          ]}
          colorScale={colorScale}
          style={{
            data: {
              fillOpacity: 0.95,
              stroke: colors.bodyBg,
              strokeWidth: 4,
            },
            labels: {
              fontFamily: fonts.mono,
              fontSize: 12,
              fontWeight: 'bold',
            },
          }}
          data={processed}
          //@ts-ignore
          labels={({ datum }) => null}
        />
      </div>

      <style jsx>{`
        .chart-wrap {
        }

        .legend-wrap {
          display: inline-block;
        }

        .pie-chart {
          position: relative;
        }
        .pie-label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 24px;
          font-weight: bold;
        }
        .presentation {
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default PieChart;
