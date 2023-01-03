import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import FetchCourseData from '@/components/fetchdata/FetchCourseData';
import './App.css';
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

function App() {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <FetchCourseData />
    </GoogleOAuthProvider>
  );
}

export default App;
