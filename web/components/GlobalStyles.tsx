import * as React from 'react';

export const colors = {
  primary: '#03244d',
  secondary: `#cc4e0b`,
  primaryGradient: `linear-gradient(180deg, rgba(3,36,77,1) 0%, rgba(6,63,134,1) 100%);`,
  bodyBg: `#ededed`,
};

export const breakpoints = {
  sm: '600px',
  md: '800px',
};

export default () => (
  <>
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }

      body {
        padding-bottom: 100px;
        background: ${colors.bodyBg};
        font-family: 'Ubuntu', sans-serif;
      }

      .color-body-bg {
        color: ${colors.bodyBg};
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

      .link {
        display: inline-block;
        text-transform: uppercase;
        text-decoration: none;
        font-size: 0.8rem;
        // font-weight: bold;
        letter-spacing: 1px;
      }

      .link--sidebar {
        color: white;
        opacity: 0.8;
        padding: 10px;
        letter-spacing: 2px;
      }

      .link--underline {
        position: relative;
      }

      .link--underline::after {
        position: absolute;
        left: 0;
        right: 0;
        bottom: -5px;
        height: 3px;
        background: ${colors.secondary};
        content: '';
      }

      .button {
        display: inline-block;
        background: none;
        border: none;
        box-shadow: none;
        padding: 0px;
        outline: none !important;
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
