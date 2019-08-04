/** @jsx jsx */
import { useCallback, useState } from 'react'
import { jsx } from 'theme-ui'
import sidebarData from '../../sidebar.yaml'
import Branding from './Branding'
import Item, { isItemActive } from './Item'
import { extendData, getActiveItem, getActiveItemParents } from './utils'

const setOpenItems = (state, items) => {
  for (const item of items) {
    if (item.items) {
      state.openItems[item.title] =
        isItemActive(state.activeItemParents, item) ||
        state.activeItem.title === item.title

      setOpenItems(state, item.items)
    }
  }
}

const { items, title, logo } = extendData(sidebarData)

function Sidebar({ sidebar, open, location }) {
  const [state, setState] = useState(() => {
    const activeItem = getActiveItem(items, location)

    const state = {
      openItems: {},
      activeItem,
      activeItemParents: getActiveItemParents(items, activeItem, [])
    }

    setOpenItems(state, items)

    return state
  })

  const toggleItem = useCallback(item => {
    setState(state => ({
      ...state,
      openItems: {
        ...state.openItems,
        [item.title]: !state.openItems[item.title]
      }
    }))
  }, [])

  const { openItems, activeItem, activeItemParents } = state

  return (
    <section
      id="__sidebar"
      key="sidebar"
      ref={sidebar}
      aria-expanded={open}
      tabIndex="-1"
      className={open ? 'active' : ''}
      sx={{ variant: 'layout.sidebar', zIndex: 99 }}
    >
      <Branding title={title} logo={logo} />

      <nav
        aria-label="Navigation Menu"
        sx={{
          variant: 'layout.container',
          px: 0,
          ul: { listStyle: 'none', m: 0, p: 0 }
        }}
      >
        <ul sx={{ ul: { pl: '1.5em' } }}>
          {items.map((item, index) => (
            <Item
              key={index}
              item={item}
              location={location}
              openItems={openItems}
              activeItem={activeItem}
              activeItemParents={activeItemParents}
              toggleItem={toggleItem}
            />
          ))}
        </ul>
      </nav>
    </section>
  )
}

export default Sidebar
