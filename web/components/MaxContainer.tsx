import * as React from 'react';
import { ReactNode } from 'react';

export default ({
  maxWidth = 1200,
  children,
}: {
  maxWidth?: number;
  children: ReactNode;
}) => (
  <div className="container">
    {children}
    <style jsx global>{`
      .container {
        width: 100%;
        max-width: ${maxWidth}px;
        margin: 0 auto;
        padding: 0 20px;
      }
    `}</style>
  </div>
);
