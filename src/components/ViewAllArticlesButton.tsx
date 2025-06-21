'use client'

import Link from 'next/link'
import { BounceButton } from '../components/ui/bounce-button'

export default function ViewAllArticlesButton() {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-center py-5 bg-gradient-to-t from-blue-50 dark:from-gray-950">
      <BounceButton variant="default" size="sm">
        <Link href="/articles">
          <span>View All Article</span>
        </Link>
      </BounceButton>
    </div>
  )
}
