import type * as React from "react"

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" {...props}>
      <path d="M19.53 4.53a6.007 6.007 0 00-8.06-4.14L4.53 11.47a6.007 6.007 0 004.14 8.06l6.94 6.94a6.007 6.007 0 008.06-4.14l4.14-8.06a6.007 6.007 0 00-4.14-8.06zM12 16a4 4 0 110-8 4 4 0 010 8zm0-6a2 2 0 100 4 2 2 0 000-4zM5 10a1 1 0 110-2 1 1 0 010 2z" />
    </svg>
  )
}

export { TikTokIcon }

