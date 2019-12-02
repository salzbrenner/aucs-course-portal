import { CourseContainerProps } from '../../hoc/withCourseData';
import withCourseData from '../../hoc/withCourseData';
import { useAppContext } from '../../state';
import Link from 'next/link';
import * as React from 'react';
import PieChart from '../../components/PieChart';
import {
  difficultyLabels,
  qualityLabels,
  timeChartLabels,
} from '../../lib/process-response.utils';
import FormVote, {
  VotingCategoriesInterface,
} from '../../components/FormVote';
import { useState } from 'react';
import Modal from 'react-modal';
import { UserState } from '../../state/reducers/userReducer';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 11,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Course = ({courseData,
                  apiAuth,
                }: CourseContainerProps) => {
  const {
    description,
    cid,
    name,
    prereq,
    qualities,
    difficulties,
    time,
  } = courseData;

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

  const [{ user }] = useAppContext();

  const [modalIsOpen, setModalState] = useState(false);

  const createMarkup = () => {
    if (!description) {
      return { __html: '' };
    }
    return { __html: description };
  };

  const prereqMap = Object.keys(prereq).map(
    (key: string) => {
      return prereq[+key];
    }
  );

  const openModal = () => {
    setModalState(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  };

  const closeModal = () => {
    setModalState(false);
  };

  const hasProvidedFeedback = (user: UserState) => {
    return user && user.id && user.votes && user.votes[cid];
  };

  const getFeedback = (
    votes: VotingCategoriesInterface
  ) => {
    return Object.keys(votes).map(id => {
      return (
        <p key={id}>
          {id} -{' '}
          {votes[id as keyof VotingCategoriesInterface]}
        </p>
      );
    });
  };

  return (
    <>
      <h1 className={'course-title'}>{`${cid} - ${name}`}</h1>

      <div className={'meta'}>
        <div>
          {prereqMap.map((cids, index) => {
            return (
              <div key={cid}>
                <p>
                  Prerequisites:&nbsp;
                  <span>
                    {cids.split(' ').join(', ')}
                    {Object.keys(prereq).length > 0 &&
                    index <
                    Object.keys(prereq).length - 1 &&
                    ' or'}
                  </span>
                </p>
              </div>
            );
          })}
        </div>

        {user && user.id && (
          <div className={'text-align-right'}>
            <div className={'feedback-text'}>
              {hasProvidedFeedback(user)
                ? `You've rated this course`
                : `Have you taken this course?`}
            </div>

            {/*{hasProvidedFeedback(user) &&*/}
            {/*getFeedback(user.votes[cid])}*/}
            <button
              className={
                'link link--border link--smaller-font'
              }
              onClick={() => openModal()}
            >
              {hasProvidedFeedback(user)
                ? 'Change Feedback'
                : 'Rate this course'}
            </button>
          </div>
        )}
      </div>

      <div className="row charts">
        {charts.map(element => {
          if (element) {
            return (
              <div
                className={'col-xs-12 col-sm-4'}
                key={element.title}
              >
                {element.data && element.data.total > 0 ? (
                  <div className={'chart-col'}>
                    <h2 className={'chart-title'}>
                      {element.title}&nbsp;
                      {element.title ===
                      'time commitment' && (
                        <span className={'title-sub'}>
                          (hrs/week)
                        </span>
                      )}
                    </h2>
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

      <div className="row">
        <div className="col-xs-12 col-sm-8">
          <div
            className={'course-inner-html'}
            dangerouslySetInnerHTML={createMarkup()}
          />
          {user && user.id && apiAuth && (
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
              style={customStyles}
            >
              <FormVote
                votes={user.votes[cid]}
                apiAuth={apiAuth}
                cid={cid}
                closeModalHandler={closeModal}
                uid={user.id}
              />
            </Modal>
          )}
        </div>
      </div>

      {user.isAdmin && (
        <Link
          href={`/course/edit/[cid]`}
          as={`/course/edit/${cid}`}
        >
          <a className={'link link--underline'}>Edit</a>
        </Link>
      )}
      <style jsx global>{`
        .course-title {
          max-width: 800px;
          margin-bottom: 20px;
        }
      
        .charts {
          margin-top: 10px;
          margin-bottom: 40px;
        }

        .chart-col {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }

        .feedback-text {
          margin-bottom: 8px;
        }

        .chart-title {
          text-transform: capitalize;
          font-size: 1.7rem;
          line-height: 2rem;
          margin-bottom: 20px;
        }

        .title-sub {
          font-size: 1rem;
          line-height: 1;
        }

        .meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
          font-size: 0.9rem !important;
        }

        .course-inner-html {
          font-size: 18px;
        }
        .course-inner-html p,
        .course-inner-html li {
          line-height: 1.4;
        }

        .course-inner-html ul {
          margin-bottom: 30px;
        }
        .course-inner-html li {
          margin-bottom: 10px;
        }

      `}</style>
    </>
  );
};

export default withCourseData(Course);
