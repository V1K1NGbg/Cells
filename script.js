states = JSON.parse(window.localStorage.getItem("states"));
/* var xad, yad, xau, yau; */
var ul = false, u = false, ur = false, r = false, l = false, dl = false, d = false, dr = false;
var cordsx, cordsy;
var add;
var speed = 750;
var speedc = 750;
var started = false;
var width = 1000;
var height = 500;
var blocksize = 20;
var arrlenght1 = width / blocksize;
var arrlenght2 = height / blocksize;
var img = new Array();
img[1] = new Image();
img[2] = new Image();
img[3] = new Image();
img[4] = new Image();
img[5] = new Image();
img[6] = new Image();
img[7] = new Image();
img[8] = new Image();
img[9] = new Image();
img[10] = new Image();
if (blocksize == 10) {
    img[1].src = "img/11.png"
    img[2].src = "img/21.png"
    img[3].src = "img/31.png"
    img[4].src = "img/41.png"
    img[5].src = "img/51.png"
    img[6].src = "img/61.png"
    img[7].src = "img/71.png"
    img[8].src = "img/81.png"
    img[9].src = "img/91.png"
    img[10].src = "img/101.png"
}
if (blocksize == 20) {
    img[1].src = "img/12.png"
    img[2].src = "img/22.png"
    img[3].src = "img/32.png"
    img[4].src = "img/42.png"
    img[5].src = "img/52.png"
    img[6].src = "img/62.png"
    img[7].src = "img/72.png"
    img[8].src = "img/82.png"
    img[9].src = "img/92.png"
    img[10].src = "img/102.png"
}
states2 = new Array(arrlenght1);
create_two_dim_arr(states2)
if (!states) {
    reset();
}

function speedfunction() {
    speed = document.getElementById("speedvalue").textContent;
    speed = 1000 - speed + 1;
    if (speed != speedc) {
        speedc = speed;
        if (started) {
            clearInterval(add);
            started = false
            start();
        }
    }
}

function reset() {
    states = new Array(arrlenght1);
    create_two_dim_arr(states);
    save();
    border();
    draw();
}

function create_two_dim_arr(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(arrlenght2);
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j <= arrlenght2; j++) {
            arr[i][j] = 0;
        }
    }
}

function save() {
    window.localStorage.setItem("states", JSON.stringify(states));
}


function drawgrid() {

    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var context = canvas.getContext('2d');

        for (var x = 0.5; x < width; x += blocksize) {
            context.moveTo(x, 0);
            context.lineTo(x, height);
        }

        for (var y = 0.5; y < height; y += blocksize) {
            context.moveTo(0, y);
            context.lineTo(width, y);
        }
        context.strokeStyle = 'grey';
        context.stroke();
        border();
        draw();
    }
}

function border() {
    for (let i = 0; i < arrlenght1; i++) {
        states[i][0] = 10;
        states[i][arrlenght2 - 1] = 10;
    }
    for (let i = 0; i < arrlenght2; i++) {
        states[0][i] = 10;
        states[arrlenght1 - 1][i] = 10;
    }
}

function draw() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    for (let i = 0; i < arrlenght1; i++) {
        for (let j = 0; j <= arrlenght1; j++) {
            switch (states[i][j]) {
                case 0:
                    context.fillStyle = "#FFFFFF";
                    context.fillRect((i * blocksize) + 1, (j * blocksize) + 1, blocksize - 1, blocksize - 1);
                    break;
                case 1:
                case 11:
                    context.drawImage(img[1], (i * blocksize) + 1, (j * blocksize) + 1);
                    break;
                case 2:
                    context.drawImage(img[2], (i * blocksize) + 1, (j * blocksize) + 1);
                    break;
                case 3:
                    context.drawImage(img[3], (i * blocksize) + 1, (j * blocksize) + 1);
                    break;
                case 4:
                    context.drawImage(img[4], (i * blocksize) + 1, (j * blocksize) + 1);
                    break;
                case 5:
                    context.drawImage(img[5], (i * blocksize) + 1, (j * blocksize) + 1);
                    break;
                case 6:
                    context.drawImage(img[6], (i * blocksize) + 1, (j * blocksize) + 1);
                    break;
                case 7:
                    context.drawImage(img[7], (i * blocksize) + 1, (j * blocksize) + 1);
                    break;
                case 8:
                    context.drawImage(img[8], (i * blocksize) + 1, (j * blocksize) + 1);
                    break;
                case 9:
                    context.drawImage(img[9], (i * blocksize) + 1, (j * blocksize) + 1);
                    break;
                case 10:
                    context.drawImage(img[10], (i * blocksize) + 1, (j * blocksize) + 1);
                    break;
            }
        }
    }
}
function random() {
    reset();
    for (let i = 1; i < arrlenght1 - 1; i++) {
        for (let j = 1; j < arrlenght2 - 1; j++) {
            states[i][j] = Math.floor((Math.random() * 18));
            if (states[i][j] > 10) {
                states[i][j] = 0;
            }
        }
    }
    save();
    draw();
}

function Click(event) {
    var x = event.clientX - 10;
    var y = event.clientY - 10;
    x = Math.floor(x / blocksize);
    y = Math.floor(y / blocksize);
    if (states[x][y] == 10) {
        if (x != 0 && x != arrlenght1 - 1 && y != 0 && y != arrlenght2 - 1) {
            states[x][y] = 0;
        }
    } else {
        states[x][y] = states[x][y] + 1;
    }
    draw();
    save();
}
/* function surroundings(x, y) {
    alive = 0;
    xau = true;
    yau = true;
    xad = true;
    yad = true;
    if (x == 0) {
        xau = false
    }
    if (x == arrlenght1 - 1) {
        xad = false
    }
    if (y == 0) {
        yau = false
    }
    if (y == arrlenght1 - 1) {
        yad = false
    }
} */
function exe() {
    for (let i = 0; i < arrlenght1; i++) {
        for (let j = 0; j < arrlenght2; j++) {

        }
    }
}

function tnt(i, j) {
    if (states[i - 1][j - 1] == 1) {
        ul = true;
        cordsx = i;
        cordsy = j;
    } else {
        states[i - 1][j - 1] = 0;
    }

    if (states[i][j - 1] == 1) {
        u = true;
        cordsx = i;
        cordsy = j;
    } else {
        states[i][j - 1] = 0;
    }

    if (states[i + 1][j - 1] == 1) {
        ur = true;
        cordsx = i;
        cordsy = j;
    } else {
        states[i + 1][j - 1] = 0;
    }

    if (states[i - 1][j] == 1) {
        l = true;
        cordsx = i;
        cordsy = j;
    } else {
        states[i - 1][j] = 0;
    }

    if (states[i + 1][j] == 1) {
        r = true;
        cordsx = i;
        cordsy = j;
    } else {
        states[i + 1][j] = 0;
    }

    if (states[i - 1][j + 1] == 1) {
        dl = true;
        cordsx = i;
        cordsy = j;
    } else {
        states[i - 1][j + 1] = 0;
    }

    if (states[i][j + 1] == 1) {
        d = true;
        cordsx = i;
        cordsy = j;
    } else {
        states[i][j + 1] = 0;
    }

    if (states[i + 1][j + 1] == 1) {
        dr = true;
        cordsx = i;
        cordsy = j;
    } else {
        states[i + 1][j + 1] = 0;
    }
}

function start() {
    if (started == false) {
        started = true
        add = setInterval(function () {
            for (let i = 1; i < arrlenght1 - 1; i++) {
                for (let j = 1; j < arrlenght2 - 1; j++) {
                    /* surroundings(i, j); */
                    switch (states[i][j]) {
                        case 1:
                            if (states[i - 1][j] == 4 || states[i + 1][j] == 6 || states[i][j - 1] == 5 || states[i][j + 1] == 7) {
                                tnt(i, j);
                            }
                            break;
                        case 2:
                            break;
                        case 3:
                            break;
                        case 4:
                            break;
                        case 5:
                            break;
                        case 6:
                            break;
                        case 7:
                            break;
                        case 8:
                            break;
                        case 9:
                            break;
                        case 10:
                            break;
                    }
                }
            }
            exe();
            save();
            draw();
            speedfunction()
        }, speedc);
    }
}