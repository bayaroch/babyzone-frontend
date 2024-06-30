import React, { PropsWithChildren, useState } from 'react'
import Header from './Header'
import { CustomDrawer } from './CustomDrawer'

interface MainLayoutProps {
  isBanner?: boolean
  darkMode?: boolean
  regular?: boolean
}

const MainLayout: React.FC<MainLayoutProps & PropsWithChildren> = ({
  children,
  darkMode,
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
        <div style={{ position: 'relative', paddingTop: 40 }}>{children}</div>
      </div>
      <CustomDrawer open={open} toggleDrawer={(val: boolean) => setOpen(val)} />
    </div>
  )
}

export default MainLayout
