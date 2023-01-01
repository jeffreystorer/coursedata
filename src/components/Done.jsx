import React from 'react';
import { CSVLink } from 'react-csv';
import { get } from '@/utils/localStorage';

export default function Done() {
  const allCourseData = get('allCourseData');
  const newItems = get('newItems');
  const omittedItems = get('omittedItems');
  return (
    <>
      <CSVLink data={allCourseData}>Download Course Data</CSVLink>
      {newItems.length > 0 && <h3>New Tees added to GHIN Data</h3>}
      {newItems.length > 0 &&
        newItems.map((item, index) => <p key={index}>{item}</p>)}
      {omittedItems.length > 0 && <h3>Old Tees omitted from GHIN Data</h3>}
      {omittedItems.length > 0 &&
        omittedItems.map((item, index) => <p key={index}>{item}</p>)}
      <table>
        <tbody>
          {allCourseData.map((item) => (
            <tr>
              {item.map((entry) => (
                <td>{entry}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
