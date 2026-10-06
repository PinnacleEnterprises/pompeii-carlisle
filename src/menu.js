import menu from './menu.json'


const categoriesElement = document.querySelector('[data-menu-categories]')


function createElement(tag, className, text) {
  const element = document.createElement(tag)

  if (className) {
    element.className = className
  }

  if (text !== undefined && text !== null) {
    element.textContent = text
  }

  return element
}


function createPrice(value) {
  if (!value) return null

  const [dollars, cents] = String(value).split('.')

  const price = createElement('span', 'price')
  const whole = createElement('span', 'dollars', dollars)

  price.append(whole)

  if (cents) {
    const fraction = createElement('sup', 'cents', cents)
    price.append(fraction)
  }

  return price
}


function createName(tag, name, advisory = false) {
  const element = createElement(tag, 'name')

  if (advisory) {
    const marker = createElement('span', 'advisory-mark', '*')

    element.append(
      marker,
      document.createTextNode(' ')
    )
  }

  element.append(
    document.createTextNode(name)
  )

  return element
}


function getEntryName(entry) {
  return entry.type === 'group'
    ? entry.label
    : entry.name
}


function sortEntries(entries = []) {
  return [...entries].sort((a, b) => {
    const aHasOrder = Number.isFinite(a.order)
    const bHasOrder = Number.isFinite(b.order)

    if (!aHasOrder && !bHasOrder) {
      return getEntryName(a).localeCompare(
        getEntryName(b),
        undefined,
        { sensitivity: 'base' }
      )
    }

    if (!aHasOrder) return -1
    if (!bHasOrder) return 1

    if (a.order !== b.order) {
      return a.order - b.order
    }

    return getEntryName(a).localeCompare(
      getEntryName(b),
      undefined,
      { sensitivity: 'base' }
    )
  })
}


function createItem(item) {
  const article = createElement('article', 'item')
  const header = document.createElement('header')

  header.append(
    createName('h4', item.name, item.advisory)
  )

  const price = createPrice(item.price)

  if (price) {
    header.append(price)
  }

  article.append(header)

  if (item.description) {
    article.append(
      createElement('p', 'description', item.description)
    )
  }

  if (item.note) {
    article.append(
      createElement('p', 'note', item.note)
    )
  }

  return article
}


function createGroup(group) {
  const article = createElement('article', 'item grouped-item')
  const header = document.createElement('header')

  header.append(
    createName('h4', group.label)
  )

  const price = createPrice(group.price)

  if (price) {
    header.append(price)
  }

  article.append(header)

  const names = sortEntries(group.items)
    .map((item) => item.name)
    .filter(Boolean)
    .join(', ')

  if (names) {
    article.append(
      createElement(
        'p',
        'description grouped-items-list',
        names
      )
    )
  }

  return article
}


function createEntry(entry) {
  if (entry.type === 'group') {
    return createGroup(entry)
  }

  return createItem(entry)
}


function createOptions(section) {
  if (!section.extras?.length) return null

  const options = createElement('div', 'options')

  sortEntries(section.extras).forEach((extra) => {
    const option = createElement('div', 'option')

    option.append(
      createName('span', extra.name, extra.advisory)
    )

    const price = createPrice(extra.price)

    if (price) {
      option.append(price)
    }

    options.append(option)
  })

  return options
}


function createCategory(section, orderIndex) {
  const category = createElement('section', 'category')

  category.id = section.id
  category.style.setProperty('--menu-order', orderIndex)

  const header = document.createElement('header')

  header.append(
    createElement('h3', 'title', section.title)
  )

  if (section.subtitle) {
    header.append(
      createElement('p', 'subtitle', section.subtitle)
    )
  }

  category.append(header)

  section.notes?.forEach((note) => {
    category.append(
      createElement('p', 'note', note)
    )
  })

  const options = createOptions(section)

  if (options) {
    category.append(options)
  }

  const items = createElement('div', 'items')

  sortEntries(section.entries).forEach((entry) => {
    items.append(
      createEntry(entry)
    )
  })

  category.append(items)

  return category
}


function renderMenu() {
  if (!categoriesElement) {
    console.error('Menu categories container not found.')
    return
  }

  const leftColumn = createElement(
    'div',
    'menu-column menu-column--left'
  )

  const rightColumn = createElement(
    'div',
    'menu-column menu-column--right'
  )

  categoriesElement.replaceChildren(
    leftColumn,
    rightColumn
  )

  const orderedSections = menu.sections
    .map((section, sourceIndex) => ({
      section,
      sourceIndex
    }))
    .sort((a, b) => {
      const orderA = a.section.order ?? Number.MAX_SAFE_INTEGER
      const orderB = b.section.order ?? Number.MAX_SAFE_INTEGER

      return orderA - orderB || a.sourceIndex - b.sourceIndex
    })

  const isMobile = window.matchMedia(
    '(max-width: 600px) and (orientation: portrait)'
  ).matches

  orderedSections.forEach(({ section }, index) => {
    const category = createCategory(section, index)

    if (isMobile) {
      const column = index % 2 === 0
        ? leftColumn
        : rightColumn

      column.append(category)
      return
    }

    if (index === 0) {
      leftColumn.append(category)
      return
    }

    if (index === 1) {
      rightColumn.append(category)
      return
    }

    const leftHeight =
      leftColumn.getBoundingClientRect().height

    const rightHeight =
      rightColumn.getBoundingClientRect().height

    if (leftHeight <= rightHeight) {
      leftColumn.append(category)
    } else {
      rightColumn.append(category)
    }
  })
}


renderMenu()
