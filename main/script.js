var d = true;
let nextpage = false;
let host = document.getElementById("host");
let main = document.getElementById("main");

async function slide() {
    main.style.animation = 'slide .5s linear';
    await new Promise(r => setTimeout(r, 480));
    main.style.left = 'calc(-100% - 10px)';
    nextpage = true
}

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
    var letteranim = setInterval(() => {
        for (i of document.getElementById("letters").children) {
            let y = parseInt(i.style.top.replace("px", ""));
            if (y + i.offsetHeight <= window.innerHeight - i.offsetHeight) {
                i.style.top = y + i.offsetHeight + "px";
            } else {
                i.style.top = Math.floor(Math.random() * (window.innerHeight - 2 * i.offsetHeight) + i.offsetHeight) - window.innerHeight + "px";
                i.style.left = Math.floor(Math.random() * (window.innerWidth - 2 * i.offsetWidth) + i.offsetWidth) + "px";
            }
        } if (nextpage) clearInterval(letteranim)

    }, 100)
}