const canvas = document.getElementById("canvas");
const background = document.getElementsByClassName("background")[0];
let ctx = canvas.getContext('2d');
let x = 0, y = 0;
let isDrawing = 0;

canvas.setAttribute('width', background.offsetWidth.toString());
canvas.setAttribute('height', background.offsetHeight.toString());
let rect = canvas.getBoundingClientRect();

document.addEventListener('mousedown', function (e) {
    const current = e.target;
    if (current.className.includes('background') || !hasParentClass(current, 'item')) {
        canvas.setAttribute('style', 'z-index:2');
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
        isDrawing = true;
    }
})

document.addEventListener('click', function(e){
    const current= e.target;

    const items = document.getElementsByClassName('item');
         for(let i = 0;i<items.length;i++){
            if(items[i].className.includes('active')) items[i].classList.remove('active'); 
         }

    if(hasParentClass(current,'item')){
                current.parentElement.classList.add('active');
    }

    else{

    }
})

function hasParentClass(child, classname) {
    if (child.className.split(' ').indexOf(classname) >= 0) return true;
    try {
        //Throws TypeError if child doesn't have parent any more
        return child.parentNode && hasParentClass(child.parentNode, classname);
    } catch (TypeError) {
        return false;
    }
}

canvas.addEventListener('mousedown', function (e) {
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    isDrawing = true;
})

canvas.addEventListener('mousemove', function (e) {
    if (isDrawing) {
        makeSquare(x, y, e.clientX - rect.left, e.clientY - rect.top);
    }
})

canvas.addEventListener('mouseup', function (e) {
    if (isDrawing) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        x = 0;
        y = 0;
        isDrawing = false;
        canvas.setAttribute('style', '');
    }
})

function makeSquare(x1, y1, x2, y2) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ababc8';
    ctx.globalAlpha = 0.5;
    ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.strokeStyle = "#657e9c";
    ctx.rect(x1 - (1), y1 - (1), x2 - x1 + (1 * 2), y2 - y1 + (1 * 2));
    ctx.stroke();
}

function draw(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

