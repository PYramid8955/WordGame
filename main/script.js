var d = true;
let nextpage = false;
let host = document.getElementById("host");
let join = document.getElementById("join");
let spectate = document.getElementById("spectate");
let main = document.getElementById("main");
let mainmenu = document.getElementById("mainmenu");

async function slide(direction, hide, display, animoff = true) {
    display.style.display = 'block';
    main.style.animation = 'slide .5s ease-out';
    await new Promise(r => setTimeout(r, 480));
    hide.style.display = 'none';
    main.style.left = parseInt(main.style.left == '' ? '0' : main.style.left) + (direction == "right" ? -100 : 100) + '%';
    if (animoff) nextpage = true; else letters()
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
            if (y + i.offsetHeight <= window.innerHeight) {
                i.style.top = y + i.offsetHeight + "px";
            } else {
                // this could be set to 0 to make animation more consistent, but I think this randomness looks better
                i.style.top = Math.floor(Math.random() * (window.innerHeight - 2 * i.offsetHeight) + i.offsetHeight) - window.innerHeight + "px";
                i.style.left = Math.floor(Math.random() * (window.innerWidth - 2 * i.offsetWidth) + i.offsetWidth) + "px";
            }
        } if (nextpage) clearInterval(letteranim)

    }, 100)
}