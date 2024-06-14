

function menuPiecesToMove()
{
    currentMenuObjects.splice(0, currentMenuObjects.length);
    currentMenuObjects.push(titlePiece);
    currentMenuObjects.push(creditPiece);
    currentMenuObjects.push(startPiece);
    currentMenuObjects.push(howToPiece);
    currentMenuObjects.push(creditButtonPiece);
    currentMenuObjects.push(infoPiece);
    currentMenuObjects.push(leftBackPiece);
    currentMenuObjects.push(rightBackPiece);
}

function isPressed(key)
{
    if(typeof(key) == "undefined")
        return false;
    else
        return key;
}

function startMenu()
{

    myGameArea.clear();

    background.update();
    background.newPos();

    for(i = 0; i< currentMenuObjects.length; i++)
    {
        currentMenuObjects[i].update();
    }

    animFrame = 0;
    switch(menuState){
        case 0:
            if(startPiece.clicked()){
                animFrame = 0;
                dummyPiece.x = 120;
                dummyPiece.y = 500;
                myGameArea.gameState = 3;
            }
            else if(creditButtonPiece.clicked()){
                menuState=1;
                myGameArea.gameState = 5;
            }
            else if(infoPiece.clicked()){
                menuState=2;
                myGameArea.gameState = 6;
            }

            if(isPressed(myGameArea.keys["enter"])){
                animFrame = 0;
                dummyPiece.x = 120;
                dummyPiece.y = 500;
                myGameArea.gameState = 3;
            }
            if(isPressed(myGameArea.keys["left"])){
                menuState=1;
                myGameArea.gameState = 5;
            }
            if(isPressed(myGameArea.keys["right"])){
                menuState=2;
                myGameArea.gameState = 6;
            }

            break;
        case 1:
            if(leftBackPiece.clicked()){
                menuState=0;
                myGameArea.gameState = 6;
            }
            if(isPressed(myGameArea.keys["right"])){
                menuState=0;
                myGameArea.gameState = 6;
            }
            break;
        case 2:
            if(rightBackPiece.clicked()){
                menuState=0;
                myGameArea.gameState = 5;
            }
            if(isPressed(myGameArea.keys["left"])){
                menuState=0;
                myGameArea.gameState = 5;
            }
            break;
    }
    
}


function deathMenu()
{

    myGameArea.clear();

    background.update();

    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].update(frameStart);
    }

    for (i = 0; i < myPickups.length; i += 1) {
        myPickups[i].update(frameStart);
    }

    explodedPiece.update();

    restartPiece.x = 83;
    restartPiece.y = 300;
    restartPiece.update();

    if(restartPiece.clicked() || myGameArea.keys["enter"])
    {
        myGameArea.reset();
        animFrame = 0;
        currentMenuObjects.splice(0, currentMenuObjects.length);
        currentMenuObjects.push(restartPiece);
        dummyPiece.x = 120;
        dummyPiece.y = 500;
        myGameArea.gameState = 3;
    }

    moneyCounterPiece.update();
    moneyNumPiece.update();
}


function startToPlay()
{
    animFrame++;
    var menuAnimationPath = function(animationFrame)
    {
        return -(0.05*((animationFrame - 10)**2) - 5);
    }

    var dummyShipAnimationPath = function(animationFrame)
    {
        return ((1/6)*(animationFrame) - 13.5);
    }

    myGameArea.clear();

    background.update();
    background.newPos();

    for(i = 0; i< currentMenuObjects.length; i++)
    {
        currentMenuObjects[i].update();
        currentMenuObjects[i].speedX = 0;
        currentMenuObjects[i].speedY = menuAnimationPath(animFrame);
        currentMenuObjects[i].newPos();
    }

    var flash = [60, 100, 140]
    var duration = 25;

    for(i = 0; i< flash.length; i++)
    {
        if(animFrame == flash[i])
        {
            boopSound.play();
        }
        if(animFrame > flash[i] && animFrame < (flash[i]+duration) )
        {
            splashscreenPiece.update();
        }
    }

    coor = animFrame;
    document.getElementById("demo").innerHTML = coor;

    if(frameImg == "f1.png")
    {
        dummyPiece.image.src = "assets/spaceship/flyfowardf1.png";
    }
    else
    {
        dummyPiece.image.src = "assets/spaceship/flyfowardf2.png";
    }
    dummyPiece.update()
    if(animFrame > 40 && animFrame < 99 )
    {
        
        dummyPiece.speedX = 0;
        dummyPiece.speedY = dummyShipAnimationPath(animFrame);
        dummyPiece.newPos();
    }

    if(animFrame >= 200)
    {
        myGameArea.gameState = 1;
    }

}

function youWin()
{
    myGameArea.clear();

    background.update();
    background.newPos();

    winScreenPiece.update();

    restartPiece.x = 83;
    restartPiece.y = 300;
    restartPiece.update();

    if(restartPiece.clicked() || myGameArea.keys["enter"])
    {
        myGameArea.reset();
        animFrame = 0;
        currentMenuObjects.splice(0, currentMenuObjects.length);
        currentMenuObjects.push(restartPiece);
        dummyPiece.x = 120;
        dummyPiece.y = 500;
        myGameArea.gameState = 3;
    }

    moneyCounterPiece.update();
    moneyNumPiece.update();

}

function shiftMenuLeft()
{
    var menuAnimationPath = function(animationFrame)
    {
        return (-0.65*(animationFrame) + 20.075);
    }

    myGameArea.clear();

    background.update();
    background.newPos();

    animFrame++;
    
    for(i = 0; i< currentMenuObjects.length; i++)
    {
        currentMenuObjects[i].update();
        if(animFrame <= 40)
        {
            currentMenuObjects[i].speedX = menuAnimationPath(animFrame);
            currentMenuObjects[i].speedY = 0;
            currentMenuObjects[i].newPos();
        }
    }

    if(animFrame > 54)
    {
        myGameArea.gameState = 0;
    }

  
    
}

function shiftMenuRight()
{
    var menuAnimationPath = function(animationFrame)
    {
        return -(-0.65*(animationFrame) + 20.075);
    }
    myGameArea.clear();

    background.update();
    background.newPos();

    animFrame++;
    
    for(i = 0; i< currentMenuObjects.length; i++)
    {
        currentMenuObjects[i].update();
        if(animFrame <= 40)
        {
            currentMenuObjects[i].speedX = menuAnimationPath(animFrame);
            currentMenuObjects[i].speedY = 0;
            currentMenuObjects[i].newPos();
        }
    }

    
    if(animFrame > 54)
    {
        myGameArea.gameState = 0;
    }
    
}

