import React from 'react'
import styled from '@emotion/styled'
import useResizeObserver from 'use-resize-observer'

const useAnimationFrame = (callback: Function) => {
	// Use useRef for mutable variables that we want to persist
	// without triggering a re-render on their change
	const requestRef = React.useRef<number | null>(null)
	const previousTimeRef = React.useRef<number | null>(null)

	const animate = (time: number) => {
		if (previousTimeRef.current != undefined) {
			const deltaTime = time - previousTimeRef.current
			callback(deltaTime)
		}
		previousTimeRef.current = time
		requestRef.current = requestAnimationFrame(animate)
	}

	React.useEffect(() => {
		requestRef.current = requestAnimationFrame(animate)
		return () => (requestRef.current ? cancelAnimationFrame(requestRef.current) : undefined)
	}, []) // Make sure the effect runs only once
}

export function FocusHighlighterComponent(props: { width: number; height: number }) {
	const ref = React.useRef<HTMLCanvasElement>(null)
	React.useEffect(() => {
		if (ref.current) {
			var can = ref.current
			var scaleFactor = window.devicePixelRatio
			//can.width = can.width * scaleFactor
			//can.height = can.height * scaleFactor
		}
	}, [ref])
	useAnimationFrame(() => {
		const active = document.activeElement

		if (active && ref.current) {
			var c = ref.current
			const rect = active.getBoundingClientRect()
			var ctx = c.getContext('2d')
			var scaleFactor = window.devicePixelRatio
			console.log(rect.x, rect.y, rect.width, rect.height)
			if (ctx) {
				//				ctx.scale(scaleFactor, scaleFactor)
				ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
				ctx.strokeRect(rect.x, rect.y, rect.width, rect.height)
			}
		}
	})
	return <$Canvas width={props.width} height={props.height} ref={ref} />
}

export function FocusHighlighter() {
	const { ref, width = 0, height = 0 } = useResizeObserver<HTMLDivElement>()
	return null
	return (
		<$OuterContainer ref={ref}>
			{width > 0 && height > 0 ? <FocusHighlighterComponent {...{}} width={width} height={height} /> : null}
		</$OuterContainer>
	)
}
const $OuterContainer = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	pointer-events: none;
`
const $Canvas = styled.canvas`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	pointer-events: none;
`
