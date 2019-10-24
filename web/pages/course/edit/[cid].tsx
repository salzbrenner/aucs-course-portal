import withCourseData, {
  CourseProps,
} from '../../../components/CourseContainer';
import DynamicFormCourseOverview from '../../../components/DynamicFormCourseOverview';
import React, { useEffect, useState } from 'react';
import { useAsyncEffect } from '../../../lib/async-use-effect';

const Course = (props: CourseProps) => {
  const [handler, setHandler] = useState();
  const [showDelete, setDeleteVisibility] = useState(false);

  useAsyncEffect(async () => {
    const { updateCourse } = await import(
      '../../../lib/api-auth.service'
      );
    setHandler(() => updateCourse);
  }, []);

  return (
    <>
      <h1>{`${props.cid} - ${props.name}`}</h1>
      <div className="row">
        <div className="col-xs-8">
          <DynamicFormCourseOverview
            submitHandler={handler}
            {...props}
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
              <button>yes</button>
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
