async function letters() {
    await new Promise(r => setTimeout(r, 2600))
    if (Math.floor(Math.random() * 2) == 0) {
        for (i of document.getElementById("letters").children) {
            i.style.top = Math.floor(Math.random() * (window.innerHeight - 2 * i.offsetHeight) + i.offsetHeight) + "px";
            i.style.left = Math.floor(Math.random() * (window.innerWidth - 2 * i.offsetWidth) + i.offsetWidth) + "px";
        }
        await new Promise(r => setTimeout(r, 100));
        setInterval(() => {
            for (i of document.getElementById("letters").children) {
                let y = parseInt(i.style.top.replace("px", ""));
                let x = parseInt(i.style.left.replace("px", ""));
                switch (Math.floor(Math.random() * 4)) {
                    case 0: 
                        if (x - i.offsetWidth >= 0) {
                            i.style.left = x - i.offsetWidth + "px";
                            break
                        }
                    case 1:
                        if (x + i.offsetWidth <= window.innerWidth - i.offsetWidth) {
                            i.style.left = x + i.offsetWidth + "px";
                            break
                        }
                    case 2: 
                        if (y - i.offsetHeight >= 0) {
                            i.style.top = y - i.offsetHeight + "px";
                            break
                        }
                    case 3:
                        if (y + i.offsetHeight <= window.innerHeight - i.offsetHeight) {
                            i.style.top = y + i.offsetHeight + "px";
                            break
                        }
                }
            }
        }, 250)
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