const balloon = document.getElementById('balloon');
const bpops = document.getElementById('bpops');
const pops = document.getElementById('number_of_pops');
const explosionGIF = document.getElementById('explosion_gif');

let currentWidth = balloon.offsetWidth;
let currentHeight = balloon.offsetHeight;

let defaultWidthHeight = 200;
let max_times = 10;
let maxWidthHeight = 420;

let aPops = localStorage.getItem('amountOfPops');

document.body.onload = () => {
    if (!aPops)
    {
        localStorage.setItem('amountOfPops', 0);
    }
    pops.innerHTML = aPops;
    console.info(`Balloon Width: ${currentWidth} \n Balloon Height: ${currentHeight} \n`);
}

function popBallon()
{
    balloon.remove()
    explosionGIF.style.width = defaultWidthHeight + 'px';
    explosionGIF.style.height = defaultWidthHeight + 'px';
    setTimeout(() => {
        explosionGIF.remove()
        let pops = Number(aPops)+1;
        localStorage.setItem("amountOfPops", pops);
        window.location.reload();
    }, 580);
}

function blowBallon(width, height)
{
    currentWidth = currentWidth + width;
    currentHeight = currentHeight + height;

    balloon.style.width = currentWidth + 'px';
    balloon.style.height = currentHeight + 'px';

    if (balloon.offsetHeight && balloon.offsetWidth >= maxWidthHeight)
    {
        popBallon();
    }
}

let count = 0;

const colors = ['rgb(256, 0, 0)', 'rgb(0, 0, 256)', 'rgb(0, 256, 0)'];

balloon.addEventListener('click', () => {
    blowBallon(10, 10);
    count++;
    const bgColors = colors[count % colors.length];
    balloon.style.backgroundColor = bgColors;
});

let controller = new AbortController();

async function changeColorAndSize() {
    const targetWidth = 200;
    const targetHeight = 200;
    const step = 5;

    let count = colors.length - 1;

    while (currentWidth > targetWidth || currentHeight > targetHeight) {
        currentWidth = Math.max(targetWidth, currentWidth - step);
        currentHeight = Math.max(targetHeight, currentHeight - step);

        balloon.style.width = currentWidth + 'px';
        balloon.style.height = currentHeight + 'px';

        var color = colors[count];
        // Cambia el color del elemento globo
        balloon.style.backgroundColor = color;

        console.info("Count Reverse: " + count);
        count--;

        // Si hemos recorrido todos los colores, reinicia el índice de color
        if (count < 0) {
            count = colors.length - 1;
        }

        // Introduce un retraso de 500 milisegundos
        try {
            await new Promise((resolve, reject) => {
                setTimeout(resolve, 500);
                controller.signal.addEventListener('abort', reject);
            });
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Paused');
                break;
            }
        }
    }
}

balloon.addEventListener('mouseleave', async () => {
    controller = new AbortController(); // Reset the controller
    await changeColorAndSize();
});

balloon.addEventListener('mouseenter', () => {
    controller.abort(); // Pause the function
});




