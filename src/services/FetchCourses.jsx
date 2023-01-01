import React from 'react';
import { useAsyncResource, AsyncResourceContent } from 'use-async-resource';
import Loading from '@/components/common/Loading';
import {
  buildCourseRequests,
  processCourseDataFromGHIN,
} from '@/services/utils';

export default function FetchCourses(props) {
  let requests = buildCourseRequests();

  const fetchData = () =>
    Promise.all(requests).then(function (responses) {
      // Get a JSON object from each of the responses
      return Promise.all(
        responses.map(function (response) {
          return response.data;
        })
      );
    });
  // 👉 initialize the data reader and start fetching the user immediately
  const [dataReader] = useAsyncResource(fetchData, []);

  function CourseData({ dataReader, next }) {
    dataReader((data) => processCourseDataFromGHIN(data));

    // 😎 just call the data reader function to get the user object

    return next;
  }

  return (
    <>
      <AsyncResourceContent
        fallback={<Loading />}
        errorMessage='Error fetching courses'>
        <CourseData dataReader={dataReader} next={props.next} />
      </AsyncResourceContent>
    </>
  );
}
