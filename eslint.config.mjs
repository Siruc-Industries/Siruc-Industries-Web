// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  // Your custom configs here
  rules: {
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always', // Allows self-closing for void elements (e.g., <img />, <br />)
          normal: 'any', // any self-closing for normal HTML elements (e.g., <div></div>)
          component: 'any', // Any self-closing for custom Vue components (e.g., <ButtonLink /> | <sth></sth>)
        },
      },
    ],
    'vue/block-order': 'off', // Disable block order rule for flexibility (e.g., style after script)
  },
});
