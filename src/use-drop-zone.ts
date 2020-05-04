import { useState, useRef, DragEventHandler, useMemo } from 'react'

export interface DropHandlers {
  onDragEnter: DragEventHandler
  onDragLeave: DragEventHandler
  onDrop: DragEventHandler
}

function useDropZone(onFiles: (files: File[]) => void): [Boolean, DropHandlers] {
  const [isOverDropZone, setIsOverDropZone] = useState<Boolean>(false)
  const counter = useRef(0)

  const handlers: DropHandlers = useMemo(
    () => ({
      onDragEnter(event) {
        event.preventDefault()
        counter.current++
      },
      onDragLeave(event) {
        event.preventDefault()
        counter.current--
        if (counter.current === 0) {
          setIsOverDropZone(false)
        }
      },
      onDrop(event) {
        counter.current = 0
        setIsOverDropZone(false)
        event.persist()
        onFiles(Array.from(event?.dataTransfer?.files ?? []))
      }
    }),
    [onFiles]
  )

  return [isOverDropZone, handlers]
}

export default useDropZone
