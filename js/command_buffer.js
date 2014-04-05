var millisecondsBetween = 50;
var commandList = [];

function input(name, command, direction) {
    commandList.push([name, command, direction]);

}

function output(commands) {
    if(commandList.length > 0) {
        reutrn commandList.shift();
    }
}

setInterval("output", millisecondsBetween);

