import { Box, Container } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useRouter } from 'next/router'

interface HeaderProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const Header: React.FC<HeaderProps> = (props) => {
  const { open, setOpen } = props
  const classes = useStyles()
  const router = useRouter()
  return (
    <Box className={classes.header}>
      <Container
        sx={{ padding: { lg: 0 } }}
        maxWidth="lg"
        className={classes.container}
      >
        {router.asPath !== '/' ? (
          <Box
            sx={{
              position: 'absolute',
              cursor: 'pointer',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              width: 50,
              alignItems: 'center',
              display: {
                lg: 'none',
                md: 'flex',
                sm: 'flex',
                xs: 'flex',
              },
            }}
            onClick={() => router.push('/')}
          >
            <ArrowBackIosNewIcon />
          </Box>
        ) : (
          ''
        )}
        <Box
          className={classes.logoContainer}
          sx={{
            margin: {
              lg: '0',
              sm: '0 auto',
              xs: '0 auto',
            },
            textAlign: {
              sm: 'center',
              xs: 'center',
            },
          }}
        >
          <a className={classes.linkLogo} href="/">
            <img src="/images/logo-full.svg" />
          </a>
        </Box>
        <Box className={classes.hamburgerHolder}>
          <Box
            className={` ${classes.hamburger}  ${open ? 'is-active' : ''}`}
            onClick={() => setOpen(!open)}
          >
            <Box className={classes.hamburgerBox}>
              <Box className="hamburger-inner" />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  header: {
    position: 'sticky',
    top: 0,
    zIndex: '1100',
    WebkitBackdropFilter: 'blur(20px)',
    backdropFilter: 'blur(20px)',
    boxShadow: 'inset 0px -1px 1px #eaeef3',
    backgroundColor: 'rgba(255,255,255,0.72)',
  },
  container: { position: 'relative' },
  logoContainer: { padding: '5px', marginRight: '20px', width: '180px' },
  linkLogo: {
    display: 'block',
    '& img': {
      width: 'auto',
      height: '40px',
    },
  },
  hamburgerHolder: {
    position: 'absolute',
    right: '20px',
    top: '0',
    bottom: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hamburger: {
    padding: '10px 10px',
    cursor: 'pointer',
    transitionProperty: 'opacity, filter',
    transitionDuration: '0.15s',
    transitionTimingFunction: 'linear',
    font: 'inherit',
    color: 'inherit',
    textTransform: 'none',
    backgroundColor: 'transparent',
    border: '0',
    margin: '0',
    overflow: 'visible',
    '&:hover': {
      opacity: 0.7,
    },
    '&.is-active:hover': {
      opacity: 0.7,
    },
    '&.is-active .hamburger-inner': {
      backgroundColor: '#000',
      transform: 'translate3d(0, 10px, 0) rotate(45deg)',
    },
    '&.is-active .hamburger-inner:before': {
      backgroundColor: '#000',
      transform: 'rotate(-45deg) translate3d(-5.71429px, -6px, 0)',
      opacity: 0,
    },
    '&.is-active .hamburger-inner:after': {
      backgroundColor: '#000',
      transform: 'translate3d(0, -20px, 0) rotate(-90deg)',
    },
    '& .hamburger-inner': {
      display: 'block',
      top: '6px',
      marginTop: '-2px',
      width: '26px',
      height: '2px',
      backgroundColor: '#000',
      borderRadius: '4px',
      position: 'absolute',
      transitionProperty: 'transform',
      transitionDuration: '0.15s',
      transitionTimingFunction: 'ease',
      content: "''",
    },
    '& .hamburger-inner::before': {
      width: '26px',
      height: '2px',
      backgroundColor: '#000',
      borderRadius: '4px',
      position: 'absolute',
      transitionProperty: 'transform',
      transitionDuration: '0.15s',
      transitionTimingFunction: 'ease',
      content: "''",
      display: 'block',
      top: '10px',
    },
    '& .hamburger-inner::after': {
      width: '26px',
      height: '2px',
      content: "''",
      display: 'block',
      backgroundColor: '#000',
      borderRadius: '4px',
      position: 'absolute',
      transitionProperty: 'transform',
      transitionDuration: '0.15s',
      transitionTimingFunction: 'ease',
      bottom: '-10px',
      top: '20px',
    },
  },
  hamburgerBox: {
    width: '26px',
    height: '26px',
    display: 'inline-block',
    position: 'relative',
  },
  isActive: {},
}))

export default Header
