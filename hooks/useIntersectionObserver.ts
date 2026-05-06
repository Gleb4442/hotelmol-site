import { useEffect, useState, useRef, RefObject } from 'react'

export function useIntersectionObserver<T extends HTMLElement>(
    options?: IntersectionObserverInit
): [RefObject<T>, boolean] {
    const ref = useRef<T>(null)
    const [isIntersecting, setIntersecting] = useState(false)
    const root = options?.root ?? null
    const rootMargin = options?.rootMargin
    const threshold = options?.threshold
    const thresholdKey = Array.isArray(threshold) ? threshold.join(',') : threshold

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIntersecting(entry.isIntersecting)
        }, { root, rootMargin, threshold })

        const current = ref.current
        if (current) {
            observer.observe(current)
        }

        return () => {
            observer.disconnect()
        }
    }, [root, rootMargin, thresholdKey])

    return [ref, isIntersecting]
}
