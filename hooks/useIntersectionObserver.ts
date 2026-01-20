import { useEffect, useState, useRef, RefObject } from 'react'

export function useIntersectionObserver<T extends HTMLElement>(
    options?: IntersectionObserverInit
): [RefObject<T>, boolean] {
    const ref = useRef<T>(null)
    const [isIntersecting, setIntersecting] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIntersecting(entry.isIntersecting)
        }, options)

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            observer.disconnect()
        }
    }, [ref, options])

    return [ref, isIntersecting]
}
