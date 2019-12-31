import React, { Component } from 'react';
import { getCourses } from '../lib/api-public.service';
import { NextPageContext } from 'next';
import { AppPageProps } from './_app';
import { AppContext, useAppContext } from '../state';
import Graph2 from '../components/Graph2';
import { breakpoints } from '../components/GlobalStyles';
import Head from 'next/head';

interface IndexProps extends AppPageProps {
  courses: any;
}

export default class index extends Component<IndexProps> {
  static contextType = AppContext;

  static async getInitialProps(ctx: NextPageContext) {
    const res = await getCourses();
    return { courses: res.data };
  }

  state = {
    courses: this.processForGraph(this.props.courses),
    paths: this.processPaths(this.props.courses),
  };

  async componentDidMount() {
    // without this, graph path colors don't update
    this.setState({
      paths: this.processPaths(this.props.courses),
    });
  }

  processForGraph(courses: any) {
    return courses
      .map((course: any) => {
        return {
          id: course.cid,
          name: course.name,
          position: course.position,
        };
      })
      .sort((a: any, b: any) => a.id - b.id);
  }

  // each prereq is source
  // each cid is target
  processPaths(courses: any) {
    return courses
      .map((course: any) => {
        const prereqGroups = course.prereq;
        return Object.keys(prereqGroups)
          .map((group: any) => {
            const prereqIds = prereqGroups[group]
              .split(' ')
              .map((id: string) => +id);

            return prereqIds.map((id: number) => {
              return {
                source: id,
                target: course.cid,
              };
            });
          })
          .reduce((a: any, b: any) => {
            return a.concat(b);
          }, []);
      })
      .reduce((a: any, b: any) => {
        return a.concat(b);
      }, []);
  }

  render() {
    const { paths, courses } = this.state;

    return (
      <div className={`graph-container`}>
        <Head>
          <title key="title">
            Auburn Computer Science Online
          </title>
          <meta
            name="description"
            content={`Curriculum for the Auburn Online Computer Science program.`}
            key={'description'}
          />
        </Head>
        <div className={`graph-container`}>
          <h1 className={'sr-only'}>
            Auburn Computer Science Online Course Portal
          </h1>
          {paths && <Graph2 paths={paths} data={courses} />}

          <style jsx>{`
            .graph-container {
              position: fixed;
              right: 0;
              top: 47px;
              bottom: 0;
              left: 0;
            }

            @media screen and (min-width: ${breakpoints.md}) {
              .graph-container {
                right: 300px;
              }
            }
          `}</style>
        </div>
      </div>
    );
  }
}
