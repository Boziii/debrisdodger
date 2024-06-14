

function component(width, height, imageName, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;   
    this.shape = "square";
    this.image = new Image();
    this.image.src = imageName;
    this.update = function(){ 
        ctx = myGameArea.context;
        
        ctx.drawImage(this.image, 
            this.x, 
            this.y,
            width, height);

    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY; 
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mymiddle = this.y + (this.height)*0.5;
        var mybottom = this.y + (this.height);
        var crash = true;
        if(otherobj.shape == "square")
        {
            var otherleft = otherobj.x;
            var otherright = otherobj.x + (otherobj.width);
            var othertop = otherobj.y;
            var otherbottom = otherobj.y + (otherobj.height);
            if ((mybottom < othertop) ||
                (mytop > otherbottom) ||
                (myright < otherleft) ||
                (myleft > otherright)) {
            crash = false;
            }
        }
        else
        {

            if( !pointInRect(otherobj.x, otherobj.y, myleft, mytop, myright, mybottom) &&
                !pointTouchCircle(myright,mytop,otherobj) &&
                !pointTouchCircle(myleft,mytop,otherobj) &&
                !pointTouchCircle(myright,mymiddle,otherobj) &&
                !pointTouchCircle(myleft,mymiddle,otherobj) &&
                !pointTouchCircle(myright,mybottom,otherobj) &&
                !pointTouchCircle(myleft,mybottom,otherobj)
              )
            {
                crash = false;
            }
            
           

        }
        return crash;
        
    }
    
}

function roundComponent(radius, imageName, x, y)
{
    this.radius = radius;
    this.x = x;
    this.y = y;   
    this.shape = "circle";
    this.image = new Image();
    this.image.src = "assets/AsteroidSheet.png";
    this.frameStagger = Math.floor(Math.random()*(8));
    this.sheetStart = 0;
    switch(imageName)
    {
        case "green":
            this.sheetStart = 0;
            break;
        case "purple":
            this.sheetStart = 100;
            break;
        case "red":
            this.sheetStart = 150;
            break;
        case "money":
            this.sheetStart = 200;
            break;
    }
    this.update = function(frameNum){ 
        frameNum += this.frameStagger;
        if(frameNum > 7)
        {
            frameNum = frameNum - 8;
        }
        ctx = myGameArea.context;
        ctx.drawImage(this.image, 
            frameNum*2*radius,
            this.sheetStart,
            2*radius, 2*radius,
            this.x - radius, 
            this.y - radius,
            2*radius, 2*radius);

    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY; 
    }
    this.crashWith = function(otherobj) {
        return false;
    }
}

function backgroundComponent(width, height, imageName, x, y)
{
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;   
    this.image = new Image();
    this.image.src = imageName;
    this.update = function(){
        ctx = myGameArea.context;
        
        ctx.drawImage(this.image, 
            this.x, 
            this.y,
            width, height);

        ctx.drawImage(this.image, 
            this.x, 
            this.y-height,
            width, height);
    }
    this.newPos = function(){
        this.y += 3;
        if(this.y >= this.height)
        {
            this.y = 0;
        }
    }
}

function menuComponent(width, height, imageName, x, y, sheetX, sheetY, clickable)
{
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;   
    this.image = new Image();
    this.image.src = imageName;
    this.sheetX = sheetX;
    this.clickable = clickable;
    this.update = function(){
        ctx = myGameArea.context;
        
        if(hovered(this))
        {
            //show hilighted version
            ctx.drawImage(this.image, 
                this.sheetX + width, sheetY,
                width, height,
                this.x, 
                this.y,
                width, height);
        }
        else
        {
            //normal version
            ctx.drawImage(this.image, 
                this.sheetX, sheetY,
                width, height,
                this.x, 
                this.y,
                width, height);
        }

        
    }
    this.newPos = function(){
        this.x += this.speedX;
        this.y += this.speedY; 
    },
    this.clicked = function(){
        if(myGameArea.clickedX >= this.x && myGameArea.clickedX <= this.x + this.width &&
            myGameArea.clickedY >= this.y && myGameArea.clickedY <= this.y + this.height) {
                document.getElementById("demo").innerHTML = "clicked";
                return true;
        }
        else
        {
            document.getElementById("demo").innerHTML = "nothing";
            return false;
        }
    }
    
}

function pointInRect(pointX, pointY, left, top, right, bottom)
{
    var inRect = true;
    
    if((pointX < left) ||
       (pointX > right) ||
       (pointY < top) ||
       (pointY > bottom))
    {
        inRect = false;
    }
    return inRect;
}

function pointTouchCircle(x1, y1, theCircle)
{
    var inCircle = false;
    var distance = (x1-theCircle.x)**2 + (y1-theCircle.y)**2;
    /*
    //the 0.85 makes the actual distance you can approach the 
    //asteroid smaller than you think, 
    //and more congruent with actual collision with asteroid
    */
    if(distance < ((theCircle.radius*0.85)**2)) 
    {
        inCircle = true;
    }
    
    return inCircle;
}

function hovered(aButton) {
    var hover = false;
    if(aButton.clickable)
    {
        if(myGameArea.mouseX >= aButton.x && myGameArea.mouseX <= aButton.x + aButton.width &&
            myGameArea.mouseY >= aButton.y && myGameArea.mouseY <= aButton.y + aButton.height) {
                hover = true;
        } 
    }
    return hover;
}