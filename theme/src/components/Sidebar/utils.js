const extendItem = item => {
  if (!item.items) return

  item.items.forEach(childItem => {
    childItem.level = item.level + 1
    childItem.parentTitle = item.title

    extendItem(childItem)
  })
}

const extendItems = (items = []) => {
  items.forEach(item => {
    item.level = 0

    extendItem(item)
  })
  return items
}

export const extendData = data => {
  return {
    title: data.title,
    logo: data.logo,
    items: extendItems(data.items)
  }
}

const isItemActive = (item, location) => {
  const linkMatchesPathname = item.link === location.pathname

  if (linkMatchesPathname) {
    return item
  }

  return false
}

export const getActiveItem = (items, location) => {
  for (const item of items) {
    if (item.link) {
      if (isItemActive(item, location)) return item
    }

    if (item.items) {
      const activeSubItem = getActiveItem(item.items, location)
      if (activeSubItem) return activeSubItem
    }
  }

  return false
}

const isItemParentActive = (items, parentTitle) => {
  for (const item of items) {
    if (item.title === parentTitle) return item

    if (item.items) {
      for (const items of item.items) {
        const activeSubItem = isItemParentActive([items], parentTitle)

        if (activeSubItem) return activeSubItem
      }
    }
  }

  return false
}

export const getActiveItemParents = (items, activeItem, activeItemParents) => {
  if (activeItem.parentTitle) {
    const activeParent = isItemParentActive(items, activeItem.parentTitle)

    activeItemParents.push(activeParent.title)

    return getActiveItemParents(items, activeParent, activeItemParents)
  } else {
    return activeItemParents
  }
}
