import { VictoryPieProps } from 'victory';
import { CourseMetricInterface } from '../hoc/withCourseData';

export const qualityLabels = [
  'Abysmal',
  'Bad',
  'Average',
  'Good',
  'Awesome!',
];

export const timeChartLabels = [
  '0 - 10',
  '10 - 20',
  '20 - 30',
  '30+',
];

export const difficultyLabels = [
  `A Joke`,
  `Easy`,
  `Average`,
  `Difficult`,
  `Very Difficult`,
];

export const processMetric = (
  data: CourseMetricInterface,
  labels: string[]
): { x: string; y: number }[] => {
  const { occurrences, percentages, total } = data;
  return (
    Object.keys(percentages)
      // .filter(key => percentages[+key] > 0)
      .map((key, index) => {
        return {
          x: labels[+key],
          y: percentages[+key],
        };
      })
  );
};
