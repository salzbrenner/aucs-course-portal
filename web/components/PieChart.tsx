import React, { useEffect, useState } from 'react';
import { VictoryPie } from 'victory';
import { CourseMetricInterface } from '../hoc/withCourseData';
import {
  getQualitiesLabels,
  processMetric,
} from '../lib/process-response.utils';
import { colors } from './GlobalStyles';

const PieChart = ({
  data,
  labels,
}: {
  data: CourseMetricInterface;
  labels: string[];
}) => {
  const processed = processMetric(data, labels);
  return (
    <div className={'chart-wrap'}>
      <VictoryPie
        //@ts-ignore
        labelRadius={({ innerRadius }) => innerRadius + 40}
        colorScale={[
          colors.tertiary,
          colors.primary,
          colors.secondary,
          colors.tertiary,
        ]}
        style={{
          data: {
            fillOpacity: 0.9,
            stroke: colors.primary,
            strokeWidth: 3,
          },
          labels: {
            fill: colors.bodyBg,
            fontSize: 12,
            fontWeight: 'bold',
          },
        }}
        data={processed}
        labels={({ datum }) =>
          `${datum.x} - ${datum.y.toFixed(2) * 100}%`
        }
      />

      <style jsx>{`
        .chart-wrap {
        }
      `}</style>
    </div>
  );
};

export default PieChart;
