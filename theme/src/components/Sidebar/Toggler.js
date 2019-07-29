/** @jsx jsx */
import { useCallback } from 'react'
import { jsx } from 'theme-ui'
import Hamburger from '../Hamburger'
import SidebarOverlay from './Overlay'
import hex2rbga from 'hex2rgba'

const togglerStyle = {
  display: ['block', null, 'none'],
  position: 'fixed',
  right: 4,
  bottom: 4,
  zIndex: 100
}

function SidebarToggler({ sidebar, open, setOpen }) {
  const toggleSidebar = useCallback(() => {
    setOpen(open => {
      return !open
    })
  }, [setOpen])

  return (
    <span sx={togglerStyle}>
      <Hamburger open={open} onClick={toggleSidebar} />

      {open && (
        <SidebarOverlay>
          <div
            role="presentation"
            onMouseDown={toggleSidebar}
            sx={{
              display: ['block', null, 'none'],
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: theme => hex2rbga(theme.colors.background, 0.7)
            }}
          />
        </SidebarOverlay>
      )}
    </span>
  )
}

export default SidebarToggler
