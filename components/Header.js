import { ConnectButton } from "web3uikit"
import Image from "next/image"
import ethereumIcon from "../public/ethereumIcon.svg"



export default function Header() {
    return (
        <div className="p-5 border-b-4 flex flex-row ">
            <Image src = {ethereumIcon} width={60} height={80} className=" mr-auto"/>
           <h1 className="py-4 px-4 ml-60 mt-4 font-extrabold text-4xl text-center text-yellow-500"> Decentralized Lottery</h1>
            <div className="ml-auto py-2 px-4 mt-auto"><ConnectButton moralisAuth={false}/></div>
        </div>
    )
}
