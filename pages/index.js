// import ManualHeader from "@/components/ManualHeader"
import { Inter } from "next/font/google"
import Head from "next/head"
import Header from "@/components/Header"
import LotteryEntrance from "@/components/LotteryEntrance"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
    return (
        // <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex">
        <div>
            <Head>
                <title>Smart Contract Lottery</title>
                <meta name="description" content="Our smart contract lottery" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* <ManualHeader /> */}
            <Header />
            <LotteryEntrance />
            {/* Header / connect button / navbar */}
        </div>
    )
}
