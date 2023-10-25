
const Gameboard = function(){ 
    const row = 8;
    const column = 8;
    let board = [];
    const boardDiv = document.querySelector(".gameboard");
    let currentPos;

    for (let r=0; r < row; r++){
        for(let c=0; c < column; c++){
            const createCell = document.createElement("div");
            createCell.classList = "cell";
            createCell.id = `${r}, ${c}`
            board.push([r, c]);
            boardDiv.appendChild(createCell)
        }
    }

    const cells = document.querySelectorAll(".cell")
    for(let i = 0; i < board.length; i++){
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
            if (cells[i].classList[2] === "active" || cells[i].classList[1] === "active" ){
                console.log("Do Nothing")
                return
            }
            if (cells[i].classList[1] === "black-cell") {   
                drawKnightOL(cells[i])
                cells[i].classList.add("active")
            } else {
                drawKnight(cells[i])
                cells[i].classList.add("active")
            }
            
            
        })
    }


}


const Start = function(){
    const startBtn = document.querySelector("#start-btn");
    const mainDiv = document.querySelector(".main");
   
    startBtn.addEventListener("click", ()=>{
        startBtn.classList.add("inactive");
        // drawKnight(mainDiv);
        Gameboard();
    })
}

const drawKnight = function(mainDiv){
    const knightImg = document.createElement("img");
    knightImg.src = "images/knight.png";
    knightImg.classList = "knight-img";
    mainDiv.appendChild(knightImg);
}

const drawKnightOL = function(mainDiv){
    const knightImgOL = document.createElement("img");
    knightImgOL.src = "images/knightOL.png";
    knightImgOL.classList = "knight-img";
    mainDiv.appendChild(knightImgOL);
}
Start();