import { memo } from 'preact/compat'
import { useCallback } from 'preact/hooks'

import { RefetchButtonProps } from '../../types'

const RefetchButton = memo(({
  onClick,
  iconSrc,
  iconSrcSet,
  size = 24,
  className = ''
}: RefetchButtonProps) => {
  const handleClick = useCallback(() => {
    onClick()
  }, [onClick])

  return (
    <button
      onClick={handleClick}
      aria-label="Refetch data"
      className={`
        ${className}
        transition-transform transform
        active:scale-95
        focus:outline-none
      `}
    >
      <img
        src={iconSrc}
        srcSet={iconSrcSet}
        sizes={`${size}px`}
        width={size}
        height={size}
        alt=""
        aria-hidden="true"
        className="w-full h-full"
      />
    </button>
  )
})

export default RefetchButton