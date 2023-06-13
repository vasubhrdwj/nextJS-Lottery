import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div className="p-5 border-b-4 align-middle flex flex-col ">
           <h1 className="py-4 px-4 align-middle font-extrabold text-4xl text-center text-yellow-500"> Decentralized Lottery</h1>
            <div className="ml-auto py-2 px-4"><ConnectButton moralisAuth={false}/></div>
        </div>
    )
}
