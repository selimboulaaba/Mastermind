import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

function App() {
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


  const checkWinner = () => {
    let winner = true;
    for (let i = 0; i < result.length; i++) {
      if (combination[currentTry][i] === result[i]) {
        setResutCombination(prevCombination => {
          return {
            ...prevCombination,
            [currentTry]: prevCombination[currentTry].map((item, index) => (((index === 0 && item === null) || (prevCombination[currentTry][index - 1] != null)) ? "grey" : item)),
          };
        });
      } else if (combination[currentTry].includes(result[i])) {
        winner = false;
        setResutCombination(prevCombination => {
          return {
            ...prevCombination,
            [currentTry]: prevCombination[currentTry].map((item, index) => (((index === 0 && item === null) || (prevCombination[currentTry][index - 1] != null)) ? "black" : item)),
          };
        });
      } else {
        winner = false;
      }
    }
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
            [list[0]]: prevCombination[currentTry].map((item, index) => (index === list[1] && item === null ? selectedColor : item)),
          };
        });
      }
    }
  }

  const getResultColorStyle = (list) => {
    return { backgroundColor: resultCombination[list[0]][list[1]] };
  }

  return (
    <div className='m-20'>
      <h5>Choose a Color:</h5>
      <div className="flex">
        {colors.map(color => (
          <div key={color} onClick={() => setSelectedColor(color)} style={getColorStyle(color)} className={`h-10 w-10 rounded-full border-2  hover:cursor-pointer mx-1 ${selectedColor === color ? 'border-black' : ''}`} />
        ))}
      </div>

      <div className="flex mt-10">
        <div className="mt-2">Correct Place</div>
        <div style={{ backgroundColor: 'grey' }} className=' h-10 w-10 rounded-full border' />
        <div className="mt-2">Incorrect Place but Exists</div>
        <div style={{ backgroundColor: 'black' }} className='h-10 w-10 rounded-full border' />
      </div>

      <div className="flex mt-5">
        {result.length != 0 && result.map(color => (
          <div key={color} style={getColorStyle(color)} className='mt-10 h-10 w-10 rounded-full border' />
        ))}
      </div>
      <button onClick={generate} className="mb-10 border border-black px-3 py-2 hover:bg-black hover:text-white">New Game</button>


      {Array(6).fill(null).map((row, indexRow) => (
        <div key={indexRow} className="flex">
          {Array(4).fill(null).map((col, indexCol) => (
            <div key={indexRow + '-' + indexCol} onClick={() => selectChosenColor([indexRow, indexCol])} style={getChosenColorStyle([indexRow, indexCol])} className={`h-10 w-10 border border-black rounded-full m-1 ${indexRow === currentTry ? 'hover:cursor-pointer' : ''}`} />
          ))}
          <div className="ml-5"></div>
          {Array(4).fill(null).map((col, indexCol) => (
            <div key={indexRow + '-' + indexCol} style={getResultColorStyle([indexRow, indexCol])} className={`h-10 w-10 border border-black rounded-full m-1`} />
          ))}
        </div>
      ))}

    </div>
  )
}

export default App
