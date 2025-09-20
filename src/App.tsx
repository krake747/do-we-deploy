import { createSignal, onCleanup, onMount, type Component } from "solid-js"

const date = new Date()

const weekday = date.toLocaleDateString(undefined, {
    weekday: "long"
})

const messages = [
    "Oh, you doubted us? We deploy.",
    "What else would we do? Knit sweaters? We deploy.",
    "Spoiler: we deploy.",
    "Deploy? No way… oh wait, yes. We deploy.",
    "We deploy so often, it’s basically a hobby.",
    "Deploying: because chaos needs company.",
    "We deploy. The rumors are true.",
    "Guess what? We deploy… again.",
    "We deploy. It’s what we do.",
    "Deploying: because standing still is boring.",
    "We deploy. It’s in our DNA.",
    "Another day, another deploy. Yawn.",
    "Hold onto your hats, we deploy… again.",
    "We deploy. It’s our superpower.",
    "Deploying: because why not?",
    "We deploy. It’s a lifestyle choice.",
    "We disabled all our feature flags, right? We deploy.",
    "Testing in production: it’s a lifestyle.",
    "Oops… did we push that to main?",
    "Our QA department is imaginary. We deploy anyway.",
    "Hotfix incoming: enjoy the ride.",
    "Yes, that was intentional. Mostly. We deploy anyway.",
    "Merge conflicts? Never heard of them. Deploy anyway.",
    "We removed the tests, right? Great, we deploy faster.",
    "Ship Happens",
    "Deploy or Die",
    "Pushin’ to Production",
    "YOLOps",
    "Click. Boom. Live.",
    "Commit. Pray. Deploy.",
    "Born to Ship",
    "We Break, We Fix, We Deploy",
    "Ctrl+Alt+Deploy",
    "Zero Downtime-ish",
    "Fearless Shipping",
    "Bug Delivery Service",
    "One Does Not Simply Not Deploy",
    "Straight Outta Staging",
    "Continuous ‘Oops’",
    "Mission: Deployment",
    "99 Problems but a Deploy Ain’t One",
    "Keep Calm and Deploy On"
]

function createRandomPicker(messages: string[]): (idx: number) => number {
    return function pick(idx: number): number {
        const newIndex = Math.floor(Math.random() * messages.length)
        return newIndex === idx ? pick(idx) : newIndex
    }
}

const pickIndex = createRandomPicker(messages)

const App: Component = () => {
    const [index, setIndex] = createSignal(0)
    const [animate, setAnimate] = createSignal(false)

    const handleClick = () => {
        setAnimate(false)
        setTimeout(() => {
            setIndex(pickIndex)
            setAnimate(true)
        }, 50)
    }

    onMount(() => {
        setAnimate(true)

        const onKey = (e: KeyboardEvent) => {
            if (e.code === "Space" || e.key === " " || e.key === "Spacebar") {
                e.preventDefault()
                handleClick()
            }
        }

        window.addEventListener("keydown", onKey)
        onCleanup(() => window.removeEventListener("keydown", onKey))
    })

    return (
        <div class="grid min-h-[100dvh] grid-rows-[1fr_auto] justify-center bg-lime-100 px-4">
            <div class="m-auto space-y-6 text-center text-white uppercase md:space-y-8">
                <h1 class="text-xl font-semibold tracking-tight text-lime-700 md:text-2xl">
                    Do We Deploy on a {weekday}?
                </h1>
                <h2
                    class={`text-4xl font-bold tracking-tight text-lime-900 transition-all duration-500 ease-out md:text-6xl ${
                        animate() ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                >
                    {messages[index()]}
                </h2>
                <button
                    type="button"
                    class="rounded bg-gradient-to-r from-lime-500 to-lime-400 px-3 py-2 font-semibold text-white transition-colors outline-none hover:scale-101 hover:to-lime-500 focus-visible:ring-2 focus-visible:ring-lime-700/50 active:scale-98"
                    onClick={handleClick}
                >
                    Hit Space or Click
                </button>
            </div>

            <div class="self-center p-4 text-center text-sm text-lime-700 md:p-6 md:text-base">
                Made with <Heart /> for devs who are scared to deploy <Rocket />{" "}
                <a
                    href="https://github.com/krake747/do-we-deploy"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="underline underline-offset-4 hover:text-lime-800"
                >
                    GitHub
                </a>
            </div>
        </div>
    )
}

export default App

function Heart() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="inline fill-red-500/50 text-red-700"
        >
            <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
        </svg>
    )
}

function Rocket() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="inline fill-red-500/50 text-red-700"
        >
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
    )
}
