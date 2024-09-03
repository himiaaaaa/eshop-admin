import React from 'react'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'

const deleteButton = () => {
  return (
    <div>
        <Button>
          <Trash className="h-4 w-4" />
        </Button>
    </div>
  )
}

export default deleteButton