import {
    Bars3BottomLeftIcon,
    Bars3BottomRightIcon,
    Bars3Icon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useState } from 'react'

import { ToggleGroup } from '../components/toggle-group/toggle-group'

export default function ToggleGroupPage() {
    const [textAlignment, setTextAlignment] = useState<string | null>(null)
    const [favoriteFruit, changeFavoriteFruit] = useState<string | null>('two')

    return (
        <div className="max-w-3xl p-4 lg:p-8 mx-auto prose prose-headings:font-700 ">
            <div className="flex flex-row justify-between items-start">
                <h1 className="font-sans">Toggle Group</h1>
                <div className="flex space-x-4">
                    <Link href="https://github.com/joshuawootonn/react-components-from-scratch/blob/main/pages/toggle-group.tsx">
                        <svg
                            width="24.5"
                            height="24"
                            viewBox="0 0 98 96"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                                fill="#24292f"
                            />
                        </svg>
                    </Link>
                    <Link href="/">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                            />
                        </svg>
                    </Link>
                </div>
            </div>

            <h2>Text Alignment</h2>
            <ToggleGroup.Root
                value={textAlignment}
                onChange={setTextAlignment}
                aria-label="Text Alignment"
            >
                <ToggleGroup.Button value="left" aria-label="Left Align">
                    <Bars3BottomLeftIcon className="h-5 w-5" />
                </ToggleGroup.Button>
                <ToggleGroup.Button value="center" aria-label="Center Align">
                    <Bars3Icon className="h-5 w-5" />
                </ToggleGroup.Button>
                <ToggleGroup.Button value="right" aria-label="Right Align">
                    <Bars3BottomRightIcon className="h-5 w-5" />
                </ToggleGroup.Button>
            </ToggleGroup.Root>
            <h2>What is your favorite fruit?</h2>
            <ToggleGroup.Root
                value={favoriteFruit}
                onChange={changeFavoriteFruit}
                aria-label="What is your favorite fruit?"
            >
                <ToggleGroup.Button value="one" className="px-2">
                    Strawberry 🍓
                </ToggleGroup.Button>
                <ToggleGroup.Button value="two" className="px-2">
                    Banana 🍌
                </ToggleGroup.Button>
                <ToggleGroup.Button value="three" className="px-2">
                    Apple 🍏
                </ToggleGroup.Button>
            </ToggleGroup.Root>

            <h2>Radio group for comparison</h2>

            <fieldset className="flex flex-row items-center space-x-2">
                <div className="flex justify-center space-x-1">
                    <input
                        type="radio"
                        id="strawberry"
                        name="strawberry"
                        value="strawberry"
                        checked
                    />
                    <label htmlFor="strawberry">Strawberry 🍓</label>
                </div>
                <div className="flex justify-center space-x-1">
                    <input
                        type="radio"
                        id="banana"
                        name="banana"
                        value="banana"
                        checked
                    />
                    <label htmlFor="banana">Banana 🍌</label>
                </div>
                <div className="flex justify-center space-x-1">
                    <input
                        type="radio"
                        id="apple"
                        name="apple"
                        value="apple"
                        checked
                    />
                    <label htmlFor="apple">Apple 🍏</label>
                </div>
            </fieldset>

            {/* <div className="not-prose ml-28 mt-10 mb-20 flex flex-col justify-center w-[400px] space-y-10 items-center">
                <button className="text-purple px-2 py-1 rounded-md">focusable element</button>
                <div className="space-y-4 text-center">
                    <h1 className="text-xl font-bold">Toggle Group without roving tabindex</h1>

                    <ToggleGroup.Root
                        value={favoriteFruit}
                        onChange={changeFavoriteFruit}
                        aria-label="What is your favorite fruit?"
                    >
                        <ToggleGroup.Button value="one" className="px-2">
                            Strawberry 🍓
                        </ToggleGroup.Button>
                        <ToggleGroup.Button value="two" className="px-2">
                            Banana 🍌
                        </ToggleGroup.Button>
                        <ToggleGroup.Button value="three" className="px-2">
                            Apple 🍏
                        </ToggleGroup.Button>
                    </ToggleGroup.Root>
                </div>
                <button className="mt-12 text-purple px-2 py-1 rounded-md">
                    focusable element
                </button>
            </div> */}

            {/* <div className="not-prose mt-10 mb-20 flex flex-col justify-center w-[400px] space-y-10 items-center">
                <button className=" text-purple px-2 py-1 rounded-md">focusable element</button>
                <div className="space-y-4 text-center">
                    <h2 className="text-xl font-bold">Radio group for comparison</h2>

                    <fieldset className="flex flex-row items-center space-x-2">
                        <div className="flex justify-center space-x-1">
                            <input
                                type="radio"
                                id="strawberry"
                                name="drone"
                                value="strawberry"
                                checked
                            />
                            <label for="strawberry">Strawberry 🍓</label>
                        </div>
                        <div className="flex justify-center space-x-1">
                            <input type="radio" id="banana" name="drone" value="banana" checked />
                            <label for="banana">Banana 🍌</label>
                        </div>
                        <div className="flex justify-center space-x-1">
                            <input type="radio" id="apple" name="drone" value="apple" checked />
                            <label for="apple">Apple 🍏</label>
                        </div>
                    </fieldset>
                </div>
                <button className="mt-12 text-purple px-2 py-1 rounded-md">
                    focusable element
                </button>
            </div>

            <h2>Text Alignment</h2>
            <ToggleGroup.Root
                value={textAlignment}
                onChange={setTextAlignment}
                aria-label="Text Alignment"
            >
                <ToggleGroup.Button value="left" aria-label="Left Align">
                    <Bars3BottomLeftIcon className="h-5 w-5" />
                </ToggleGroup.Button>
                <ToggleGroup.Button value="center" aria-label="Center Align">
                    <Bars3Icon className="h-5 w-5" />
                </ToggleGroup.Button>
                <ToggleGroup.Button value="right" aria-label="Right Align">
                    <Bars3BottomRightIcon className="h-5 w-5" />
                </ToggleGroup.Button>
            </ToggleGroup.Root> */}
        </div>
    )
}
