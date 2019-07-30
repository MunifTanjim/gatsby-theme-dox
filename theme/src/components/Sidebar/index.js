/** @jsx jsx */
import { Location } from '@reach/router'
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

function Sidebar({
  sidebar,
  open,
  setOpen,
  toggler,
  location,
  title,
  items,
  logo
}) {
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
      <nav sx={{ ul: { listStyle: 'none' } }}>
        <Branding title={title} logo={logo} />

        <ul sx={{ m: 0, p: 0, ul: { pl: '1.5em' } }}>
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

const data = extendData(sidebarData)

export default props => (
  <Location>
    {({ location }) => (
      <Sidebar
        {...props}
        location={location}
        items={data.items}
        title={data.title}
        logo={data.logo}
      />
    )}
  </Location>
)
