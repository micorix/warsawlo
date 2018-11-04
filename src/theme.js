import WebFont from 'webfontloader'
import { injectGlobal } from 'emotion'
WebFont.load({
  google: {
    families: [
      'Work Sans:400:latin-ext',
      'Playfair Display:400:latin-ext'
    ]
  },
  custom: {
    families: ['Ostrich Sans Rounded'],
    urls: ['https://cdn.jsdelivr.net/gh/theleagueof/ostrich-sans/webfonts/ostrich-sans.css']
}})
injectGlobal`
*{
  font-family: Work Sans;
}
`
const theme = {
  colors: {
    primary: 'rgb(89, 0, 138)'
  },
  fonts: {
    primary: 'Work Sans',
    secondary: 'Playfair Display',
    tertiary: 'Ostrich Sans Rounded'
  }
}
export default theme
