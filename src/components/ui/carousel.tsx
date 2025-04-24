import { ReactNode, useState } from "react"

export function Carousel({ children }: { children: ReactNode }) {
  return <div className="overflow-hidden relative">{children}</div>
}

export function CarouselContent({ children }: { children: ReactNode }) {
  return <div className="flex transition-transform duration-300">{children}</div>
}

export function CarouselItem({ children }: { children: ReactNode }) {
  return <div className="min-w-full">{children}</div>
}

export function CarouselPrevious({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-2 py-1 bg-white rounded shadow hover:bg-gray-100"
    >
      ←
    </button>
  )
}

export function CarouselNext({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-2 py-1 bg-white rounded shadow hover:bg-gray-100"
    >
      →
    </button>
  )
}
