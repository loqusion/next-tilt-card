import * as React from 'react'

export default function useHover(): [
  boolean | null,
  {
    onMouseEnter: React.MouseEventHandler
    onMouseLeave: React.MouseEventHandler
  }
] {
  const [isHover, setIsHover] = React.useState<boolean | null>(null)

  const onMouseEnter = React.useCallback(() => {
    setIsHover(true)
  }, [])
  const onMouseLeave = React.useCallback(() => {
    setIsHover(false)
  }, [])

  return [isHover, { onMouseEnter, onMouseLeave }]
}
