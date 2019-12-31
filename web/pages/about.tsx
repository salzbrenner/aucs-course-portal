import React, { Component } from 'react';
import { NextComponentType } from 'next';
import Head from 'next/dist/next-server/lib/head';
import MaxContainer from '../components/MaxContainer';

const copy = {
  heading: `Auburn Computer Science Online Course Portal`,
  main: [
    `This application is meant as an overview of the current curriculum for the <a class=" link--text " href="https://csonline.eng.auburn.edu/">Auburn Online Computer Science</a> program. It provides a method for students to rate their classes based on the quality, difficulty, and time spent.`,
    `If you are a student enrolled in the program, you can hit "Login" up top, enter your Auburn/Microsoft credentials (the same ones you use to access auaccess/Canvas), and rate the classes you've completed. Once you've entered a rating, the graph on the home page will update with your completed courses.`,
    `This project was created by <a class=" link--text " href="//aboutevan.com">Evan Salzbrenner<a/>, a software engineer and student in the program. The code can be <a class=" link--text " href="https://github.com/salzbrenner/aucs-course-portal">viewed here</a>.`,
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
