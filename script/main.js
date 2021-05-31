var elevator, currentFloor=1;

function report(source, message){
    var element = document.createElement('samp');
    element.appendChild(document.createElement('p')).innerHTML = `[ ${source} ] ${message}`;
    console.log(`[ ${source} ] ${message}`);
    document.getElementById('inside').appendChild(element);
}

function off(){
    var buttons = document.getElementsByClassName("floor-button");
    report("System", "Offline")
    for(let i=0; i < buttons.length; i++){
        buttons[i].onclick = function(){
            report("Elevator", "System is off, i can't do this now");
        };
    }
}

function on(){
    report("System", "Online")
    var buttons = document.getElementsByClassName("floor-button");
    for(let i=0; i <= buttons.length; i++){
        buttons[i].onclick = function(){
            changeFloor(i+1);
        };
    }
}

function startSystem(){
    report("System", "Online!");

    elevator = new component(150, 50, "gray", 325, 450, "elevator");

    room11 = new component(324, 50, "#a6a6a6", 0, 450, "room");
    room12 = new component(324, 50, "#a6a6a6", 476, 450, "room");

    room21 = new component(324, 50, "#949494", 0, 400, "room");
    room22 = new component(324, 50, "#949494", 476, 400, "room");

    room31 = new component(324, 50, "#a6a6a6", 0, 350, "room");
    room32 = new component(324, 50, "#a6a6a6", 476, 350, "room");

    room41 = new component(324, 50, "#949494", 0, 300, "room");
    room42 = new component(324, 50, "#949494", 476, 300, "room");

    room51 = new component(324, 50, "#a6a6a6", 0, 250, "room");
    room52 = new component(324, 50, "#a6a6a6", 476, 250, "room");

    room61 = new component(324, 50, "#949494", 0, 200, "room");
    room62 = new component(324, 50, "#949494", 476, 200, "room");

    room71 = new component(324, 50, "#a6a6a6", 0, 150, "room");
    room72 = new component(324, 50, "#a6a6a6", 476, 150, "room");

    room81 = new component(324, 50, "#949494", 0, 100, "room");
    room82 = new component(324, 50, "#949494", 476, 100, "room");

    room91 = new component(324, 50, "#a6a6a6", 0, 50, "room");
    room92 = new component(324, 50, "#a6a6a6", 476, 50, "room");

    room100 = new component(50, 40, "#a6a6a6", 250, 15, "room");

    floorLabel = new component("20px", "Consolas", "black", 358, 15, "text");

    report("System", "Elevator generated!");
    report("System", "All floors generated!");

    gameArea.start();
}

gameArea = {
    canvas : document.getElementById("building"),
    start : function(){
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 20);
        report("System", "Game Area started!");
    },
    clear: function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type){
    this.width = width;
    this.height = height;
    this.type = type;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = gameArea.context;
        if(this.type == "text"){
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else{
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

function updateGameArea(){
    gameArea.clear();
    elevator.update();

    room11.update();
    room12.update();

    room21.update();
    room22.update();

    room31.update();
    room32.update();

    room41.update();
    room42.update();

    room51.update();
    room52.update();

    room61.update();
    room62.update();

    room71.update();
    room72.update();
    
    room81.update();
    room82.update();

    room91.update();
    room92.update();

    room100.update();

    floorLabel.text = "Andar: "+currentFloor;
    floorLabel.update();
}

function changeFloor(floor){
    if(floor > currentFloor){
        var i = currentFloor;

        report("Elevator", "Moving Up!");
        function upLoop(){
            setTimeout(function(){
                if(elevator.y == 50){
                    elevator.y = elevator.y;
                } else{
                    elevator.y -= 50;
                    currentFloor += 1;
                }
                i++;
                if(i < floor){
                    upLoop();
                }
                report("Elevator", `Floor: ${currentFloor}`);
            }, 1200)
        }
        upLoop();
    } else if(floor < currentFloor){
        var i = currentFloor;

        report("Elevator", "Moving Down!");
        function downLoop(){
            setTimeout(function(){
                if(elevator.y == 450){
                    elevator.y = elevator.y;
                } else{
                    elevator.y += 50;
                    currentFloor -= 1;
                }
                i--;
                if(i > floor){
                    downLoop();
                }
                report("Elevator", `Floor: ${currentFloor}`);
            }, 1200)
        }
        downLoop();
    }
}