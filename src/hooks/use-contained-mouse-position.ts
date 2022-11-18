import * as React from 'react'

type Position = {
  x: number | null
  y: number | null
}

export default function useContainedMousePosition(
  ref: React.RefObject<HTMLElement>
) {
  const [mousePosition, setMousePosition] = React.useState<Position>({
    x: null,
    y: null,
  })

  React.useEffect(() => {
    const updatePosition = (ev: MouseEvent) => {
      setMousePosition({
        x: ev.offsetX,
        y: ev.offsetY,
      })
    }

    const el = ref.current
    el?.addEventListener('mousemove', updatePosition)
    return () => {
      el?.removeEventListener('mousemove', updatePosition)
    }
  }, [ref])

  return mousePosition
}
