import React from 'react';
import Done from '@/components/Done';
import { FetchCourses, FetchToken } from '@/services';

export default function FetchCourseData() {
  return (
    <>
      <FetchToken next={<FetchCourses next={<Done />} />} />
    </>
  );
}
