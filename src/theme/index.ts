import { createTheme } from '@mui/material/styles'
import { Colors } from '@theme/colors'
import { breakpointValues } from '@theme/variables'

const font =
  "'SF UI Display', 'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"

const $titlefamily =
  "'PT Sans Narrow', 'Open Sans', 'Helvetica Neue', 'Helvetica','Arial', sans-serif"

export const userBreakpoints = breakpointValues

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
    text: {},
  },
  breakpoints: {
    values: breakpointValues,
  },
  typography: {
    fontFamily: font,
    h2: {
      fontSize: 18,
      fontWeight: 500,
      fontFamily: $titlefamily,
    },
    h3: {
      fontSize: 16,
      fontWeight: 500,
      fontFamily: $titlefamily,
    },
    body1: {
      fontSize: 14,
      fontWeight: 400,
    },
    body2: {
      fontSize: 13,
      fontWeight: 400,
    },
    caption: {
      fontSize: 12,
    },
    overline: {
      fontSize: 10,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        padding: '7px 16px',
      },
      containedSizeLarge: {
        padding: '12px 22px',
      },
      outlinedSizeLarge: {
        padding: '12px 22px',
      },
      outlined: {
        padding: '6px 15px',
      },
    },
    MuiButtonBase: {
      root: {
        '&.button-primary.primary-small': {
          fontWeight: 400,
        },
      },
    },
    MuiIcon: {
      root: {
        overflow: 'inherit',
      },
      fontSizeSmall: {
        fontSize: '0.92rem',
      },
    },
    MuiTypography: {
      gutterBottom: {
        marginBottom: '1em',
      },
    },
    MuiBadge: {
      badge: {
        fontSize: 8,
        padding: 2,
      },
    },
    MuiSnackbar: {
      root: {
        left: 0,
      },
    },
    MuiCardContent: {
      root: {
        padding: '8px 12px 12px 12px',
        '&:last-child': {
          paddingBottom: '12px',
        },
      },
    },
    MuiCardMedia: {
      root: {
        padding: '12px 12px 8px 12px',
      },
    },
    MuiContainer: {
      root: {
        paddingLeft: 24,
        paddingRight: 24,
      },
    },
    MuiDialogContent: {
      root: {
        '&:first-child': {
          paddingTop: 0,
        },
      },
    },
  },
})
