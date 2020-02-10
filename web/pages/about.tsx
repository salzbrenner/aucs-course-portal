import React, { Component } from 'react';
import { NextComponentType } from 'next';
import Head from 'next/dist/next-server/lib/head';
import MaxContainer from '../components/MaxContainer';

const copy = {
  heading: `Auburn Computer Science Online Course Portal`,
  main: [
    `This application is meant as an overview of the current curriculum for the <a class=" link--text " href="https://csonline.eng.auburn.edu/">Auburn Online Computer Science</a> program. It provides a method for students to track their progress and rate their classes based on the quality, difficulty, and time spent.`,
    `If you are a student enrolled in the program, you can hit "Login" up top, enter your Auburn/Microsoft credentials (the same ones you use to access auaccess/Canvas), and rate the classes you've completed. Once you've entered a rating, the graph on the home page will update with your completed courses.`,
    `This project was created by <a class=" link--text " href="//aboutevan.com">Evan Salzbrenner<a/>, a software developer and student in the program. You can <a class=" link--text " href="https://aboutevan.com/building-the-aucs-course-portal-with-python-and-javascript">read about its development</a> or <a class=" link--text " href="https://github.com/salzbrenner/aucs-course-portal">view the code</a>.`,
    `This application is an independent student project and not supported by Auburn University or reflective of their views.`,
  ],
};

const AboutPage: NextComponentType = ({ copy }: any) => {
  return (
    <>
      <Head>
        <title key="title">
          About | Auburn Computer Science Online
        </title>
        <meta
          name="description"
          content={`About the Auburn Online Computer Science program.`}
          key={'description'}
        />
      </Head>
      <MaxContainer>
        <h1>{copy.heading}</h1>
        {copy.main.map((f: string) => (
          <p
            key={f}
            dangerouslySetInnerHTML={{ __html: f }}
          />
        ))}
      </MaxContainer>
    </>
  );
};

AboutPage.getInitialProps = (ctx: any) => {
  return { copy };
};

export default AboutPage;
