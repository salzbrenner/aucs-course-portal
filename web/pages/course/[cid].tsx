import {CourseProps} from "../../components/CourseContainer";
import withCourseData from "../../components/CourseContainer";



const Course = ({courseData}: CourseProps) => {

  const createMarkup = () => {
    if (!courseData.description) {
      return  {__html: ''}
    }
    return {__html: courseData.description};
  }

  return <>
    <h1>{`${courseData.cid} - ${courseData.name}`}</h1>
    <div className="row col-xs-12 col-sm-6">
      <div dangerouslySetInnerHTML={createMarkup()} />;
    </div>
  </>

};

export default withCourseData(Course);
