import { useEffect, useRef, useState } from "react"
import { adjustGrid } from "../../logic/GOL";



const Game = () => {

    const numRows = 11; // You can adjust the number of rows
    const [numCols, setNumCols] = useState(30)

    const [alive, setAlive] = useState(new Set())

    const isStart = useRef(false)

    const [label, setLabel] = useState("Start")

    const handleCellClick = (row, col) => {
        let coords = `${row},${col}`
        setAlive((prevSet) => {
            const newSet = new Set(prevSet);
            if (newSet.has(coords)) {
                newSet.delete(coords);
            } else {
                newSet.add(coords);
            }
            return newSet;
        });


    }

    const runCheck = async () => {
        if (!isStart.current) {
            isStart.current = true
            setLabel("Stop")
            await simulateAdjustGrid()
        } else {
            isStart.current = false
            setLabel("Start")
        }
    }

    const simulateAdjustGrid = async () => {
        if (isStart.current) {
            setAlive((prevAlive) => adjustGrid(prevAlive, numCols, numRows))
            await new Promise(resolve => setTimeout(resolve, 100))
            await simulateAdjustGrid()
        }
    }

    const handleReset = () => {
        setAlive(new Set())
    }

    const handleRandomize = () => {
        handleReset()
        setAlive((prevAlive) => {
            for (let i = 0; i < 30; i++) {
                let row = Math.floor(Math.random() * numRows)
                let col = Math.floor(Math.random() * numCols)

                prevAlive.add(`${row},${col}`)
            }
            return new Set(prevAlive)
        })
    }



    useEffect(() => {
        // Adjust numCols based on screen size
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setNumCols(30);
            } else if (window.innerWidth >= 640) {
                setNumCols(12);
            } else {
                setNumCols(5);
            }
        };

        handleResize(); // Initial setup

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);



    return (
        <>
            <div className="content">
                <div className="grid lg:grid-cols-max md:grid-cols-12 sm:grid-cols-5">
                    {Array.from({ length: numRows }).map((_, rowIndex) => (
                        Array.from({ length: numCols }).map((_, colIndex) => (
                            <div
                                key={`${rowIndex},${colIndex}`}
                                className={`border border-gray-3 ${alive.has(`${rowIndex},${colIndex}`) ? "bg-yellow-400" : ""}`}
                                style={{ paddingBottom: `${100 / numCols}%` }}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                            >
                                {/* You can customize the content of each cell */}
                            </div>
                        ))
                    ))}
                </div>
            </div>
            <div className="bottom">
                <div className="flex justify-center p-3">
                    <div className="btn hover:cursor-pointer" onClick={handleRandomize}>Random</div>
                    <div className="btn hover:cursor-pointer" onClick={runCheck}>{label}</div>
                    <div className="btn hover:cursor-pointer" onClick={handleReset}>Reset</div>
                </div>
            </div>
        </>


    )
}

export default Game