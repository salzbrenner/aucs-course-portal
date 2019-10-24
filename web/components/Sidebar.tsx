import React, { FunctionComponent } from 'react';
import { colors } from './GlobalStyles';

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
