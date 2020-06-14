# useDropZone

[![Build Status](https://travis-ci.org/sbaidon/useDropZone.svg?branch=master)](https://travis-ci.org/sbaidon/useDropZone)

Simple custom react hook that handles the logic to drop a file over a defined drop zone

# Install

`npm install use-drop-zone --save`

# How to use

You only need to provide an `onDrop` function which will be called with the _files_ that were dropped over the drop zone. If no files are detected your function will be called with _null_.

The custom hook returns two things, a boolean flag which indicates if an item is _over_ the drop zone, as well as all the _event handlers_ needed to make your drop zone work properly, you _must_ attach the handlers on an item for the hook to work properly.

## Example

```javascript
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
```

# Gotchas

This custom hook takes care of the `dragLeave` event firing on child elements of your dropzone (see [this](https://stackoverflow.com/questions/7110353/html5-dragleave-fired-when-hovering-a-child-element) fore more info), if you are looking for different behavior feel free to fork this repository and implement your own custom behavior.
