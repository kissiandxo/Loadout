"use client"

import { useId } from "react"
import Particles, { ParticlesProvider, useParticlesProvider } from "@tsparticles/react"
import type { ISourceOptions } from "@tsparticles/engine"
import { loadSlim } from "@tsparticles/slim"

interface SparklesProps {
  className?: string
  size?: number
  minSize?: number | null
  density?: number
  speed?: number
  minSpeed?: number | null
  opacity?: number
  opacitySpeed?: number
  minOpacity?: number | null
  color?: string
  background?: string
  direction?: string
  options?: Partial<ISourceOptions>
}

function SparklesContent({
  className,
  particleOptions,
}: {
  className?: string
  particleOptions: ISourceOptions
}) {
  const { loaded } = useParticlesProvider()
  const id = useId()

  if (!loaded) return null

  return (
    <Particles
      id={id}
      options={particleOptions}
      className={className}
    />
  )
}

export function Sparkles({
  className,
  size = 1,
  minSize = null,
  density = 800,
  speed = 1,
  minSpeed = null,
  opacity = 1,
  opacitySpeed = 3,
  minOpacity = null,
  color = "#FFFFFF",
  background = "transparent",
  options = {},
}: SparklesProps) {
  const particleOptions: ISourceOptions = {
    background: { color: { value: background } },
    fullScreen: { enable: false, zIndex: 1 },
    fpsLimit: 120,
    particles: {
      color: { value: color },
      move: {
        enable: true,
        direction: "none",
        speed: { min: minSpeed ?? speed / 10, max: speed },
        straight: false,
      },
      number: { value: density },
      opacity: {
        value: { min: minOpacity ?? opacity / 10, max: opacity },
        animation: { enable: true, sync: false, speed: opacitySpeed },
      },
      size: { value: { min: minSize ?? size / 2.5, max: size } },
    },
    detectRetina: true,
    ...options,
  }

  return (
    <ParticlesProvider init={(engine) => loadSlim(engine)}>
      <SparklesContent className={className} particleOptions={particleOptions} />
    </ParticlesProvider>
  )
}
