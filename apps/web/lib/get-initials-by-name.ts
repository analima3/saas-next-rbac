export function getUserInitialsByName(name: string): string {
  const trimmedName = name.trim()

  if (!trimmedName) return ''

  return trimmedName
    .split(/\s+/)
    .flatMap((part) => {
      const firstLetter = part.match(/[A-Za-zÀ-ÖØ-öø-ÿ]/)?.[0]
      return firstLetter ? [firstLetter] : []
    })
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
