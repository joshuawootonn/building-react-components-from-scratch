'use client'
import clsx from 'clsx'
import { useCallback, useRef, useState } from 'react'

const items = Array.from({ length: 300 }, (_, i) => i + '')

class DOMVector {
    constructor(
        readonly x: number,
        readonly y: number,
        readonly magnitudeX: number,
        readonly magnitudeY: number,
    ) {
        this.x = x
        this.y = y
        this.magnitudeX = magnitudeX
        this.magnitudeY = magnitudeY
    }

    getDiagonalLength(): number {
        return Math.sqrt(
            Math.pow(this.magnitudeX, 2) + Math.pow(this.magnitudeY, 2),
        )
    }

    toDOMRect(): DOMRect {
        return new DOMRect(
            Math.min(this.x, this.x + this.magnitudeX),
            Math.min(this.y, this.y + this.magnitudeY),
            Math.abs(this.magnitudeX),
            Math.abs(this.magnitudeY),
        )
    }

    add(vector: DOMVector): DOMVector {
        return new DOMVector(
            this.x + vector.x,
            this.y + vector.y,
            this.magnitudeX + vector.magnitudeX,
            this.magnitudeY + vector.magnitudeY,
        )
    }
}

function intersect(rect1: DOMRect, rect2: DOMRect) {
    if (rect1.right < rect2.left || rect2.right < rect1.left) return false

    if (rect1.bottom < rect2.top || rect2.bottom < rect1.top) return false

    return true
}

function Root() {
    const [dragVector, setDragVector] = useState<DOMVector | null>(null)
    const [scrollVector, setScrollVector] = useState<DOMVector | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
        {},
    )
    const containerRef = useRef<HTMLDivElement>(null)

    const updateSelectedItems = useCallback(function updateSelectedItems(
        dragVector: DOMVector,
        scrollVector: DOMVector,
    ) {
        if (containerRef.current == null) return
        const next: Record<string, boolean> = {}
        const containerRect = containerRef.current.getBoundingClientRect()
        containerRef.current.querySelectorAll('[data-item]').forEach(el => {
            if (containerRef.current == null || !(el instanceof HTMLElement))
                return

            const itemRect = el.getBoundingClientRect()
            const x =
                itemRect.x - containerRect.x + containerRef.current.scrollLeft
            const y =
                itemRect.y - containerRect.y + containerRef.current.scrollTop
            const translatedItemRect = new DOMRect(
                x,
                y,
                itemRect.width,
                itemRect.height,
            )
            if (
                !intersect(
                    dragVector.add(scrollVector).toDOMRect(),
                    translatedItemRect,
                )
            )
                return

            if (el.dataset.item && typeof el.dataset.item === 'string') {
                next[el.dataset.item] = true
            }
        })

        setSelectedItems(next)
    },
    [])

    const selectionRect =
        dragVector && scrollVector && isDragging
            ? dragVector.add(scrollVector).toDOMRect()
            : null

    return (
        <div>
            <div className="relative z-10 flex flex-row justify-between">
                <div className="px-2 border-2 border-black bg-white">
                    selectable area
                </div>
                {Object.keys(selectedItems).length > 0 && (
                    <div className="px-2 border-2 border-black bg-white">
                        count: {Object.keys(selectedItems).length}
                    </div>
                )}
            </div>
            <div
                ref={containerRef}
                onScroll={e => {
                    if (dragVector == null || scrollVector == null) return

                    const { scrollLeft, scrollTop } = e.currentTarget

                    const nextScrollVector = new DOMVector(
                        scrollVector.x,
                        scrollVector.y,
                        scrollLeft - scrollVector.x,
                        scrollTop - scrollVector.y,
                    )

                    setScrollVector(nextScrollVector)
                    updateSelectedItems(dragVector, nextScrollVector)
                }}
                onPointerDown={e => {
                    if (e.button !== 0) return

                    const containerRect =
                        e.currentTarget.getBoundingClientRect()

                    setDragVector(
                        new DOMVector(
                            e.clientX - containerRect.x,
                            e.clientY - containerRect.y,
                            0,
                            0,
                        ),
                    )
                    setScrollVector(
                        new DOMVector(
                            e.currentTarget.scrollLeft,
                            e.currentTarget.scrollTop,
                            0,
                            0,
                        ),
                    )

                    e.currentTarget.setPointerCapture(e.pointerId)
                }}
                onPointerMove={e => {
                    if (dragVector == null || scrollVector == null) return

                    const containerRect =
                        e.currentTarget.getBoundingClientRect()

                    const nextDragVector = new DOMVector(
                        dragVector.x,
                        dragVector.y,
                        e.clientX - containerRect.x - dragVector.x,
                        e.clientY - containerRect.y - dragVector.y,
                    )

                    if (!isDragging && nextDragVector.getDiagonalLength() < 10)
                        return

                    setIsDragging(true)

                    setDragVector(nextDragVector)
                    updateSelectedItems(nextDragVector, scrollVector)
                }}
                onPointerUp={() => {
                    if (!isDragging) {
                        setSelectedItems({})
                        setDragVector(null)
                        setScrollVector(null)
                    } else {
                        setDragVector(null)
                        setScrollVector(null)
                        setIsDragging(false)
                    }
                }}
                tabIndex={-1}
                onKeyDown={e => {
                    if (e.key === 'Escape') {
                        e.preventDefault()
                        setSelectedItems({})
                        setDragVector(null)
                        setScrollVector(null)
                    }
                }}
                className={clsx(
                    'relative max-h-96 overflow-auto z-0 grid grid-cols-[repeat(20,min-content)] gap-4 p-4',
                    'border-2 border-black select-none focus:outline-none focus:border-dashed -translate-y-0.5',
                )}
            >
                {items.map(item => (
                    <div
                        data-item={item}
                        className={clsx(
                            'border-2 size-10 border-black flex justify-center items-center',
                            selectedItems[item]
                                ? 'bg-black text-white'
                                : 'bg-white text-black',
                        )}
                        key={item}
                    >
                        {item}
                    </div>
                ))}
                {selectionRect && (
                    <div
                        className="absolute border-black border-2 bg-black/30"
                        style={{
                            top: selectionRect.y,
                            left: selectionRect.x,
                            width: selectionRect.width,
                            height: selectionRect.height,
                        }}
                    />
                )}
            </div>
        </div>
    )
}

export function Step5Demo() {
    return <Root />
}
