import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

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

    const checkWinner = () => {
        let winner = true;
        let tmpResult = []
        for (let i = 0; i < result.length; i++) {
            if (combination[currentTry][i] === result[i]) {
                tmpResult.push("grey")
            } else if (combination[currentTry].includes(result[i])) {
                tmpResult.push("black")
                winner = false;
            } else {
                winner = false;
            }
        }
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
                    position: "top-right",
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
                        position: "top-right",
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
            toast.error('You must Generate a Combination!', {
                position: "top-right",
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
            toast.error('You must choose a Color!', {
                position: "top-right",
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
        <div className="flex items-center justify-center">
            <div className=''>
                <div className="flex mt-10">
                    <div style={{ backgroundColor: 'grey' }} className=' h-10 w-10 rounded-full border' />
                    <div className="mt-2 font-bold">Correct Place</div>
                </div>
                <div className="flex mb-5">
                    <div style={{ backgroundColor: 'black' }} className='h-10 w-10 rounded-full border' />
                    <div className="mt-2 font-bold">Incorrect Place but Exists</div>

                </div>

                <h5 className="font-bold">Choose a Color:</h5>
                <div className="flex">
                    {colors.map(color => (
                        <div key={color} onClick={() => setSelectedColor(color)} style={getColorStyle(color)} className={`h-10 w-10 rounded-full border-4  hover:cursor-pointer mx-1 ${selectedColor === color ? 'border-black' : ''}`} />
                    ))}
                </div>

                {result.length !== 0 && <div className="my-5">
                    <h5 className="font-bold">Try to Guess:</h5>
                    <div className="flex">
                        {result.map(color => (
                            <div key={color} style={displayResult ? getColorStyle(color) : { backgroundColor: '#DAD6D6' }} className='h-10 w-10 rounded-full mx-1 border border-black' />
                        ))}
                    </div>
                </div>
                }

                {Array(6).fill(null).map((row, indexRow) => (
                    <div key={indexRow} className="flex">
                        {Array(4).fill(null).map((col, indexCol) => (
                            <div key={indexRow + '-' + indexCol} onClick={() => selectChosenColor([indexRow, indexCol])} style={getChosenColorStyle([indexRow, indexCol])} className={`h-10 w-10 border border-black rounded-full m-1 ${indexRow === currentTry ? 'hover:cursor-pointer' : ''}`} />
                        ))}
                        <div>
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

                <button onClick={generate} className="rounded-md w-full mt-5 border border-black px-3 py-2 hover:bg-black hover:text-white">New Game</button>

            </div>
        </div>
    )
}

export default SingleColors