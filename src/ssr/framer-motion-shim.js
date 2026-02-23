import { forwardRef, createElement } from 'react'

const animationProps = new Set([
  'initial', 'animate', 'exit', 'transition', 'variants',
  'whileHover', 'whileTap', 'whileFocus', 'whileDrag', 'whileInView',
  'drag', 'dragConstraints', 'dragElastic', 'dragMomentum',
  'onDragStart', 'onDrag', 'onDragEnd',
  'layout', 'layoutId',
  'onAnimationStart', 'onAnimationComplete',
])

function filterProps(props) {
  const filtered = {}
  for (const key in props) {
    if (!animationProps.has(key)) {
      filtered[key] = props[key]
    }
  }
  return filtered
}

const motionHandler = {
  get(_, tag) {
    return forwardRef((props, ref) =>
      createElement(tag, { ...filterProps(props), ref })
    )
  },
}

export const motion = new Proxy({}, motionHandler)

export function AnimatePresence({ children }) {
  return children
}

export function useInView() {
  return true
}
