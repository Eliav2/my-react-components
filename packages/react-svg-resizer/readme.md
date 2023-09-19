# react-svg-resizer

A simple React component for resizing SVG elements with ease.

## Installation

```bash
pnpm add react-svg-resizer
# or 
yarn add react-svg-resizer

# or (Why?)
npm install react-svg-resizer
```

## Usage

```jsx
import React from 'react';
import SvgResizer from 'react-svg-resizer';

const MyComponent = () => {
  return (
    <SvgResizer size={30}>
      <svg width="100" height="100">
        <circle cx="50" cy="50" r="40" fill="blue" />
      </svg>
    </SvgResizer>
  );
};

export default MyComponent;
```

In this example, the SVG element inside `SvgResizer` will be scaled, so it's minimum axis would be 30 pixels (in this
case 30x30 circle).

Means that if a svg shape size 50x100 was given and a size of 1 would be given, the shape would be scaled to 1x2.

## Props

### `SvgResizer`

| Prop   | Type     | Default | Description                                                                       |
|--------|----------|---------|-----------------------------------------------------------------------------------|
| `size` | `number` | `1`     | The desired size of the normalized SVG. It scales the SVG by the provided factor. |

This component can be used to wrap svgs element. For example `<SvgResizer><svg>...</svg></SvgResizer>`

### `SvgGResizer`

| Prop     | Type      | Default | Description                                                                       |
|----------|-----------|---------|-----------------------------------------------------------------------------------|
| `size`   | `number`  | -       | The size of the normalized inner SVG.                                             |
| `center` | `boolean` | `false` | Determines whether to center the SVG around the origin (0,0). Default is `false`. |

This component is used to wrap inner SVG elements. For example `<SvgGResizer><circle>...</circle></SvgGResizer>`

## Example

```jsx
import React from 'react';
import SvgResizer, { SvgGResizer } from 'react-svg-resizer';

function App() {
  return (
    <>
      <h1>SvgResizer</h1>
      <SvgResizerDemo />{" "}
    </>
  );
}

const SvgResizerDemo = () => {
  return (
    <>
      <h2>unmodified svg</h2>
      <svg width="100" height="100">
        <circle cx="50" cy="50" r="40" fill="blue" />
      </svg>

      <h2>scale inner svg to 30</h2>
      <svg width="100" height="100">
        <SvgGResizer size={30} center={false}>
          <circle cx="50" cy="50" r="40" fill="blue" />
        </SvgGResizer>
      </svg>

      <h2>scale entire svg to 30</h2>
      <SvgResizer size={30}>
        <svg width="100" height="100">
          <circle cx="50" cy="50" r="40" fill="blue" />
        </svg>
      </SvgResizer>
    </>
  );
};

export default App;
```
The result:

![image](https://github.com/Eliav2/my-react-components/assets/47307889/e6ba2b80-37cc-46d8-89f0-f94d3ac6d1b9)

the original svg shape is 80x80, and the scaled svg shape is 30x30.

### How it works

under the hood, `SvgResizer` keeps track of the dimensions of the children svg by using the [getBBox](https://developer.mozilla.org/en-US/docs/Web/API/SVGGraphicsElement/getBBox) method, 
and scales the provided svg to the desired size. 

## License

This project is licensed under the MIT License.
