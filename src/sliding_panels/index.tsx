import React from 'react'
import { useSpring, animated } from 'react-spring'
import styled from '@emotion/styled'
import useComponentSize from '@rehooks/component-size'

const isMaximised = (width: number, mainWidth: number) => {
  return width > mainWidth
}

export interface SlidingPanelsProps {
  children: React.ReactNode[]
  activeSection: null | 'sidebar' | 'panels'
  setActiveSection: (section: null | 'sidebar' | 'panels') => void
  padding?: number
  breakpointWidth?: (parentWidth: number) => number
  rightWidth: (parentWidth: number) => number
  leftWidth: (parentWidth: number) => number
  mainWidth: (parentWidth: number) => number
}
export function SlidingPanelsComponent(
  props: SlidingPanelsProps & {
    width: number
  },
) {
  const padding = props.padding && Number.isFinite(props.padding) ? props.padding : 10
  const sidebarWidthG = () => props.leftWidth(props.width)
  const panelsWidthG = () => props.rightWidth(props.width)
  const stageWidthG = () =>
    Math.max(props.mainWidth(props.width), props.width - Math.max(sidebarWidthG(), panelsWidthG()))

  const breakpointWidthG = () => {
    return props.breakpointWidth ? props.breakpointWidth(props.width) : null
  }
  const isAtBreakpoint = () => {
    const breakpointWidth = breakpointWidthG()
    return breakpointWidth && stageWidthG() > breakpointWidth
  }
  const activeSection = props.activeSection
  const setActiveSection = (section: null | 'sidebar' | 'panels') => {
    const isM = !isMaximised(props.width, stageWidthG() + sidebarWidthG() + panelsWidthG())
    props.setActiveSection(section)
    if (isM) {
    } else {
    }
  }
  const sidebarRef = React.useRef<NodeJS.Timeout | null>(null)
  const panelsRef = React.useRef<NodeJS.Timeout | null>(null)
  const bodyRef = React.useRef<NodeJS.Timeout | null>(null)

  const style = useSpring({
    transform: (function () {
      if (isAtBreakpoint()) {
        if (activeSection === null) return 'translate3d(0px,0,0)'
        if (activeSection === 'sidebar') return `translate3d(${0}px,0,0)`
        if (activeSection === 'panels') return `translate3d(${props.width - stageWidthG() - panelsWidthG()}px,0,0)`
      } else {
        if (activeSection === null) return 'translate3d(0px,0,0)'
        if (activeSection === 'sidebar') return `translate3d(${sidebarWidthG() + padding}px,0,0)`
        if (activeSection === 'panels') return `translate3d(${props.width - stageWidthG() - panelsWidthG()}px,0,0)`
      }
    })(),
  })
  return (
    <$StageContainer>
      <$SidebarContainer
        style={{
          width: sidebarWidthG(),
        }}
        onMouseEnter={() => {
          if (sidebarRef.current) {
            clearTimeout(sidebarRef.current)
            sidebarRef.current = null
          }
          sidebarRef.current = setTimeout(() => {
            setActiveSection('sidebar')
          }, 200)
        }}
        onMouseLeave={() => {
          //          setActiveSection(null);
          if (sidebarRef.current) {
            clearTimeout(sidebarRef.current)
            sidebarRef.current = null
          }
        }}
      >
        {props.children[0]}
      </$SidebarContainer>
      <PanelsContainer
        style={{
          width: panelsWidthG(),
        }}
        onMouseEnter={() => {
          if (panelsRef.current) {
            clearTimeout(panelsRef.current)
            panelsRef.current = null
          }
          panelsRef.current = setTimeout(() => {
            setActiveSection('panels')
          }, 200)
        }}
        onMouseLeave={() => {
          //          setActiveSection(null);
          if (panelsRef.current) {
            clearTimeout(panelsRef.current)
            panelsRef.current = null
          }
        }}
      >
        {props.children[1]}
      </PanelsContainer>
      <$FileContainer
        padding={padding}
        style={{
          ...style,
          ...(function () {
            if (isAtBreakpoint()) {
              return {
                width: props.width - sidebarWidthG() - padding * 2,
                left: sidebarWidthG() + padding,
              }
            }
            return {
              left: padding,
              width: stageWidthG() - 2 * padding,
            }
          })(),
        }}
        onMouseMove={() => {
          if (activeSection === null) return
          if (bodyRef.current) {
            clearTimeout(bodyRef.current)
            bodyRef.current = null
          }
          bodyRef.current = setTimeout(() => {
            setActiveSection(null)
            bodyRef.current = null
          }, 200)
        }}
        onMouseLeave={() => {
          if (bodyRef.current) {
            clearTimeout(bodyRef.current)
            bodyRef.current = null
          }
        }}
      >
        <div
          style={{
            position: 'relative',
            flex: 1,
          }}
        >
          {props.children[2]}
        </div>
      </$FileContainer>
    </$StageContainer>
  )
}
export function SlidingPanels(props: SlidingPanelsProps) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const size = useComponentSize(ref)
  // console.log("size", size);
  return (
    <$SlidingPanelsWrapper ref={ref}>
      {<SlidingPanelsComponent {...props} width={size.width || 0} />}
    </$SlidingPanelsWrapper>
  )
}
const $SlidingPanelsWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`
const $StageContainer = styled(animated.div)`
  display: flex;
`
const $SidebarContainer = styled(animated.div)`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
`
const $FileContainer = styled(animated.div)<{ padding: number }>`
  position: absolute;
  left: ${(props) => props.padding}px;
  right: ${(props) => props.padding}px;
  top: 5px;
  bottom: 6px;
  box-shadow: rgba(0, 0, 0, 0.7) 0px 1px 3px 0px, rgba(255, 255, 255, 0.7) 0px 1px 0px 0px inset;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  overflow: hidden;
`
const PanelsContainer = styled(animated.div)`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
`
