

var myGamePiece;
var myObstacles = [];
var myPickups = [];
var frameImg = "f1.png";
var frameStart = 0;
var AsteroidColor = ["red", "purple", "green"]; 
var volleyCount = 0;
var currentMenuObjects = [];
var animFrame = 0;
var moneyPickedUp = 0;
var menuState = 0;

function startGame() {
    myGameArea.start();
    background = new backgroundComponent(270, 480, "assets/StarySky.png", 0, 0);
    myGamePiece = new component(30, 50, "assets/spaceship/flyfowardf1.png", 120, 390);
    
    explodedPiece = new component(60, 60, "assets/spaceship/exploded.png", 120, 390);
    dummyPiece = new component(30, 50, "assets/spaceship/flyfowardf1.png", 120, 500); //placed "below" the screen

    startPiece = new menuComponent(76, 35, "assets/menuObjects.png", 97, 300, 0, 100, true);
    restartPiece = new menuComponent(104, 35, "assets/menuObjects.png", 83, 300, 0, 150, true);
    creditButtonPiece = new menuComponent(102, 35, "assets/menuObjects.png", 55, 340, 0, 240, true);
    leftBackPiece = new menuComponent(68, 35, "assets/menuObjects.png", -169, 300, 0, 200, true);
    infoPiece = new menuComponent(52, 35, "assets/menuObjects.png", 163, 340, 0, 440, true);
    rightBackPiece = new menuComponent(68, 35, "assets/menuObjects.png", 371, 300, 0, 200, true);

    titlePiece = new menuComponent(150, 91, "assets/menuObjects.png", 60, 100, 0, 0, false);
    splashscreenPiece = new menuComponent(95, 85, "assets/menuObjects.png", 88, 100, 0, 280, false);
    winScreenPiece = new menuComponent(270, 480, "assets/winScreen.png", 0, 0, 0, 0, false);
    creditPiece = new menuComponent(270, 480, "assets/Credits.png", -270, 0, 0, 0, false);
    howToPiece = new menuComponent(270, 480, "assets/HowTo.png", 270, 0, 0, 0, false);
    

    moneyCounterPiece = new menuComponent(154, 26, "assets/menuObjects.png", 10, 10, 0, 340, false);
    moneyNumPiece = new menuComponent(20, 26, "assets/menuObjects.png", 115, 10, 0, 400, false);

    explodeSound = new sound("assets/sounds/Explosion2.wav");
    pickupSound = new sound("assets/sounds/Money.wav");
    boopSound = new sound("assets/sounds/Start.wav");
    menuPiecesToMove()

    
}

var myGameArea = {
    canvas : document.getElementById("myCanvas"),
    start : function() {
        this.canvas.width = 270;
        this.canvas.height = 480;
        this.canvas.tabIndex = 1;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.gameState = 0;
        this.interval = setInterval(updateGameArea, 20);
        this.keys = [
            {key: "enter", value: false},
            {key: "up", value: false},
            {key: "left", value: false},
            {key: "down", value: false},
            {key: "right", value: false},
        ];
        GameInputlistener();
    },
    clear : function() {
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    },
    reset : function() {
        resetGame();
    }


}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}


function updateGameArea() {

    myGameArea.frameNo += 1;
    if(everyinterval(10))
    {
        if(frameImg == "f1.png") 
        {frameImg = "f2.png";}
        else 
        {frameImg = "f1.png";}
    }
    switch (myGameArea.gameState)
    {
        case 0:
            startMenu();
            break;
        case 1:
            playGame();
            break;
        case 2:
            deathMenu();
            break;
        case 3:
            startToPlay();
            break;
        case 4:
            youWin();
            break;
        case 5:
            shiftMenuLeft();
            break;
        case 6:
            shiftMenuRight();
            break;
    }

    myGameArea.clickedX = null;
    myGameArea.clickedY = null;
    
}


/* function externalTest()
{
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0,0,150,75);
} */