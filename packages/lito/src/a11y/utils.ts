export const isInputLike = (target: EventTarget | null) => {
  if (!target) return false
  if (!(target instanceof HTMLElement)) return false
  return !!target.closest('a, button, input, textarea')
}
