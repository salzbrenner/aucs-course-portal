import withCourseData, {CourseProps} from "../../../components/CourseContainer";
import DynamicFormCourseOverview from "../../../components/DynamicFormCourseOverview";
import MaxContainer from "../../../components/MaxContainer";
import React from "react";


const Course = ({courseData}: CourseProps) => {

  const createMarkup = () => {
    return {__html: courseData.description};
  }

  return <>
    <h1>{`${courseData.cid} - ${courseData.name}`}</h1>
    <div className="row">
      <div className="col-xs-8">
        <DynamicFormCourseOverview courseData={courseData} />
      </div>
    </div>
  </>

};

export default withCourseData(Course);
