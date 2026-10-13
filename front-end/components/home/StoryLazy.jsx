'use client'

import dynamic from 'next/dynamic'

function StoryLoading() {
  return (
    <div className="flex h-[60vh] items-center justify-center py-10">
      <div className="size-10 animate-pulse rounded-full border border-line" />
    </div>
  )
}

export default dynamic(
  () => import('@/components/home/Story').then((m) => m.Story),
  { ssr: false, loading: StoryLoading },
)