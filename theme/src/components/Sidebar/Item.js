/** @jsx jsx */
import { useRef } from 'react'
import { jsx } from 'theme-ui'
import ItemTitle from './ItemTitle'

export const isItemActive = (activeItemParents, item) => {
  if (activeItemParents) {
    for (let parent of activeItemParents) {
      if (parent === item.title) return true
    }
  }

  return false
}

function Item({
  item,
  location,
  openItems,
  activeItem,
  activeItemParents,
  toggleItem
}) {
  const isParentOfActiveItem = isItemActive(activeItemParents, item)
  const isActive = item.link === location.pathname || isParentOfActiveItem

  const isExpanded = openItems[item.title]

  const id = useRef(item.title.replace(/\W+/g, '')).current

  return (
    <li>
      <ItemTitle
        id={id}
        item={item}
        isActive={isActive}
        isExpanded={isExpanded}
        toggleItem={toggleItem}
      />

      {item.items && (
        <ul
          id={id}
          aria-expanded={isExpanded}
          sx={{ display: isExpanded ? 'block' : 'none' }}
        >
          {item.items.map(subitem => (
            <Item
              key={subitem.title}
              item={subitem}
              location={location}
              openItems={openItems}
              activeItem={activeItem}
              activeItemParents={activeItemParents}
              toggleItem={toggleItem}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export default Item
