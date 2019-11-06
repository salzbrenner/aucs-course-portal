import withCourseData, {
  CourseContainerProps,
} from '../../../hoc/withCourseData';
import DynamicFormCourseOverview from '../../../dynamic-components/DynamicFormCourseOverview';
import React, {  useState } from 'react';
import {redirectToHome} from "../../../lib/redirect-service";
import {useAppContext} from "../../../state";
import {coursesActions} from "../../../state/reducers/coursesReducesr";

const Course = (props: CourseContainerProps) => {
  const [showDelete, setDeleteVisibility] = useState(false);
  const [{}, dispatch] = useAppContext()
  const { apiAuth, courseData } = props;
  const {cid, name} = courseData;

  const deleteCourse = async () => {
    const res = await apiAuth.deleteCourse(cid);
    dispatch({
      type: coursesActions.DELETE_COURSE,
      payload: cid
    });
    await redirectToHome();
  };

  return (
    <>
      <h1>{`${cid} - ${name}`}</h1>
      <div className="row">
        <div className="col-xs-8">
          <DynamicFormCourseOverview
            submitHandler={apiAuth && apiAuth.updateCourse}
            submitActionType={coursesActions.UPDATE_COURSE}
            {...courseData}
          />

          {!showDelete && (
            <button
              className={'button'}
              onClick={() => setDeleteVisibility(true)}
            >
              Delete
            </button>
          )}
          {showDelete && (
            <div>
              <div>
                Are you sure you want to delete this course?
              </div>
              <button onClick={() => deleteCourse()}>yes</button>
              <button
                onClick={() => setDeleteVisibility(false)}
              >
                cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default withCourseData(Course);
