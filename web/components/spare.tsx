import { CourseContainerProps } from '../../hoc/withCourseData';
import withCourseData from '../../hoc/withCourseData';
import { useAppContext } from '../../state';
import Link from 'next/link';
import * as React from 'react';
import PieChart from '../../components/PieChart';
import CardWithShadow from '../../components/CardWithShadow';
import { getQualitiesLabels } from '../../lib/process-response.utils';
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
  description,
  cid,
  name,
  prereq,
  qualities,
  apiAuth,
}: CourseContainerProps) => {
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
      <h1>{`${cid} - ${name}`}</h1>
      <div>
        {prereqMap.map((cids, index) => {
          return (
            <div key={cids}>
              {cids.split(' ').join(', ')}
              {Object.keys(prereq).length > 0 &&
                index < Object.keys(prereq).length - 1 &&
                ' or'}
            </div>
          );
        })}
      </div>
      {user.isAdmin && (
        <Link
          href={`/course/edit/[cid]`}
          as={`/course/edit/${cid}`}
        >
          <a className={'link link--underline'}>Edit</a>
        </Link>
      )}

      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <div dangerouslySetInnerHTML={createMarkup()} />;
        </div>
        <div className="col-xs-12 col-sm-6">
          {user && user.id && (
            <>
              {hasProvidedFeedback(user) ? (
                <p>You've already rated this course.</p>
              ) : (
                <p>Have you taken this course?</p>
              )}
              {hasProvidedFeedback(user) &&
                getFeedback(user.votes[cid])}
              <button onClick={() => openModal()}>
                {hasProvidedFeedback(user)
                  ? 'Change Feedback'
                  : 'Rate this course'}
              </button>
            </>
          )}

          {user && user.id && apiAuth && (
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
              style={customStyles}
            >
              <FormVote
                apiAuth={apiAuth}
                cid={cid}
                uid={user.id}
              />
            </Modal>
          )}

          <CardWithShadow>
            {qualities && (
              <PieChart
                data={qualities}
                labels={getQualitiesLabels}
              />
            )}
          </CardWithShadow>
        </div>
      </div>
    </>
  );
};

export default withCourseData(Course);
