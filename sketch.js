//functions
/*
.ref() - used to refer to the location of the database value we need.

.on() - create a listener which keeps listening to the changes in the database.
*/

var ball,position;
var database;

function setup(){
    database=firebase.database();
  //  console.log(database);
    
    createCanvas(500,500);

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //read ball position from the database
    var ballposition=database.ref('position');
    ballposition.on("value", readPosition,showError)
    console.log(ballposition);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function readPosition(data){
    position=data.val();
  //  console.log(position);
    ball.x=position.x;
    ball.y=position.y;
}

function showError(){
    console.log("error writing into database");
}

function writePosition(x,y){
    database.ref('position').set({
        'x': position.x + x, 
        'y': position.y + y
    })
   
}
