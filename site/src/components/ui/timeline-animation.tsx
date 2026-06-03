"use client"

import { motion, useInView, Variants } from "motion/react"
import { ElementType, ReactNode, RefObject } from "react"

interface TimelineContentProps {
  children: ReactNode
  animationNum: number
  timelineRef: RefObject<HTMLElement | HTMLDivElement | null>
  customVariants: Variants
  className?: string
  as?: ElementType
}

export function TimelineContent({
  children,
  animationNum,
  timelineRef,
  customVariants,
  className,
  as: _as,
}: TimelineContentProps) {
  const isInView = useInView(timelineRef as RefObject<Element>, {
    once: true,
    margin: "0px 0px -80px 0px",
  })

  return (
    <motion.div
      custom={animationNum}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={customVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
