import React from 'react'

export default function useBoundingClientRect(
  ref: React.RefObject<HTMLElement>
) {
  const [boundingClientRect, setBoundingClientRect] =
    React.useState<DOMRect | null>(null)

  React.useEffect(() => {
    const updateBoundingRect = () => {
      setBoundingClientRect(ref.current?.getBoundingClientRect() || null)
    }

    if (ref.current) {
      updateBoundingRect()
    }

    window.addEventListener('resize', updateBoundingRect)
    return () => {
      window.removeEventListener('resize', updateBoundingRect)
    }
  }, [ref])

  return boundingClientRect
}
