import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

function SingleColors() {

    const colors = ['red', 'green', 'blue', 'orange', 'pink', 'yellow']
    const [selectedColor, setSelectedColor] = useState("")
    const [result, setResult] = useState([])
    const initialState = {
        5: [null, null, null, null],
        4: [null, null, null, null],
        3: [null, null, null, null],
        2: [null, null, null, null],
        1: [null, null, null, null],
        0: [null, null, null, null],
    }
    const [resultCombination, setResutCombination] = useState(initialState)
    const [combination, setCombination] = useState(initialState)
    const [currentTry, setCurrentTry] = useState(5)
    const [displayResult, setDisplayResult] = useState(false)
    const [accordionOpen, setAccordionOpen] = useState(false);

    const checkWinner = () => {
        let winner = true;
        let tmpResult = []
        for (let i = 0; i < result.length; i++) {
            if (combination[currentTry][i] === result[i]) {
                tmpResult.push("white")
            } else if (combination[currentTry].includes(result[i])) {
                tmpResult.push("black")
                winner = false;
            } else {
                winner = false;
            }
        }
        tmpResult.sort((a, b) => a === "white" ? -1 : 1);
        setResutCombination(prevCombination => {
            return {
                ...prevCombination,
                [currentTry]: tmpResult
            };
        });
        return winner;
    }

    useEffect(() => {
        let nextTurn = true;
        for (let i = 0; i < 4; i++) {
            if (combination[currentTry][i] == null) {
                nextTurn = false;
            }
        }
        if (nextTurn) {
            if (checkWinner()) {
                setDisplayResult(true)
                toast.success('Nice Job!', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            } else {
                if (currentTry === 0) {
                    setDisplayResult(true)
                    toast.error('You Lose!', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    });
                }
                setCurrentTry(currentTry - 1)
            }
        }
    }, [combination])

    const getColorStyle = (color) => {
        return { backgroundColor: color };
    }

    const generate = () => {
        let newCombination = []
        let unallowedNumbers = []
        for (let i = 0; i < 4; i++) {
            let generatedNumber = null;
            while (generatedNumber == null || (generatedNumber != null && unallowedNumbers.indexOf(generatedNumber) != -1)) {
                generatedNumber = Math.floor(Math.random() * 6)
            }
            unallowedNumbers.push(generatedNumber)
            newCombination.push(colors[generatedNumber])
        }
        setResult(newCombination)
        setCombination(initialState)
        setResutCombination(initialState)
        setCurrentTry(5)
        setDisplayResult(false)
    }

    const getChosenColorStyle = (list) => {
        return { backgroundColor: combination[list[0]][list[1]] };
    }

    const selectChosenColor = (list) => {
        if (result.length === 0) {
            toast.error('Generate a Combination First!', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        } else if (!selectedColor) {
            toast.error('Choose a Color!', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        } else {
            if (list[0] === currentTry) {
                setCombination(prevCombination => {
                    return {
                        ...prevCombination,
                        [list[0]]: prevCombination[currentTry].map((item, index) => (index === list[1] ? selectedColor : item)),
                    };
                });
            }
        }
    }

    const getResultColorStyle = (list) => {
        return { backgroundColor: resultCombination[list[0]][list[1]] };
    }

    return (
        <div>
            <div className="flex items-center justify-center text-black">
                <div className="border-4 rounded-xl border-amber-900 mt-7 lg:mt-14 p-3">
                    <div className="flex">
                        <div style={{ backgroundColor: 'white' }} className=' h-10 w-10 rounded-full border border-black' />
                        <div className="mt-2 font-semibold pl-2">Correct Place</div>
                    </div>
                    <div className="flex mb-5 mt-1">
                        <div style={{ backgroundColor: 'black' }} className='h-10 w-10 rounded-full border border-black' />
                        <div className="mt-2 font-semibold pl-2">Incorrect Place but Exists</div>

                    </div>

                    {result.length !== 0 && <div className="my-5">
                        <h5 className="font-semibold">Try to Guess:</h5>
                        <div className="flex">
                            {result.map(color => (
                                <div key={color} style={displayResult ? getColorStyle(color) : { backgroundColor: 'grey' }} className='h-10 w-10 rounded-full mx-1 border border-black' />
                            ))}
                        </div>
                    </div>
                    }

                    <div className="border-y-4 rounded-xl border-amber-900">
                        {Array(6).fill(null).map((row, indexRow) => (
                            <div key={indexRow} className="grid grid-cols-5">
                                <div className="col-span-4 flex">
                                    {Array(4).fill(null).map((col, indexCol) => (
                                        <div key={indexRow + '-' + indexCol} onClick={() => selectChosenColor([indexRow, indexCol])} style={getChosenColorStyle([indexRow, indexCol])} className={`h-10 w-10 border border-black rounded-full m-1 ${indexRow === currentTry ? 'hover:cursor-pointer' : ''}`} />
                                    ))}
                                </div>

                                <div className="col-span-1">
                                    <div className="flex">
                                        {Array(2).fill(null).map((col, indexCol) => (
                                            <div key={indexRow + '-' + indexCol} style={getResultColorStyle([indexRow, indexCol])} className={`h-5 w-5 border border-black rounded-full m-1`} />
                                        ))}
                                    </div>
                                    <div className="flex">
                                        {Array(2).fill(null).map((col, indexCol) => (
                                            <div key={indexRow + '-' + indexCol} style={getResultColorStyle([indexRow, indexCol + 2])} className={`h-5 w-5 border border-black rounded-full m-1`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h5 className="font-semibold text-center mt-4">Choose a Color:</h5>
                    <div className="flex">
                        {colors.map(color => (
                            <div key={color} onClick={() => setSelectedColor(color)} style={getColorStyle(color)} className={`h-10 w-10 rounded-full  hover:cursor-pointer mx-1 ${selectedColor === color ? 'border-black border-8' : 'border border-black'}`} />
                        ))}
                    </div>

                    <button onClick={generate} className="rounded-md w-full mt-5 border border-amber-900 px-3 py-2 hover:bg-amber-900 hover:text-white">New Game</button>
                </div>
            </div>
            <div className="grid grid-cols-12 mb-16 mt-10">
                <div className="col-span-12 lg:col-start-3 lg:col-span-8 p-4 bg-gray-200 bg-opacity-30 m-4 mb-0 rounded-lg cursor-pointer" onClick={() => setAccordionOpen(!accordionOpen)}>
                    <button
                        className="flex items-center justify-between text-slate-600 w-full text-2xl"
                    >
                        <span className="flex-1 text-left">Instructions</span>
                        <div className="flex items-center">
                            <SlArrowDown className={`shrink-0 w-6 h-6 ${accordionOpen && 'hidden'}`} />
                            <SlArrowUp className={`shrink-0 w-6 h-6 ${!accordionOpen && 'hidden'}`} />
                        </div>
                    </button>
                    <div
                        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${accordionOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                            }`}
                    >
                        <div className="overflow-hidden">
                            <hr className="border-t border-t-slate-600 mt-4 mb-2" />
                            <h2 className="text-xl font-semibold">The Code</h2>
                            <p className="">
                                The code consists of 4 pegs, each with one of the available colors.
                            </p>

                            <h2 className="text-xl font-semibold mt-4">Making a Guess</h2>
                            <p className="">
                                You will have multiple attempts to guess the code. After each guess, you will receive feedback in the form of colored pegs:
                            </p>
                            <ul className="list-disc list-inside ml-4 mt-2 ">
                                <li><span className="font-bold">White peg:</span> You guessed the correct color in the correct position.</li>
                                <li><span className="font-bold">Black peg:</span> You guessed a correct color, but it’s in the wrong position.</li>
                                <li><span className="font-bold">No peg:</span> The color is not in the code at all.</li>
                            </ul>

                            <h2 className="text-xl font-semibold mt-4">Feedback Example</h2>
                            <p className="">
                                If the secret code is: <span className="font-bold">Red, Blue, Green, Yellow</span><br />
                                And your guess is: <span className="font-bold">Red, Yellow, Green, Blue</span>
                            </p>
                            <p className=" mt-2">
                                Feedback:
                            </p>
                            <ul className="list-disc list-inside ml-4 ">
                                <li><span className="font-bold">1 black peg</span> (Red is in the correct position)</li>
                                <li><span className="font-bold">2 white pegs</span> (Blue and Yellow are correct colors but in the wrong positions)</li>
                                <li><span className="font-bold">1 incorrect peg</span> (Green is correct but in the wrong position)</li>
                            </ul>

                            <h2 className="text-xl font-semibold mt-4">Winning the Game</h2>
                            <p className="">
                                You win if you guess the exact code (correct colors in the correct positions) within the given attempts.
                            </p>

                            <h2 className="text-xl font-semibold mt-4">Tips</h2>
                            <ul className="list-disc list-inside ml-4 ">
                                <li>Pay close attention to the feedback after each guess.</li>
                                <li>Use logic and deduction to eliminate possible combinations.</li>
                            </ul>

                            <p className=" font-bold mt-4">Good luck, and have fun cracking the code!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleColors