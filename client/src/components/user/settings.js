import React from 'react';
import Layout from '../layout';
import UpdatePassword from './updatePassword';
import UpdateEmail from './updateEmail';

const Settings = props => (
  <Layout logout={props.logout}>
    <div className="root">
      <div className="settingsTitle">
        <h2>Update Your Account</h2>
      </div>
      <section className="content">
        <UpdatePassword />
        <UpdateEmail />
      </section>
    </div>
    <style jsx scoped>
      {`
      .root {
        background: #ffffff;
        max-width: 1440px;
        margin: 0 auto;
        box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
        padding: 20px;
        border-radius: 4px;
      }
      .settingsTitle {
        font-family: 'Raleway', sans-serif;
        color: #003366;
      }
    `}
    </style>
  </Layout>
);

export default Settings;
