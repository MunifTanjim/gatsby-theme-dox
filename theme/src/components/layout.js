/** @jsx jsx */
import { Global } from '@emotion/core'
import { css, jsx, Styled } from 'theme-ui'
import useSidebar from '../hooks/useSidebar'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import SidebarToggler from './Sidebar/Toggler'

function Layout({ children }) {
  const [sidebar, sidebarOpen, setSidebarOpen] = useSidebar()

  return (
    <Styled.root sx={{ variant: 'layout.root' }}>
      <Global styles={css({ variant: 'layout.global' })} />

      <SidebarToggler
        sidebar={sidebar}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />
      <Sidebar sidebar={sidebar} open={sidebarOpen} setOpen={setSidebarOpen} />

      <div
        className={sidebarOpen ? 'pushed' : ''}
        sx={{ variant: 'layout.main' }}
      >
        <Navbar />

        <main
          id="content"
          sx={{
            variant: 'layout.container',
            '& > :first-child': { pt: '0.75rem' }
          }}
        >
          {children}
        </main>
      </div>
    </Styled.root>
  )
}

export default Layout
