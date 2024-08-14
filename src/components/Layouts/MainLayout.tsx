import React, { PropsWithChildren, useState } from 'react'
import Header from './Header'
import { CustomDrawer } from './CustomDrawer'
import { Box, SxProps } from '@mui/material'

interface MainLayoutProps {
  isBanner?: boolean
  darkMode?: boolean
  regular?: boolean
  containerSX?: SxProps
}

const MainLayout: React.FC<MainLayoutProps & PropsWithChildren> = ({
  children,
  darkMode,
  containerSX,
}) => {
  const [open, letOpen] = useState(false)
  const setOpen = (val: boolean) => {
    letOpen(val)
  }
  return (
    <div
      className={
        'wrapper ' + (open ? 'open' : '') + (darkMode ? 'dark-theme' : '')
      }
    >
      <div className="main" role="main">
        <Header open={open} setOpen={setOpen} />
        <Box sx={{ position: 'relative', paddingTop: 3, ...containerSX }}>
          {children}
        </Box>
      </div>
      <CustomDrawer open={open} toggleDrawer={(val: boolean) => setOpen(val)} />
    </div>
  )
}

export default MainLayout
