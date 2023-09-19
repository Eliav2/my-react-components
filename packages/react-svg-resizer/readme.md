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
    <SvgResizer size={2}>
      <svg width="100" height="100">
        <circle cx="50" cy="50" r="40" fill="blue" />
      </svg>
    </SvgResizer>
  );
};

export default MyComponent;
```

In this example, the SVG element inside `SvgResizer` will be scaled, so it's minimum axis would be 2 pixels (in this case 2x2 circle).

Means that if an svg shape size 50x100 was given and a size of 1 would be given, the shape would be scaled to 1x2.


## Props

| Prop   | Type     | Default | Description                                                        |
|--------|----------|---------|--------------------------------------------------------------------|
| `size` | `number` | `1`     | The desired size of the smaller axis of the normalized svg shape   |


## License

This project is licensed under the MIT License.