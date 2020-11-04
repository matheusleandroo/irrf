import { createGlobalStyle } from 'styled-components';
import { shade, lighten } from 'polished';

export default createGlobalStyle`
 :root {
   /* Default */
    --color-background: #f0f0f7;
    --color-background-darker: #dddddd;
    --color-background-dark: #6f6f6f;
    --color-background-secundary: #ffffff;

    --color-button-primary: #04d361;
    --color-button-primary-shade: ${shade(0.2, '#04d361')};
    --color-button-secundary: #e33d3d;
    --color-button-secundary-shade: ${shade(0.2, '#e33d3d')};
    --color-button-primary-lighter: #78e5d5;
    --color-button-secundary-lighter: #e57878;

    --color-toast-info-background: #ebf8ff;
    --color-toast-info: #3172b7;
    --color-toast-success-background: #e6fffa;
    --color-toast-success: #2e656a;
    --color-toast-error-background: #fddede;
    --color-toast-error: #e33d3d;

    --color-input-background-secundary: #e6e6f0;

    /* Custom */
    --color-primary: #8257e5;
    --color-primary-shade: ${shade(0.2, '#8257e5')};
    --color-primary-darker: #6c3ae3;
    --color-primary-darker-shade: ${shade(0.2, '#6c3ae3')};
    --color-primary-dark: #6842c2;
    --color-primary-dark-shade: ${shade(0.1, '#6842c2')};
    --color-primary-lighter: #d4c2ff;
    --color-primary-lighter-lighten: ${lighten(0.1, '#d4c2ff')};
    --color-primary-light: #bda5f6;
    --color-text: #6a6180;
    --color-text-lighten: ${lighten(0.2, '#6a6180')};
 }

 * {
   margin: 0;
   padding: 0;
   outline: 0;
   box-sizing: border-box;
 }

 body {
   background: var(--color-background);
   color: var(--color-text);
   -webkit-font-smoothing: antialiased;
   height: 100vh;
 }

 body, input, button {
   font-family: 'Poppins', sans-serif;
 }

 button {
   cursor: pointer;
 }
`;
