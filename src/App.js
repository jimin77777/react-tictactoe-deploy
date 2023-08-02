import {useState} from "react";
import './App.css';
import Board from "./components/Board";


function App() {  
  const [history, setHistory] = useState([{squares:Array(9).fill(null)}]); // 9칸짜리빈배열이 들어있는 오브젝트
  const [xIsNext, setXIsNext] = useState(true); // 다음 순서가 x인지 o인지 
  const [stepNumber, setStepNumber] = useState(0); 

  // 누가 이겼는지 판별
  const calculateWinner = (squares) =>{
    // 이길 수 있는 경우의 수
    const lines = [ 
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]

    // 이길 수 있는 경우의 수 만큼 반복문 돌리기
    for(let i = 0; i < lines.length; i++){
      // 
      const [a,b,c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a]
      }
    }
    return null;
  }
  
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  let status;
  if(winner){
    status = 'Winner :' + winner;
  }else{
    status = `Next player: ${xIsNext? 'X' : 'O'}`;
  }

  const handleClick = (i)=>{
    const newHistory = history.slice(0, stepNumber +1);
    const newCurrent = newHistory[newHistory.length -1];
    const newSquares = newCurrent.squares.slice();

    if(calculateWinner(newSquares) || newSquares[i]){
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setHistory([...newHistory, {squares:newSquares}]);
    setXIsNext(prev => !prev);

    setStepNumber(newHistory.length);
  }
  
  const moves = history.map((step, move)=>{
    const desc = move
    ? 'Go to move #' + move
    : 'Go to game start';
    return(
      <li key={move}>
        <button className="move-button" onClick={()=>{jumpTo(move)}}>{desc}</button>
      </li>
    )
  })
  const jumpTo = (step)=>{
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board 
          squares={current.squares}
          onClick={(i)=>handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div className='status'>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
