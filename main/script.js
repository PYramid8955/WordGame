var d = true

function option(op) {
    let menu = document.getElementById('menu');
    let settings = document.getElementById('settings');
    let help = document.getElementById('help');
    if (op == 1) 
        if (settings.style.display == 'block') {
            settings.style.display = 'none';
            menu.style.display = 'block'
        } else {
            settings.style.display = 'block';
            help.style.display = 'none';
            menu.style.display = 'none'
        }
    else
        if (help.style.display == 'block') {
            help.style.display = 'none';
            menu.style.display = 'block'
        } else {
            settings.style.display = 'none';
            help.style.display = 'block';
            menu.style.display = 'none'
        }
}

async function letters() {
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