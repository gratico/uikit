import React from 'react'
import styled from '@emotion/styled'
import useResizeObserver from 'use-resize-observer'

export interface DesktopProps {
  children: React.ReactNode
  renderLeft?: () => React.ReactNode
  renderRight?: () => React.ReactNode
}

export function WorspaceComponent(props: DesktopProps & { width: number; height: number }) {
  return (
    <$Container>
      <$LeftContainer></$LeftContainer>
      <$BodyContainer>{props.children}</$BodyContainer>
      <$RightContainer></$RightContainer>
    </$Container>
  )
}
const $Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`
const $BodyContainer = styled.div`
  width: 60%;
  height: 90%;
  position: absolute;
  left: 20%;
  right: 20%;
  top: 5%;
  border: 1px solid #ddd;
  border-radius: 5px;
`
const $LeftContainer = styled.div`
  width: 40%;
  max-width: 300px;
`
const $RightContainer = styled.div`
  width: 40%;
`

export function Desktop(props: DesktopProps) {
  const { ref, width = 0, height = 0 } = useResizeObserver<HTMLDivElement>()
  return (
    <$OuterContainer ref={ref}>
      {width > 0 && height > 0 ? <WorspaceComponent {...props} width={width} height={height} /> : null}
    </$OuterContainer>
  )
}
const $OuterContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`
