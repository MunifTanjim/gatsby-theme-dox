/** @jsx jsx */
import { jsx } from 'theme-ui'
import NavbarData from '../navbar.yaml'
import Link from './Link'

function Navbar() {
  return (
    <nav id="navigation-menu" aria-label="Navigation Menu">
      <div
        sx={{
          variant: 'layout.container',
          textAlign: 'right'
        }}
      >
        <ul sx={{ m: 0, ml: 'auto', p: 0, listStyle: 'none' }}>
          {NavbarData.items.map(item => (
            <li key={item.link} sx={{ ml: 3, display: 'inline-block' }}>
              <Link to={item.link} sx={{ variant: 'linkStyles.nav' }}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
