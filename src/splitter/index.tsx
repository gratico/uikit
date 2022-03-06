import React from 'react'
import styled from '@emotion/styled'

export type Orientation = 'vertical' | 'horizontal'
export type Sizes = { [key: number]: number | string }

export function getItemStyle(orientation: Orientation, sizes: Sizes, index: number) {
  const size = sizes[index]
  if (orientation === 'horizontal') {
    return typeof size === 'string'
      ? {
          width: size
        }
      : { flex: size }
  } else {
    throw new Error('NOT_IMPLEMENTED - ' + orientation)
  }
}
function Resizer(props: {}) {
  return (
    <ResizerContainer tabIndex={1}>
      <a href="#"></a>
    </ResizerContainer>
  )
}
const ResizerContainer = styled.div`
  background: width;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  color: black;
  width: 5px;
  background: rgba(255, 255, 255, 0.4);
  cursor: ew-resize;
  background-image: -webkit-linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(0, 0, 0, 0.2) 50%,
    rgba(0, 0, 0, 0.2) 75%,
    transparent 75%,
    transparent
  );
`
export function SplitterComponent(props: {
  itemCount: number
  itemRenderer: (index: number) => React.ReactNode
  orientation: Orientation
  sizes: Sizes
}) {
  const items = new Array(props.itemCount).fill(true)
  return (
    <Container>
      {items.map((item, i) => {
        return (
          <React.Fragment key={i}>
            <ItemContainer key={i} style={getItemStyle(props.orientation, props.sizes, i)}>
              {props.itemRenderer(i)}
            </ItemContainer>
            {i < items.length - 1 && <Resizer key={'r' + i} />}
          </React.Fragment>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
`
const ItemContainer = styled.div`
  position: relative;
`
