import * as React from 'react'

export default function useHoverWithRef(ref: React.RefObject<HTMLElement>) {
  const [isHover, setIsHover] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    const onMouseEnter = () => setIsHover(true)
    const onMouseLeave = () => setIsHover(false)

    const el = ref.current
    el?.addEventListener('mouseenter', onMouseEnter)
    el?.addEventListener('mouseleave', onMouseLeave)
    return () => {
      el?.removeEventListener('mouseenter', onMouseEnter)
      el?.removeEventListener('mouseleave', onMouseLeave)
    }
  })

  return isHover
}
