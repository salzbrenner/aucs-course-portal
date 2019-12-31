import { VictoryPieProps } from 'victory';
import { CourseMetricInterface } from '../hoc/withCourseData';

export const qualityLabels = [
  'Terrible',
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
  `Very Easy`,
  `Easy`,
  `Average`,
  `Difficult`,
  `Very Difficult`,
];

export const processMetric = (
  data: CourseMetricInterface,
  labels: string[]
): { x: string; y: number }[] => {
  const { percentages } = data;
  return Object.keys(percentages).map((key, index) => {
    return {
      x: labels[+key],
      y: percentages[+key],
    };
  });
};

export const dLog = (...msg: any) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(...msg);
  }
};
