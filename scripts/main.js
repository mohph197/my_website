//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const objects = document.querySelectorAll(".ws");
const pausable = document.querySelectorAll("#loader_page, #theWebsite *");
const loaderPage = document.querySelector("#loader_page");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

pausable.forEach(x => x.style.animationPlayState = "paused");
window.addEventListener("load", e => {
    pausable.forEach(x => x.style.animationPlayState = "running");
    loaderPage.style.opacity = 0;
    setTimeout(() => loaderPage.remove(), 2000);
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let focus_index = 0;
let angle = 270;
const radX = 270;
const radZ = 10;

const es = objects.length;
const unit = 360 / es;

style_objs();

function move(dir){
    if(dir > 0)
    {
        angle -= unit;
        post_i();
    }
    else 
    {
        angle += unit;
        pre_i();
    }
    style_objs();
}

function toRadian(theta)
{
    return theta * Math.PI / 180;
}

function post_i(){
    if(focus_index === es-1) focus_index = 0;
    else focus_index++;
}
function pre_i(){
    if(focus_index === 0) focus_index = es-1;
    else focus_index--;
}

function rotate_objs(object){
    let comm = "";
    let x_coord = Math.cos(toRadian(angle)) * radX;
    let z_coord = -Math.sin(toRadian(angle)) * radZ;
    comm += "translateX("+x_coord+"px) translateZ("+z_coord+"px)";
    object.style.opacity = z_coord / radZ + 1;
    angle += unit;
    return comm;
}

function style_objs(){
    for(let i = 0; i < es; i++)
    {
        if(i === focus_index){
            objects[i].style.transform = rotate_objs(objects[i]) + " scale(1.5)";
            objects[i].style.filter = "blur(0px)";
        }
        else 
        {
            objects[i].style.transform = rotate_objs(objects[i]) + " scale(1)";
            objects[i].style.filter = "blur(5px)";
        }
    }
    angle %= 360;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
