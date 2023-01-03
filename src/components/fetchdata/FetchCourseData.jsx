import React from 'react';
//import Done from '@/components/Done';
import AddCourseDataToGoogleSheet from '@/components/AddCourseDataToGoogleSheet';
import { FetchCourses, FetchToken } from '@/services';

export default function FetchCourseData() {
  return (
    <>
      <FetchToken
        next={<FetchCourses next={<AddCourseDataToGoogleSheet />} />}
      />
    </>
  );
}
