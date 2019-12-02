import * as React from 'react';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const fonts = {
  normal: 'Ubuntu',
  mono: 'IBM Plex Mono',
};

export const colors = {
  primary: '#03244d',
  secondary: `#cc4e0b`,
  bodyColor: `#1C3144`,
  bodyBg: `#F2F2F2`,
  gray1: '#BFC5D1',
  gray2: '#30343F',
  b: '#D00000',
  c: '#1C3144',
  d: '#FFBA08',
  e: '#1B998B',
  f: '#8AEA92',
};

export const breakpoints = {
  sm: '600px',
  md: '800px',
};

export const jsBreakpoints = {
  md: 800,
};

export default () => (
  <>
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }

      h1 {
        font-size: 2.9rem;
        line-height: 3.5rem;
        font-weight: normal;
        margin: 0;
      }

      h2 {
        font-size: 2.2rem;
        line-height: 3rem;
        font-weight: normal;
      }

      .font-size-10 {
        font-size: 10px;
      }

      .font-size-12 {
        font-size: 12px;
      }

      html {
        height: 100%;
      }
      body {
        background: ${colors.bodyBg};
        font-family: ${fonts.mono};
        color: ${colors.bodyColor};
      }

      .text-align-right {
        text-align: right;
      }

      .mb-1 {
        margin-bottom: 1rem;
      }

      .img-responsive {
        max-width: 100%;
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
        letter-spacing: 1px;
        color: ${colors.bodyColor};
      }

      .link--border {
        border: solid 1px ${colors.secondary};
        padding: 5px 10px;
        border-radius: 5px;
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

      .link--smaller-font {
        font-size: 0.8rem;
      }

      button,
      .button {
        display: inline-block;
        background: none;
        border: none;
        box-shadow: none;
        padding: 0px;
        outline: none !important;
      }

      button,
      .button:hover {
        cursor: pointer;
      }

      button,
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
