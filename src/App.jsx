import { useState } from "react";

function App() {
  const colors = ['red', 'green', 'blue', 'orange', 'pink', 'yellow']
  const [selectedColor, setSelectedColor] = useState("")
  const [combination, setCombination] = useState([])

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
    setCombination(newCombination)
  }

  const getChosenColorStyle = () => {

  }

  const selectChosenColor = (test) => {
    console.log(test)
  }

  return (
    <div className='m-20'>
      <div className="flex">
        {colors.map(color => (
          <div key={color} onClick={() => setSelectedColor(color)} style={getColorStyle(color)} className='h-10 w-10 rounded-full border hover:cursor-pointer mx-1' />
        ))}
      </div>

      <div className="flex">
        {combination.length != 0 && combination.map(color => (
          <div key={color} style={getColorStyle(color)} className='mt-10 h-10 w-10 rounded-full border' />
        ))}
      </div>
      <button onClick={generate} className="mb-10 border border-black px-3 py-2 hover:bg-black hover:text-white">New Game</button>


      {Array(6).fill(null).map((row, indexRow) => (
        <div className="flex">
          {Array(4).fill(null).map((col, indexCol) => (
            <div key={indexRow + '-' + indexCol} onClick={() => selectChosenColor(indexRow + '-' + indexCol)} style={getChosenColorStyle(indexRow + '-' + indexCol)} className="h-10 w-10 border border-black rounded-full m-1" />
          ))}
        </div>
      ))}

    </div>
  )
}

export default App
