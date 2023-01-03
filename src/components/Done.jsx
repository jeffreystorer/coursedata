import React from 'react';
import { CSVLink } from 'react-csv';
import { get } from '@/utils/localStorage';

export default function Done() {
  const allCourseData = get('allCourseData');
  const newItems = get('newItems');
  const omittedItems = get('omittedItems');
  const uniqueTeeArray = get('uniqueTeeArray');

  const downloadFile = ({ data, fileName, fileType }) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType });
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  function exportToJson(e) {
    e.preventDefault();
    downloadFile({
      data: JSON.stringify(uniqueTeeArray),
      fileName: 'teeArray.json',
      fileType: 'text/json',
    });
  }
  return (
    <>
      <br />
      {newItems.length > 0 && <h3>New Tees added to GHIN Data</h3>}
      {newItems.length > 0 &&
        newItems.map((item, index) => <p key={index}>{item}</p>)}
      {omittedItems.length > 0 && <h3>Old Tees omitted from GHIN Data</h3>}
      {omittedItems.length > 0 &&
        omittedItems.map((item, index) => <p key={index}>{item}</p>)}
      <br />
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>
              Tees Rated on One or More Courses <br />
              <button
                type='button'
                style={{
                  textDecoration: 'underline',
                  align: 'left',
                  padding: '0',
                }}
                onClick={exportToJson}>
                (Download Tee Array as JSON)
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {uniqueTeeArray.map((item, index) => (
            <tr key={index}>
              <td style={{ textAlign: 'left' }}>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }} colSpan='4'>
              Course Data <br />
              <CSVLink
                style={{ textDecoration: 'underline' }}
                data={allCourseData}>
                (Download Course Data as CSV)
              </CSVLink>
            </th>
          </tr>
        </thead>
        <tbody>
          {allCourseData.map((item, index) => (
            <tr key={index}>
              {item.map((entry, index) => (
                <td style={{ textAlign: 'left' }} key={index}>
                  {entry}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
