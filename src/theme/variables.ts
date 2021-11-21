/**
 * App Variables:
 * This contains all the color config for the application
 */
export const breakpointValues = {
  xs: 0,
  sm: 414 /* smartphones, portrait iPhone, portrait 480x320 phones (Android) */,
  md: 720 /* smartphones, Android phones, landscape iPhone */,
  content: 640,
  lg: 960 /* portrait tablets, portrait iPad, e-readers (Nook/Kindle), landscape 800x480 phones (Android) */,
  xl: 1200 /* hi-res laptops and desktops */,
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true // removes the `xs` breakpoint
    sm: true
    md: true
    lg: true
    xl: true
    content: true
  }
}
