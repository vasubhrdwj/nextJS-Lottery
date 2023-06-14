import { useEffect, useState } from "react"
import { useMoralis } from "react-moralis"
import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { ethers } from "ethers"
import { useNotification, Usdc } from "web3uikit"

export default function LotteryEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const [entranceFee, setEntranceFee] = useState("0")
    const [numPlayers, setNumPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")
    const dispatch = useNotification()

    const {
        runContractFunction: enterRaffle,
        isFetching,
        isLoading,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })
    const { runContractFunction: getNumberofPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberofPlayers",
        params: {},
    })
    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
    })

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    async function updateUI() {
        const entranceFeeFromCall = (await getEntranceFee()).toString()
        const numPlayersFromCall = (await getNumberofPlayers()).toString()
        const recentWinnerFromCall = await getRecentWinner()
        setEntranceFee(entranceFeeFromCall)
        setNumPlayers(numPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
    }

    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete",
            title: "Tx Notification",
            position: "topR",
            icon: <Usdc fontSize="50px" />,
        })
    }

    return (
        <div className="p-5 ">
            <h3 className=" px-4 py-4 font-bold text-3xl text-zinc-500">Lottery Entrance:</h3>

            {raffleAddress ? (
                <div className="px-4 py-2 text-2xl">
                    <button
                        className="bg-orange-100 text-red-600 hover:bg-cyan-300 font-semibold py-2 px-3 rounded"
                        onClick={async function () {
                            await enterRaffle({
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }}
                        disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full border-red-600"></div>
                        ) : (
                            "Enter Raffle"
                        )}
                    </button>
                    <h4 className=" pt-10">{`Entrance Fee: ${ethers.utils.formatUnits(
                        entranceFee,
                        "ether"
                    )} ETH`}</h4>
                    <h4 className="py-1">{`Number of Players: ${numPlayers} `}</h4>
                    <h4 className="py-1">{`Recent Winner: ${recentWinner}`}</h4>
                </div>
            ) : (
                <div>No Raffle Address Detected</div>
            )}
            <div className=" mt-10 ml-10 flex flex-row-reverse text-2xl"> Vasu Bhardwaj</div>
            <div className="flex flex-row justify-end text-lg">Connect on: </div>
            <a href="https://github.com/vasubhrdwj" className=" flex flex-row-reverse text-lg text-yellow-500 underline ...">GitHub</a>
        </div>
    )
}
