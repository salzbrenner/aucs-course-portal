import { CourseContainerProps } from '../../hoc/withCourseData';
import withCourseData from '../../hoc/withCourseData';
import { useAppContext } from '../../state';
import Link from 'next/link';
import * as React from 'react';
import PieChart from '../../components/PieChart';
import CardWithShadow from '../../components/CardWithShadow';
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

const Course = ({
  courseData,
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
  const graphs = [
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
      {user.isAdmin && (
        <Link
          href={`/course/edit/[cid]`}
          as={`/course/edit/${cid}`}
        >
          <a className={'link link--underline'}>Edit</a>
        </Link>
      )}

      <h1>{`${cid} - ${name}`}</h1>
      <div className={'meta'}>
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

        {user && user.id && (
          <div className={'text-align-right'}>
            <div>
              {hasProvidedFeedback(user)
                ? `You've rated this course`
                : `Have you taken this course?`}
            </div>

            {/*{hasProvidedFeedback(user) &&*/}
            {/*getFeedback(user.votes[cid])}*/}
            <button
              className={'link link--border'}
              onClick={() => openModal()}
            >
              {hasProvidedFeedback(user)
                ? 'Change Feedback'
                : 'Rate this course'}
            </button>
          </div>
        )}
      </div>

      <div className="row">
        {graphs.map(element => {
          if (element) {
            return (
              <div
                className={'col-xs-12 col-sm-4'}
                key={element.title}
              >
                {element.data && element.data.total > 0 ? (
                  <>
                    <h2>{element.title}</h2>
                    <PieChart
                      type={element.title}
                      data={element.data}
                      labels={element.labels}
                    />
                  </>
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
          ;
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

      <style jsx global>{`
        .course-inner-html {
          font-size: 18px;
        }

        .meta {
          display: flex;
          justify-content: space-between;
        }

        .course-inner-html p {
          line-height: 1.4;
        }

        .no-data {
          height: 200px;
        }
      `}</style>
    </>
  );
};

export default withCourseData(Course);
