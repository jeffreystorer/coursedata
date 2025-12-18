import React, { useEffect } from 'react';
import Done from '@/components/Done';
import '@/styles/App.css';
import { get, set } from '@/utils/localStorage';

const SPREADSHEET_ID = import.meta.env.VITE_GOOGLE_SHEETS_ID;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

export default function AddCourseDataToGoogleSheet() {
  const allCourseData = get('allCourseData');

  // Discovery doc URL for APIs used by the quickstart
  const DISCOVERY_DOC =
    'https://sheets.googleapis.com/$discovery/rest?version=v4';

  let tokenClient;
  let gapiInited = false;
  let gisInited = false;

  /**
   * Callback after api.js is loaded.
   */
  function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
  }

  /**
   * Callback after the API client is loaded. Loads the
   * discovery doc to initialize the API.
   */
  async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
  }

  /**
   * Callback after Google Identity Services are loaded.
   */
  function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '', // defined later
    });
    gisInited = true;
  }

  useEffect(() => {
    gapiLoaded();
    gisLoaded();
  }, []);

  /**
   *  Sign in the user upon button click.
   */
  function handleAuthClick() {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      await clearCourseData();
      await updateCourseData();
    };

    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({ prompt: '' });
    }
  }

  async function clearCourseData() {
    const range = 'Course_Data_From_GHIN' + '!A1:Z100';
    let request = await gapi.client.sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: range,
      resource: {},
    });
    return request;
  }

  async function updateCourseData() {
    const range = 'Course_Data_From_GHIN' + '!A1:Z100';
    let request = await gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: range,
      includeValuesInResponse: true,
      responseDateTimeRenderOption: 'FORMATTED_STRING',
      responseValueRenderOption: 'UNFORMATTED_VALUE',
      valueInputOption: 'RAW',
      resource: {
        majorDimension: 'ROWS',
        range: range,
        values: allCourseData,
      },
    });
    return request;
  }

  return (
    <>
      <button
        className='button'
        id='authorize_button'
        onClick={handleAuthClick}>
        Update Course Data in Google Sheet
      </button>
      <Done />
    </>
  );
}
