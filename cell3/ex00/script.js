const body = document.body;
const color_id_display = document.getElementById('color-view-display');

function random_change()
{
    let red = Math.floor(Math.random()*256);
    let blue = Math.floor(Math.random()*256);
    let green = Math.floor(Math.random()*256);

    var rgb = `rgb(${red}, ${blue}, ${green})`;
    return rgb;
}

const change_btn = document.getElementById('btn-change-color');

change_btn.addEventListener('click', () => {
    body.style.backgroundColor = random_change();
    color_id_display.innerHTML = body.style.backgroundColor;
});