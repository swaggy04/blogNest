import React, { useState } from 'react'
import CreateArticleModal from '../components/CreateArticleModal'

const SomePage: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <button onClick={() => setOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        New Article
      </button>
      <CreateArticleModal open={open} onOpenChange={setOpen} />
    </>
  )
}

export default SomePage 