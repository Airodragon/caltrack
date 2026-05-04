import React from 'react'

export default function SkeletonBlock({ height = 16, width = '100%', radius = 10, style }) {
  return (
    <div
      className="skeleton-block"
      style={{
        height,
        width,
        borderRadius: radius,
        ...style,
      }}
    />
  )
}
