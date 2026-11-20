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
