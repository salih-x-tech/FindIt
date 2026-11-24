const ITEMS_KEY = 'findit_items'
const CLAIMS_KEY = 'findit_claims'

// Safely read data from LocalStorage
function readStorage(key) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

// Save data to LocalStorage
function writeStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

// Items
export function getItems() {
  return readStorage(ITEMS_KEY)
}

export function addItem(item) {
  const items = getItems()

  const newItem = {
    ...item,
    id: crypto.randomUUID(),
    status: 'active',
    createdAt: new Date().toISOString(),
  }

  writeStorage(ITEMS_KEY, [...items, newItem])

  return newItem
}

export function updateItemStatus(id, status) {
  const items = getItems()

  const updatedItems = items.map((item) =>
    item.id === id ? { ...item, status } : item,
  )

  writeStorage(ITEMS_KEY, updatedItems)
}

// Claims
export function getClaims() {
  return readStorage(CLAIMS_KEY)
}

export function addClaim(claim) {
  const claims = getClaims()

  const newClaim = {
    ...claim,
    id: crypto.randomUUID(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  }

  writeStorage(CLAIMS_KEY, [...claims, newClaim])

  return newClaim
}

export function updateClaimStatus(id, status) {
  const claims = getClaims()

  const updatedClaims = claims.map((claim) =>
    claim.id === id ? { ...claim, status } : claim,
  )

  writeStorage(CLAIMS_KEY, updatedClaims)
}

// Find possible matches between lost and found items
export function findMatches(items) {
  const lostItems = items.filter(
    (item) => item.type === 'lost' && item.status === 'active',
  )

  const foundItems = items.filter(
    (item) => item.type === 'found' && item.status === 'active',
  )

  const normalize = (value) =>
    (value || '').trim().toLowerCase()

  const getKeywords = (description) =>
    normalize(description)
      .split(/\W+/)
      .filter((word) => word.length > 2)

  const matches = []

  lostItems.forEach((lostItem) => {
    foundItems.forEach((foundItem) => {
      let score = 0

      if (normalize(lostItem.category) === normalize(foundItem.category)) {
        score += 30
      }

      if (normalize(lostItem.color) === normalize(foundItem.color)) {
        score += 25
      }

      if (normalize(lostItem.location) === normalize(foundItem.location)) {
        score += 25
      }

      const lostKeywords = new Set(getKeywords(lostItem.description))
      const foundKeywords = new Set(getKeywords(foundItem.description))

      const sharedKeywords = [...lostKeywords].filter((word) =>
        foundKeywords.has(word),
      )

      const allKeywords = new Set([
        ...lostKeywords,
        ...foundKeywords,
      ])

      if (allKeywords.size > 0) {
        score += Math.round(
          (sharedKeywords.length / allKeywords.size) * 20,
        )
      }

      if (score > 0) {
        matches.push({
          lostItem,
          foundItem,
          score,
        })
      }
    })
  })

  return matches.sort((a, b) => b.score - a.score)
}
