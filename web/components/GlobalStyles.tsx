import * as React from 'react';

export const colors = {
  primary: `red`,
  secondary: `blue`,
};

export default () => (
  <>
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }

      body {
        padding-top: 30px;
        padding-bottom: 100px;
        font-family: 'Roboto Mono', monospace;
      }

      .mt-30 {
        margin-top: 30px;
      }

      .form-control-label {
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 40px;
      }

      .form-control-label > span {
        margin-right: 30px;
      }

      .button {
        background: none;
        border: none;
        box-shadow: none;
        padding: 10px;
        border: solid 1px ${colors.primary};
      }

      .button:hover {
        cursor: pointer;
      }
      .button:active,
      .button:focus {
      }

      input[type='number'],
      input[type='text'] {
        display: inline-block;
        border-top: none;
        border-right: none;
        border-bottom: solid 1px ${colors.primary};
        border-left: none;
        text-align: left;
        padding: 10px;
        width: 350px;
        margin: 10px 0;
        background: transparent;
        width: 100%;
      }

      input[type='number']:focus,
      input[type='text']:focus {
        background: none;
        border: none;
      }
    `}</style>
  </>
);
