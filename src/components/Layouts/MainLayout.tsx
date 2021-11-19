import React, { useState } from 'react'
import { Header } from './Header'

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

  return (
    <div
      className={
        'wrapper ' + (open ? 'open' : '') + (darkMode ? 'dark-theme' : '')
      }
    >
      <div className="main">
        <Header open={open} setOpen={setOpen} />
        <div className="content-wrapper">{children}</div>
      </div>
    </div>
  )
}

export default MainLayout
