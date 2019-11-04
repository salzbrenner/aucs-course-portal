import { VictoryPieProps } from 'victory';
import { CourseMetricInterface } from '../hoc/withCourseData';

export const getQualitiesLabels = [
  'Abysmal',
  'Bad',
  'Average',
  'Good',
  'Awesome!',
];

export const processMetric = (
  data: CourseMetricInterface,
  labels: string[]
): { x: string; y: number }[] => {
  const { occurrences, percentages, total } = data;
  return Object.keys(percentages)
    .filter(key => percentages[+key] > 0)
    .map((key, index) => {
      return {
        x: labels[+key],
        y: percentages[+key],
      };
    });
};
