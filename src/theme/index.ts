import { createTheme } from '@mui/material/styles'
import { Colors } from '@theme/colors'
import { breakpointValues } from '@theme/variables'

export const userBreakpoints = breakpointValues

const font =
  "'Averta CY', 'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"

const $titlefamily =
  "'Averta CY', 'Open Sans', 'Helvetica Neue', 'Helvetica','Arial', sans-serif"

export default createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
    error: {
      main: '#F7F735',
    },
    text: {
      primary: '#212121',
    },
    background: {
      default: '#fafafa',
    },
  },
  breakpoints: {
    values: breakpointValues,
  },
  typography: {
    fontFamily: font,
    h1: {
      fontSize: 22,
      fontWeight: 600,
      fontFamily: $titlefamily,
    }, // lets all big titles
    h2: {
      fontSize: 18,
      fontWeight: 600,
      fontFamily: $titlefamily,
    },
    h3: {
      fontSize: 16,
      fontFamily: $titlefamily,
      fontWeight: 600,
    },
    h4: {
      fontSize: 15,
      fontFamily: $titlefamily,
      fontWeight: 600,
      textTransform: 'uppercase',
    },
    h5: {
      fontSize: 14,
      fontFamily: $titlefamily,
      fontWeight: 600,
      textTransform: 'uppercase',
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
    },
    body2: {
      fontSize: 14,
      fontWeight: 400,
    },
    caption: {
      fontSize: 12,
    },
    overline: {
      fontSize: 10,
    },
  },
})
