import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="max-w-5xl p-4 lg:p-8 mx-auto prose prose-headings:font-700">
                <h1 className="font-sans">
                    React components from scratch{' '}
                    <span className="inline-block text-blue -translate-y-8 rotate-12 -translate-x-3 text-sm">
                        WIP
                    </span>
                </h1>
                <p>
                    I have recently been recreating react components that follow
                    ARIA guidelines, have sexy animations, and are super
                    extensible. This is the consolidated home for that work into
                    the near future.
                </p>
                <h2>Components I have created so far:</h2>
                <ol>
                    <li>
                        <Link href="https://react-slider-component.vercel.app/">
                            Slider &#x2197;
                        </Link>
                    </li>
                    <li>
                        <Link href="https://vercel-tabs-component.vercel.app/">
                            Tabs &#x2197;
                        </Link>
                    </li>
                    <li>
                        <Link href="https://react-disclosure-component.vercel.app/">
                            Disclosure &#x2197;
                        </Link>
                    </li>
                    <li>
                        <Link href="/toggle-group">Toggle Group &#x2197;</Link>
                    </li>
                    <li>
                        <Link href="/treeview">Treeview &#x2197;</Link>
                    </li>
                    <li>
                        <Link href="/sidebar">Sidebar &#x2197;</Link>
                    </li>
                </ol>

                <h2>Utils created so far:</h2>
                <ol>
                    <li>
                        <Link href="/roving-tabindex">
                            Roving tabindex &#x2197;
                        </Link>
                    </li>
                </ol>
            </div>
        </>
    )
}
