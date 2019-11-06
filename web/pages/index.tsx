import React, { Component } from 'react';
import { getCourses } from '../lib/api-public.service';
import Link from 'next/link';
import { NextPageContext } from 'next';
import Graph from '../components/Graph';
import { AppPageProps } from './_app';
import { AppContext } from '../state';

export default class index extends Component<AppPageProps> {
  static contextType = AppContext;
  static async getInitialProps(ctx: NextPageContext) {
    const res = await getCourses();
    return { courses: res.data };
  }

  componentDidMount(): void {}

  render() {
    return (
      <div className={`graph-container`}>
        <div className={`graph-container`}>
          <Graph />

          <style jsx>{`
            .graph-container {
              position: fixed;
              z-index: -1;
              right: 0;
              top: 0;
              bottom: 0;
              left: 0;
              padding: 0 20px;
            }
          `}</style>
        </div>
      </div>
    );
  }
}
