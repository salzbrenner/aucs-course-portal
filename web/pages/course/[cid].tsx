import {CourseContainerProps} from "../../hoc/withCourseData";
import withCourseData from "../../hoc/withCourseData";
import {useAppContext} from "../../state";
import Link from "next/link";
import * as React from "react";

const Course = ({description, cid, name}: CourseContainerProps) => {
  const [{ user }] = useAppContext();

  const createMarkup = () => {
    if (!description) {
      return  {__html: ''}
    }
    return {__html: description};
  };

  return <>
    <h1>{`${cid} - ${name}`}</h1>
    {user.isAdmin && <Link href={`/course/edit/[cid]`} as={`/course/edit/${cid}`}>
      <a className={'link link--underline'}>Edit</a>
    </Link>}

    <div className="row col-xs-12 col-sm-6">
      <div dangerouslySetInnerHTML={createMarkup()} />;
    </div>
  </>

};

export default withCourseData(Course);
