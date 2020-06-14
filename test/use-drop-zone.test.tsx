import React from 'react'
import * as utils from '@testing-library/react'
import useDropZone from '../src/use-drop-zone'
import { fireEvent } from '@testing-library/react'

/**
 * Dummy test
 */
describe('useDropZone', () => {
  it('Nested children do not affect isOverDropZone', () => {
    let onDrop = jest.fn()
    let isOverDropZone
    function Component() {
      const [isOver, handlers] = useDropZone(onDrop)
      isOverDropZone = isOver

      return (
        <div {...handlers}>
          <div>
            <p>A</p>
            <div>
              <p>B</p>
              <div>
                <p>C</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
    const { getByText } = utils.render(<Component />)
    const child = getByText('A')
    const grandChild = getByText('B')
    const grandGrandChild = getByText('C')

    utils.fireEvent.dragEnter(child)
    // Enter grandChild
    utils.fireEvent.dragEnter(grandChild)
    // Enter grandGrandChild
    utils.fireEvent.dragEnter(grandGrandChild)

    expect(isOverDropZone).toEqual(true)

    // Leave grandGrandChild
    utils.fireEvent.dragLeave(grandGrandChild)

    expect(isOverDropZone).toEqual(true)

    // Leave grandChild
    utils.fireEvent.dragLeave(grandChild)

    expect(isOverDropZone).toEqual(true)

    // Leave child
    utils.fireEvent.dragLeave(grandChild)

    expect(isOverDropZone).toEqual(false)
  })

  it('Sibling children do not affect is overDropZone', () => {
    let onDrop = jest.fn()
    let isOverDropZone
    function Component() {
      const [isOver, handlers] = useDropZone(onDrop)
      isOverDropZone = isOver

      return (
        <div {...handlers}>
          <p>A</p>
          <p>B</p>
          <p>C</p>
        </div>
      )
    }
    const { getByText } = utils.render(<Component />)
    const firstSibling = getByText('A')
    const secondSibling = getByText('B')
    const thirdSibling = getByText('C')

    fireEvent.dragEnter(firstSibling)

    expect(isOverDropZone).toEqual(true)

    // Move to second sibling
    fireEvent.dragEnter(secondSibling)

    fireEvent.dragLeave(firstSibling)

    expect(isOverDropZone).toEqual(true)

    // Move to third sibling
    fireEvent.dragEnter(thirdSibling)

    fireEvent.dragLeave(secondSibling)

    expect(isOverDropZone).toEqual(true)

    // Leave third sibling
    fireEvent.dragLeave(thirdSibling)

    expect(isOverDropZone).toEqual(false)
  })

  it('When file is dropped call onDrop', () => {
    let onDrop = jest.fn()
    let isOverDropZone
    function Component() {
      const [isOver, handlers] = useDropZone(onDrop)
      isOverDropZone = isOver

      return (
        <div id="drop-zone" {...handlers}>
          <p>A</p>
        </div>
      )
    }
    const { getByText } = utils.render(<Component />)
    const child = getByText('A')
    const files = [new File([], 'a-cool-file.png')]

    fireEvent.dragEnter(child)

    fireEvent.drop(child, {
      dataTransfer: {
        files
      }
    })

    expect(isOverDropZone).toEqual(false)
    expect(onDrop).toHaveBeenCalledWith(files)
  })

  it('When files are empty return null', () => {
    let onDrop = jest.fn()
    let isOverDropZone
    function Component() {
      const [isOver, handlers] = useDropZone(onDrop)
      isOverDropZone = isOver

      return (
        <div {...handlers}>
          <p>A</p>
        </div>
      )
    }
    const { getByText } = utils.render(<Component />)
    const child = getByText('A')

    fireEvent.dragEnter(child)

    fireEvent.drop(child, {
      dataTransfer: {
        files: []
      }
    })
    expect(isOverDropZone).toEqual(false)
    expect(onDrop).toHaveBeenCalledWith(null)
  })

  it('When error on drop return null', () => {
    let onDrop = jest.fn()
    let isOverDropZone
    function Component() {
      const [isOver, handlers] = useDropZone(onDrop)
      isOverDropZone = isOver

      return (
        <div {...handlers}>
          <p>A</p>
        </div>
      )
    }
    const { getByText } = utils.render(<Component />)
    const child = getByText('A')

    fireEvent.dragEnter(child)

    fireEvent.drop(child)

    expect(isOverDropZone).toEqual(false)
    expect(onDrop).toHaveBeenCalledWith(null)
  })
})
