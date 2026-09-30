import { useEffect, useRef } from 'react'
import { Alignment, Fit, Layout, Rive, RuntimeLoader } from '@rive-app/webgl2'

// Rive runtime as used live (spec/pages/ASSETS_GAPFILL.md 1.1): @rive-app/webgl2 2.27.5 through
// Framer's Rive component, which wraps @rive-app/react's useRive. The WASM is self-hosted; the
// runtime only falls back to a CDN copy if this URL fails to load.
RuntimeLoader.setWasmUrl('/assets/pages/landing/rive/rive.wasm')

const RIVE_DIR = '/assets/pages/landing/rive/'

// Mounts one Rive instance on the returned canvas ref. Options match the live useRive call
// ("State Machine 1", fit cover, alignment center, handleEvents, no touch scroll) except
// autoBind: live passes true, but neither file has a view model, so it only logs
// "Could not find a View Model linked to Artboard …" errors; it is left off here. Also mirrors
// useRive's defaults (offscreen renderer, device-pixel-ratio backing store sized to the
// canvas box). `onReady(rive)` runs once the file has loaded.
export default function useRiveCanvas({ file, artboard, autoplay = true, onReady }) {
  const canvasRef = useRef(null)
  const riveRef = useRef(null)
  const readyRef = useRef(onReady)
  readyRef.current = onReady

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    let disposed = false
    let loaded = false
    const rive = new Rive({
      canvas,
      src: RIVE_DIR + file,
      artboard,
      stateMachines: 'State Machine 1',
      autoplay,
      automaticallyHandleEvents: true,
      isTouchScrollEnabled: false,
      useOffscreenRenderer: true,
      layout: new Layout({ fit: Fit.Cover, alignment: Alignment.Center }),
      onLoad: () => {
        if (disposed) return
        loaded = true
        rive.resizeDrawingSurfaceToCanvas()
        readyRef.current?.(rive)
      },
    })
    riveRef.current = rive

    // The steps canvas changes box size across breakpoints (594x700 / 424x500).
    const ro = new ResizeObserver(() => {
      if (loaded && !disposed) rive.resizeDrawingSurfaceToCanvas()
    })
    ro.observe(canvas)

    return () => {
      disposed = true
      ro.disconnect()
      riveRef.current = null
      rive.cleanup()
    }
  }, [file, artboard, autoplay])

  return { canvasRef, riveRef }
}
