import React, { useState } from 'react'
import Header from './Header'
import { makeStyles } from '@mui/styles'

interface MainLayoutProps {
  isBanner?: boolean
  darkMode?: boolean
  regular?: boolean
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, darkMode }) => {
  const [open, letOpen] = useState(false)
  const setOpen = (val: boolean) => {
    letOpen(val)
  }
  const classes = useStyles()
  return (
    <div
      className={
        'wrapper ' + (open ? 'open' : '') + (darkMode ? 'dark-theme' : '')
      }
    >
      <div className={classes.main} role="main">
        <Header open={open} setOpen={setOpen} />
        <div className={classes.wrapper}>{children}</div>
      </div>
    </div>
  )
}

const useStyles = makeStyles({
  main: {
    width: '100%',
    display: 'block',
  },
  wrapper: {
    position: 'relative',
    paddingTop: 40,
  },
})
export default MainLayout
