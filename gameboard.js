
const Gb = {
    currentPos: [],
    futurePos: [],
    board: [],
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
                    if (Gb.futurePos.length !== 0){
                        Gb.futurePos.pop();
                    }

                    Gb.futurePos.push(+cells[i].id[1], +cells[i].id[4])               

                    knightMoves(Gb.board, Gb.currentPos, Gb.futurePos)
                }
            })
            }
            
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
    }
    
}

const knightMoves = function(board, start, end){
    console.log(board, start, end)
    let startInd = findIndex(board, start)
    let endInd = findIndex(board, end)
    let infoArr = createInfoArr(board, startInd)
    let adjList = createAdjList(board)
    // let queue = new Queue();
    // queue.enqueue[startInd]

    
return knightPossMoves(start)
    
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
        let neighbours
        for (let j = 0; j < 8; j ++){
            neighbours = knightPossMoves(board[i])
        }
        adjList[i] =  neighbours
    }
    console.log(adjList)
}

const doBFS = function(graph, source) {
    // let bfsInfo = [];
    // for (let i =0; i < graph.length; i++){
    //     bfsInfo[i] = {
    //         distance: null,
    //         predecessor: null
    //     }
    // }
    // bfsInfo[source].distance = 0;

    let queue = new Queue();
    queue.enqueue(source);
    while(!queue.isEmpty()){
        let toDeq = queue.dequeue();
        for (let i=0; i < graph[toDeq].length; i++){
            let neighbour = graph[toDeq][i];
            if (bfsInfo[neighbour].distance === null){
                bfsInfo[neighbour].distance = bfsInfo[toDeq].distance + 1;
                bfsInfo[neighbour].predecessor = toDeq;
                queue.enqueue(neighbour)
            }
        }
    }
    return bfsInfo
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



