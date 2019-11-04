import React from 'react';
import { NextComponentType } from 'next';

const CardWithShadow: NextComponentType = ({
  children,
}) => {
  return (
    <div className={`card`}>
      {children}

      <style jsx>{`
        .card {
          // box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
          //   0 10px 10px rgba(0, 0, 0, 0.22);
        }
      `}</style>
    </div>
  );
};

export default CardWithShadow;
