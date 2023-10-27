
const Gb = {
    currentPos: [],
    futurePos: [],
    board: [],
    steps: [],
    spawnBoard: ()=>{
        const row = 8;
        const column = 8;
        const boardDiv = document.querySelector(".gameboard");
    
        for (let r=0; r < row; r++){
            for(let c=0; c < column; c++){
                const createCell = document.createElement("div");
                createCell.classList = "cell";
                createCell.id = `[${r}, ${c}]`
                Gb.board.push([r, c]);
                boardDiv.appendChild(createCell)

            }
        }
        const top = document.querySelector(".top")
        const left = document.querySelector(".left")
        top.classList.remove("inactive");
        left.classList.remove("inactive");
    
        const cells = document.querySelectorAll(".cell")
        for(let i = 0; i < Gb.board.length; i++){
            if ( i >= 0 && i <= 7 || i >= 16 && i <= 24  || i >= 32 && i <= 40 || i >= 48 && i <= 56){
                if (i%2 !== 0){
                    cells[i].classList.add("black-cell")
                }  
            }
            if ( i >= 8 && i <= 15 || i >= 24 && i <= 31 || i >= 40 && i <= 47 || i >= 56 && i <= 64){
                if (i%2 === 0){
                    cells[i].classList.add("black-cell")
                }  
            }
            cells[i].addEventListener("click", ()=>{
                if (Gb.currentPos.length === 0) {
                    Gb.firstKnightPos(cells,i)
                    Gb.currentPos.push(+cells[i].id[1], +cells[i].id[4])
                } else if (Gb.currentPos.length !== 0){
                    //get the position where they want the knight to go as the second selection to run
                    //function to find how many moves to get to where they want
                    // if (Gb.futurePos.length !== 0){
                    //     Gb.futurePos.pop();
                    // }
                    if(Gb.futurePos.length > 1){
                        location.reload();
                    } else {
                        Gb.futurePos.push(+cells[i].id[1], +cells[i].id[4])               
                        Gb.steps = knightMoves(Gb.board, Gb.currentPos, Gb.futurePos)
                        Gb.drawingSteps(cells)
                        Gb.printSteps();
                    }
                    
                }
            })
            }
            Gb.refreshBtn();
    },
    firstKnightPos: function(a, i){
        if (a[i].classList[1] === "black-cell") {   
            Gb.drawKnightOL(a[i])
            a[i].classList.add("active")
        } else {
            Gb.drawKnight(a[i])
            a[i].classList.add("active")
        }  
    },
    drawKnight: function(mainDiv){
        const knightImg = document.createElement("img");
        knightImg.src = "images/knight.png";
        knightImg.classList = "knight-img";
        mainDiv.appendChild(knightImg);
    },
    drawKnightOL: function(mainDiv){
        const knightImgOL = document.createElement("img");
        knightImgOL.src = "images/knightOL.png";
        knightImgOL.classList = "knight-img";
        mainDiv.appendChild(knightImgOL);
    },
    drawingSteps: function(cells){
        Gb.steps.forEach(step=>{
            let stepIndex = findIndex(Gb.board, step)
            Gb.firstKnightPos(cells, stepIndex)
        })
    },
    refreshBtn: function(){
        const refreshDiv = document.querySelector(".refresh")
        const refreshBtn = document.createElement("button");
        refreshBtn.textContent = "Refresh";
        refreshBtn.style.margin = "20px";
        refreshDiv.appendChild(refreshBtn);
        refreshBtn.addEventListener("click",()=>{
            location.reload();
        })       
    },
    printSteps: function(){
        const stepsDiv = document.querySelector(".steps");
        const createText = document.createElement("div");
        let s = "";
        let a = [...Gb.steps]
        a.forEach(step=>{
            s += " to " + step.toString()  
        })
        createText.textContent = `${Gb.currentPos} ${s}`
        stepsDiv.appendChild(createText)

    }

    
}

const knightMoves = function(board, start, end){
    let startInd = findIndex(board, start)
    let endInd = findIndex(board, end)
    let infoArr = createInfoArr(board, startInd)
    let adjList = createAdjList(board)
    let queue = new Queue();
    let steps = [];
    queue.enqueue(startInd);
    let toDeq;
    toDeq = queue.items[0]

//BFS
    while(toDeq != endInd) {
        toDeq = queue.dequeue()
        for (let i=0; i < adjList[toDeq].length; i++){           
            let neighbour = adjList[toDeq][i];
            // find position equivalent in board
            let neighbourIndex = findIndex(board, neighbour)
            if(neighbourIndex === endInd){
                infoArr[neighbourIndex].predecessor = toDeq;
                infoArr[neighbourIndex].distance = infoArr[toDeq].distance +1;
                steps = predecessorFn(board, infoArr, toDeq, steps);
                let printingSteps = printSteps(steps)
                console.log(`Starting Point: ${board[startInd]} \nEnding Point: ${board[endInd]} \nMinimum steps: ${infoArr[neighbourIndex].distance} steps.`)
                console.log(`The steps are: ${printingSteps}${board[endInd]}`)
                steps.shift()
                steps.push(board[endInd])
                return steps
            } else {
                if(infoArr[neighbourIndex].distance === null){
                    infoArr[neighbourIndex].distance = infoArr[toDeq].distance +1;
                    infoArr[neighbourIndex].predecessor = toDeq;
                    queue.enqueue(neighbourIndex)                              
                }
            }
        } 
    }
}

const predecessorFn = function (board, infoArr, toDeq, steps){
   let distance = infoArr[toDeq].distance   
   let pred = toDeq;
   steps = [board[toDeq]];
   for (let i = distance; i > 0; i--){
    pred = infoArr[pred].predecessor
    steps.unshift(board[pred])
   }
   return steps;
}
const printSteps = function(steps){
    let s = "\n";
    steps.forEach(step=>{
        s += `${step.toString()} \n`
    })
    return s
}
const removeOffTheBoard = function(l){
    let newArr = []
    l.forEach(item=>{        
        if (item[0] >= 0 && item [1] >= 0 && item[0] <= 7 && item[1] <= 7){
            newArr.push(item)
        }
    })
    return newArr
}
const knightPossMoves = function(pos){

    let list = [];
    // y axis and x axis for first position
    let ya = pos[0]
    let xa = pos[1];
    // possible moves
    let pmOne = [ya + 2, xa + 1];
    let pmTwo = [ya + 1, xa + 2];
    let pmThree = [ya - 1, xa + 2];
    let pmFour = [ya - 2, xa + 1];
    let pmFive = [ya - 1, xa - 2];
    let pmSix = [ya - 2, xa - 1];
    let pmSeven = [ya + 2, xa - 1];
    let pmEight = [ya + 1, xa - 2];
    list = [pmOne, pmTwo, pmThree, pmFour, pmFive, pmSix, pmSeven, pmEight];
    return removeOffTheBoard(list);        
}
const findIndex = function(board, toFind){
    let index;
    board.forEach(pos=>{
        if (pos[0] === toFind[0] && pos[1] === toFind[1]){
            index = board.indexOf(pos)
        } 
    })
    return index
}
const createInfoArr = function (board, startInd){
    let newArr = []
    for (let i =0; i < board.length; i++){
        newArr[i] = {
            distance: null,
            predecessor: null
        }
    }
    newArr[startInd].distance = 0;
    return newArr
}
const createAdjList = function(board){
    let adjList = [];
    for (let i =0; i < board.length; i ++){
        let neighbours;
        for (let j = 0; j < 8; j ++){
            neighbours = knightPossMoves(board[i])
        }
        adjList[i] =  neighbours
    }
    return adjList
}
class Queue {
    constructor() {
        this.items = [];
    }
    enqueue(obj) {
        this.items.push(obj);
    }
    dequeue() {
        return this.items.shift();
    }
    isEmpty() {
        return this.items.length === 0;
    }
}
export const Start = function(){
    const startBtn = document.querySelector("#start-btn");
   
    startBtn.addEventListener("click", ()=>{
        startBtn.classList.add("inactive");
        Gb.spawnBoard();
    })
}



