

function GameInputlistener(){
    window.addEventListener('keydown', function (e) {
        if(e.code == "Enter"){
            myGameArea.keys["enter"] = true
        }
        if(e.code == "ArrowUp" || e.code == "KeyW"){
            myGameArea.keys["up"] = true
        }
        if(e.code == "ArrowLeft" || e.code == "KeyA"){
            myGameArea.keys["left"] = true
        }
        if(e.code == "ArrowDown" || e.code == "KeyS"){
            myGameArea.keys["down"] = true
        }
        if(e.code == "ArrowRight" || e.code == "KeyD"){
            myGameArea.keys["right"] = true
        }
        e.preventDefault()
    })
    window.addEventListener('keyup', function (e) {
        if(e.code == "Enter"){
            myGameArea.keys["enter"] = false
        }
        if(e.code == "ArrowUp" || e.code == "KeyW"){
            myGameArea.keys["up"] = false
        }
        if(e.code == "ArrowLeft" || e.code == "KeyA"){
            myGameArea.keys["left"] = false
        }
        if(e.code == "ArrowDown" || e.code == "KeyS"){
            myGameArea.keys["down"] = false
        }
        if(e.code == "ArrowRight" || e.code == "KeyD"){
            myGameArea.keys["right"] = false
        }
        e.preventDefault()
    })
    myGameArea.canvas.addEventListener('mousemove', function(e){
        r = myGameArea.canvas.getBoundingClientRect();
        //the 5 accounts for the canvas pixel border
        myGameArea.mouseX = e.clientX - r.left-5;
        myGameArea.mouseY = e.clientY - r.top-5;
    })
    myGameArea.canvas.addEventListener('mouseup', function(e){
        r = myGameArea.canvas.getBoundingClientRect();
        //the 5 accounts for the canvas pixel border
        myGameArea.clickedX = e.clientX - r.left-5;
        myGameArea.clickedY = e.clientY - r.top-5;
    })
}



function arrowKeys(frameNum, frameImg){
    var imageroot = "assets/spaceship/";
    var imageName;

    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0; 
    var pieceSpeed = 4;
    imageName = imageroot + "flyFoward";
    if (myGameArea.keys["left"]) 
    {
        myGamePiece.speedX = -pieceSpeed; 
        imageName = imageroot + "flyLeft";
    }//left
    if (myGameArea.keys["right"]) 
    {
        myGamePiece.speedX = pieceSpeed;
        imageName = imageroot + "flyRight";
    }//right
    if (myGameArea.keys["up"]) {myGamePiece.speedY = -pieceSpeed; }//up
    if (myGameArea.keys["down"]) {myGamePiece.speedY = pieceSpeed; }//down

    var newX = myGamePiece.x + myGamePiece.speedX;
    var newY = myGamePiece.y + myGamePiece.speedY;
    
   
    imageName = imageName + frameImg;
    

    myGamePiece.image.src = imageName;
    
    //can not leave canvas border now
    if(newX > myGameArea.canvas.width - 30)
    {
        myGamePiece.speedX = 0;
    }
    if(newX < 0)
    {
        myGamePiece.speedX = 0;
    }
    if(newY > myGameArea.canvas.height - 50)
    {
        myGamePiece.speedY = 0;
    }
    if(newY < 0)
    {
        myGamePiece.speedY= 0;
    }
}