import React from "react";
import "./CreditsPage.scss";

const CreditsPage = () => {
  return (
    <div className="creditspage">
      <h3>Frontend</h3>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://reactjs.org/"
        >
          React
        </a>
        ,
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://redux.js.org/"
        >
          Redux
        </a>
        ,
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/reduxjs/redux-thunk"
        >
          Redux-thunk
        </a>
        ,
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/prescottprue/react-redux-firebase"
        >
          React-Redux-Firebase
        </a>
        ,
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/prescottprue/redux-firestore"
        >
          Redux-Firestore
        </a>
      </p>
      <h3>Backend</h3>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://firebase.google.com/"
        >
          Firebase
        </a>
        , Firebase Auth, Firestore Database
      </p>
      <h3>Deployed and Hosted in</h3>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.netlify.com/"
        >
          Netlify
        </a>
      </p>
      <h3>API By</h3>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.themoviedb.org/"
        >
          TheMovieDB
        </a>
      </p>
    </div>
  );
};

export default CreditsPage;
