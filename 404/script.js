var mouseX = mouseY = -50;
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    document.getElementById("mouse").style.top = mouseY + "px";
    document.getElementById("mouse").style.left = mouseX + "px";
});

async function letters() {
    await new Promise(r => setTimeout(r, 2600))
    if (Math.floor(Math.random() * 2) == 0) {
        document.getElementById("mouse").style.display = "block";
        for (i of document.getElementById("letters").children) {
            i.style.top = Math.floor(Math.random() * (window.innerHeight - 2 * i.offsetHeight) + i.offsetHeight) + "px";
            i.style.left = Math.floor(Math.random() * (window.innerWidth - 2 * i.offsetWidth) + i.offsetWidth) + "px";
        }
        await new Promise(r => setTimeout(r, 100));
        setInterval(() => {
            for (i of document.getElementById("letters").children) {
                // get the position of each letter
                let y = parseFloat(i.style.top);
                let x = parseFloat(i.style.left);
                // determine the distance from the each letter to mouse
                let mtx = mouseX - x;
                let mty = mouseY - y;
                if (Math.abs(mtx) <= 71 && Math.abs(mty) <= 71) {
                    if (Math.abs(mty) > Math.abs(mtx) || mtx + x < 0 || mtx + x > window.innerWidth) {
                        i.style.top = y + i.offsetHeight * (mty < 0 ? 1 : -1) + "px";
                    } else {
                        i.style.left = x + i.offsetWidth * (mtx < 0 ? 1 : -1) + "px";
                    } continue
                }
                // 4 moves: up, down, left and right, and 2 more chances for the previous move, to make the animation more consistent
                let turn = Math.floor(Math.random() * 6);
                if (turn == 0 || (i.classList[0] == "left" && [4,5].includes(turn))) {
                    if (x - i.offsetWidth >= 0) {
                        i.style.left = x - i.offsetWidth + "px";
                        i.classList = [];
                        i.classList.add("left")
                    } else turn = 1
                }
                if (turn == 1 || (i.classList[0] == "right" && [4,5].includes(turn))) {
                    if (x + i.offsetWidth <= window.innerWidth - i.offsetWidth) {
                        i.style.left = x + i.offsetWidth + "px";
                        i.classList = [];
                        i.classList.add("right")
                    } else turn = 2
                }
                if (turn == 2 || (i.classList[0] == "up" && [4,5].includes(turn))) {
                    if (y - i.offsetHeight >= 0) {
                        i.style.top = y - i.offsetHeight + "px";
                        i.classList = [];
                        i.classList.add("up")
                    } else turn = 3
                }
                if (turn == 3 || (i.classList[0] == "down" && [4,5].includes(turn))) {
                    if (y + i.offsetHeight <= window.innerHeight - i.offsetHeight) {
                        i.style.top = y + i.offsetHeight + "px";
                        i.classList = [];
                        i.classList.add("down")
                    } else {
                        if (Math.floor(Math.random() * 2) == 0) {
                            i.style.left = x - i.offsetWidth + "px";
                            i.classList = [];
                            i.classList.add("left")
                        } else {
                            i.style.left = x + i.offsetWidth + "px";
                            i.classList = [];
                            i.classList.add("right")
                        }
                    }
                }
            }
        }, 200)
    } else {
        for (i of document.getElementById("letters").children) {
            i.style.top = Math.floor(Math.random() * (window.innerHeight - 2 * i.offsetHeight) + i.offsetHeight) - window.innerHeight + "px";
            i.style.left = Math.floor(Math.random() * (window.innerWidth - 2 * i.offsetWidth) + i.offsetWidth) + "px";
        }
        setInterval(() => {
            for (i of document.getElementById("letters").children) {
                let y = parseInt(i.style.top.replace("px", ""));
                if (y + i.offsetHeight <= window.innerHeight - i.offsetHeight) {
                    i.style.top = y + i.offsetHeight + "px";
                } else {
                    i.style.top = Math.floor(Math.random() * (window.innerHeight - 2 * i.offsetHeight) + i.offsetHeight) - window.innerHeight + "px";
                    i.style.left = Math.floor(Math.random() * (window.innerWidth - 2 * i.offsetWidth) + i.offsetWidth) + "px";
                }
            }

        }, 100)
    }
}

async function typing() {
    await new Promise(r => setTimeout(r, 500));
    let area = document.getElementById("svgtext");
    area.innerHTML = "4|";
    await new Promise(r => setTimeout(r, 500));
    area.innerHTML = "40|";
    await new Promise(r => setTimeout(r, 500));
    area.innerHTML = "404";
    await new Promise(r => setTimeout(r, 500));
    area.innerHTML = "";
    await new Promise(r => setTimeout(r, 100));
    area.innerHTML = "404";
    await new Promise(r => setTimeout(r, 100));
    area.innerHTML = "";
    await new Promise(r => setTimeout(r, 100));
    area.innerHTML = "404";
    await new Promise(r => setTimeout(r, 100));
    area.innerHTML = "";
    await new Promise(r => setTimeout(r, 100));
    area.innerHTML = "404";
    await new Promise(r => setTimeout(r, 100))
}
