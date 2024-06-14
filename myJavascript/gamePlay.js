
function playGame() {
    
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            explodedPiece.x = myGamePiece.x - 15;
            explodedPiece.y = myGamePiece.y - 5;
            explodeSound.play();
            myGameArea.gameState = 2;
            return;
        } 
    }
    
    for (i = 0; i < myPickups.length; i += 1) {
        if (myGamePiece.crashWith(myPickups[i])) {
            moneyPickedUp +=1;
            moneyNumPiece.sheetX = moneyPickedUp*20;
            myPickups.splice(i,1);
            pickupSound.play();
            if(moneyPickedUp == 5)
            {
                myGameArea.gameState = 4;
            }
            return;
        } 
    }
    
    myGameArea.clear();

    background.update();
    background.newPos();

    
    if(myGameArea.frameNo%8 == 0)
    {
        frameStart +=1;
        if(frameStart > 7){frameStart = 0;}
    }

    if (myGameArea.frameNo == 1 || everyinterval(40)) {
        volleyCount +=1;
        AsteroidsPoints = 12;
        whichColor = Math.floor(Math.random()*(AsteroidColor.length));
        minX = 10+whichColor*25;
        maxX = 40+whichColor*30;
        StartX = Math.floor(Math.random()*(maxX-minX+1)+minX);
        gap = StartX;
        while(AsteroidsPoints>0)
        {
            RandY = Math.floor(Math.random()*(40)-70);// -70 to -30
            
            switch(AsteroidColor[whichColor])
            {
                case "green":
                    myObstacles.push(new roundComponent(50, "green", gap, RandY));
                    gap +=90;
                    AsteroidsPoints -=6;
                    break;
                case "purple":
                    myObstacles.push(new roundComponent(25, "purple", gap, RandY));
                    gap +=65;
                    AsteroidsPoints -=4;
                    break;
                case "red":
                    if(volleyCount >= 5)
                    {
                        myPickups.push(new roundComponent(18, "money", gap, RandY));
                        gap +=38;
                        volleyCount = 0;
                    }
                    else
                    {
                        myObstacles.push(new roundComponent(18, "red", gap, RandY));
                        gap +=58;
                        AsteroidsPoints -=3;
                    }
                    break;
            }
            whichColor = Math.floor(Math.random()*(AsteroidColor.length));
            minGap = 20+whichColor*30;
            maxGap = 40+whichColor*30;
            gap += Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        }
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].y += 5;
        myObstacles[i].update(frameStart);
    }

    for (i = 0; i < myPickups.length; i += 1) {
        myPickups[i].y += 5;
        myPickups[i].update(frameStart);
    }

    arrowKeys(myGameArea.frameNo, frameImg);
    
    myGamePiece.newPos();
    myGamePiece.update();

    moneyCounterPiece.update();
    moneyNumPiece.update();

}

function resetGame(){

    //get rid of old asteroids and pickUps
    myObstacles.splice(0, myObstacles.length); 
    myPickups.splice(0, myPickups.length);
    moneyPickedUp = 0;
    moneyNumPiece.sheetX = 0;
    myGamePiece.x= 120;
    myGamePiece.y= 390;

}