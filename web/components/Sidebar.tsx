import React, { FunctionComponent } from 'react';

const Sidebar: FunctionComponent = ({ children }) => (
  <div className={`sidebar`}>
    {children}
    <style jsx>
      {`
        .sidebar {
          padding: 50px 30px;
        }
      `}
    </style>
  </div>
);

export default Sidebar;
