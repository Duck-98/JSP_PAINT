const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const INITIAL_COLOR = "black";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height =CANVAS_SIZE;
ctx.fillStyle ="white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR; // 그릴 선의 색
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; //선의 너비

let painting = false;
//평소에는 false로 설정 -> 마우스를 누르지 않았을 때는 그려지게 하면 안되기 때문
let filling = false;
function stopPainting(){
    painting = false;
}
function startPainting(){
    painting = true;
}
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath(); //선의 시작
        ctx.moveTo(x,y); //선(path)를 만들면 마우스의 x,y좌표로 path를 옮김
    } else {
        ctx.lineTo(x,y); //그릴 위치를 잡아줌
        ctx.stroke()

    }
}
function onMouseDown(event){
    painting = true;
}
function handleRangeChange(event){
    const value = event.target.value
    ctx.lineWidth = value;
}
function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else{
        filling = true;
        mode.innerText =  "Paint";
    }
}
function handleCanvasClick(){
  if(filling){
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
  }
}
function handleCM(event){
    event.preventDefault()
   }
function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
    
}
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); //클릭하면 선이 그려짐
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);// 오른족 마우스 클릭
}
if(range){
    range.addEventListener("input", handleRangeChange);
}
Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick));
if(mode){
    mode.addEventListener("click", handleModeClick);
}
if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}