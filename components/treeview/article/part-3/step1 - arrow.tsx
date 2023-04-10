import clsx from 'clsx'
import isHotkey from 'is-hotkey'
import {
    createContext,
    Dispatch,
    KeyboardEvent,
    ReactNode,
    useContext,
    useReducer,
} from 'react'

import {
    getFirstFocusableId,
    getLastFocusableId,
    getNextFocusableId,
    getNextFocusableIdByTypeahead,
    getParentFocusableId,
    getPrevFocusableId,
    RovingTabindexItem,
    RovingTabindexRoot,
    useRovingTabindex,
} from './roving-tabindex'

export type TreeViewState = Map<string, boolean>

export enum TreeViewActionTypes {
    OPEN = 'OPEN',
    CLOSE = 'CLOSE',
}

export type TreeViewActions =
    | {
          type: TreeViewActionTypes.OPEN
          id: string
      }
    | {
          type: TreeViewActionTypes.CLOSE
          id: string
      }

export function treeviewReducer(
    state: TreeViewState,
    action: TreeViewActions,
): TreeViewState {
    switch (action.type) {
        case TreeViewActionTypes.OPEN:
            return new Map(state).set(action.id, true)

        case TreeViewActionTypes.CLOSE:
            return new Map(state).set(action.id, false)

        default:
            throw new Error('Tree Reducer received an unknown action')
    }
}

export type TreeViewContextType = {
    open: TreeViewState
    dispatch: Dispatch<TreeViewActions>
    selectedId: string | null
    selectId: (id: string) => void
}

export const TreeViewContext = createContext<TreeViewContextType>({
    open: new Map<string, boolean>(),
    dispatch: () => {},
    selectedId: null,
    selectId: () => {},
})

type RootProps = {
    children: ReactNode | ReactNode[]
    className?: string
    value: string | null
    onChange: (id: string) => void
    label: string
}

export function Root({
    children,
    className,
    value,
    onChange,
    label,
}: RootProps) {
    const [open, dispatch] = useReducer(
        treeviewReducer,
        new Map<string, boolean>(),
    )

    return (
        <TreeViewContext.Provider
            value={{
                open,
                dispatch,
                selectedId: value,
                selectId: onChange,
            }}
        >
            <RovingTabindexRoot
                as="ul"
                className={clsx('flex flex-col overflow-auto', className)}
                aria-label={label}
                aria-multiselectable="false"
                role="tree"
            >
                {children}
            </RovingTabindexRoot>
        </TreeViewContext.Provider>
    )
}

export type TreeNodeType = {
    id: string
    name: string
    children?: TreeNodeType[]
    icon?: ReactNode
}

type IconProps = { open?: boolean; className?: string }

export function Arrow({ open, className }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={clsx(
                'origin-center',
                open ? 'rotate-90' : 'rotate-0',
                className,
            )}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
        </svg>
    )
}

type NodeProps = {
    node: TreeNodeType
}

export const Node = function TreeNode({
    node: { id, children, name },
}: NodeProps) {
    const { open, dispatch, selectId, selectedId } = useContext(TreeViewContext)
    const { isFocusable, getRovingProps, getOrderedItems } =
        useRovingTabindex(id)
    const isOpen = open.get(id)
    return (
        <li
            {...getRovingProps<'li'>({
                className:
                    'flex flex-col cursor-pointer select-none focus:outline-none group',
                onKeyDown: function (e: KeyboardEvent) {
                    e.stopPropagation()

                    const items = getOrderedItems()
                    let nextItemToFocus: RovingTabindexItem | undefined

                    if (isHotkey('up', e)) {
                        e.preventDefault()
                        nextItemToFocus = getPrevFocusableId(items, id)
                    } else if (isHotkey('down', e)) {
                        e.preventDefault()
                        nextItemToFocus = getNextFocusableId(items, id)
                    } else if (isHotkey('left', e)) {
                        if (isOpen && children?.length) {
                            dispatch({
                                type: TreeViewActionTypes.CLOSE,
                                id,
                            })
                        } else {
                            nextItemToFocus = getParentFocusableId(items, id)
                        }
                    } else if (isHotkey('right', e)) {
                        if (isOpen && children?.length) {
                            nextItemToFocus = getNextFocusableId(items, id)
                        } else {
                            dispatch({ type: TreeViewActionTypes.OPEN, id })
                        }
                    } else if (isHotkey('home', e)) {
                        e.preventDefault()
                        nextItemToFocus = getFirstFocusableId(items)
                    } else if (isHotkey('end', e)) {
                        e.preventDefault()
                        nextItemToFocus = getLastFocusableId(items)
                    } else if (/^[a-z]$/i.test(e.key)) {
                        nextItemToFocus = getNextFocusableIdByTypeahead(
                            items,
                            id,
                            e.key,
                        )
                    } else if (isHotkey('space', e)) {
                        e.preventDefault()
                        selectId(id)
                    }
                    nextItemToFocus?.element.focus()
                },
                ['aria-expanded']: children?.length
                    ? Boolean(isOpen)
                    : undefined,
                ['aria-selected']: selectedId === id,
                role: 'treeitem',
            })}
        >
            <div
                className={clsx(
                    'flex items-center space-x-2 font-mono font-medium rounded-sm px-1 border-[1.5px] border-transparent',
                    isFocusable && 'group-focus:border-slate-500',
                    selectedId === id ? 'bg-slate-200' : 'bg-transparent',
                )}
                onClick={() => {
                    isOpen
                        ? dispatch({
                              id: id,
                              type: TreeViewActionTypes.CLOSE,
                          })
                        : dispatch({
                              id: id,
                              type: TreeViewActionTypes.OPEN,
                          })
                    selectId(id)
                }}
            >
                {children?.length ? (
                    <Arrow className="h-4 w-4 shrink-0" open={isOpen} />
                ) : (
                    <span className="h-4 w-4" />
                )}
                <span className="text-ellipsis whitespace-nowrap overflow-hidden">
                    {name}
                </span>
            </div>
            {children?.length && isOpen && (
                <ul role="group" className="pl-4">
                    {children.map(node => (
                        <Node node={node} key={node.id} />
                    ))}
                </ul>
            )}
        </li>
    )
}

export const TreeviewARIA = { Root, Node }
