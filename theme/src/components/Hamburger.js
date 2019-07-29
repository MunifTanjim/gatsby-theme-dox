/** @jsx jsx */
import { jsx } from 'theme-ui'

const hamburgerStyles = {
  cursor: 'pointer',
  color: 'background',
  backgroundColor: 'primary',
  m: 0,
  p: '1rem',
  border: 0,
  borderRadius: '50%',

  '.Hamburger-box': {
    display: 'block',
    position: 'relative',
    width: 30,
    height: 30
  },

  '.Hamburger-stick': {
    backgroundColor: 'background',
    borderRadius: '4px',
    display: 'block',
    position: 'absolute',
    top: '50%',
    width: 30,
    height: '4px',
    mt: '-2px',
    [[':before', ':after']]: {
      backgroundColor: 'background',
      display: 'block',
      content: "''",
      position: 'absolute',
      width: 30,
      height: '4px',
      borderRadius: '4px'
    },
    ':before': {
      top: '-10px'
    },
    ':after': {
      bottom: '-10px'
    }
  },

  '&.active': {
    '.Hamburger-stick': {
      transform: 'rotate(45deg)',
      ':before': {
        top: 0,
        opacity: 0
      },
      ':after': {
        bottom: 0,
        transform: 'rotate(-90deg)'
      }
    }
  }
}

function Hamburger({ open, onClick, ...props }) {
  return (
    <button
      {...props}
      onClick={onClick}
      className={open ? 'active' : ''}
      sx={hamburgerStyles}
    >
      <span className="Hamburger-box">
        <span className="Hamburger-stick"></span>
      </span>
    </button>
  )
}

export default Hamburger
