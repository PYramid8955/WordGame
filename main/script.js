var d = true;
let root = document.querySelector(':root');
let host = document.getElementById("host");
let join = document.getElementById("join");
let spectate = document.getElementById("spectate");
let main = document.getElementById("main");
let mainmenu = document.getElementById("mainmenu");
let nextpage = false;

let spanresize = (span, wider = false) => {
    if (wider) span.style.width = '100%';
    else span.style.width = '40%';
}

let switcher = (prop, prop1) => {
    let rs = getComputedStyle(root);
    if (rs.getPropertyValue(prop) == "0") {
        root.style.setProperty(prop, '50%');
        root.style.setProperty(prop1, '100%')
    } else {
        root.style.setProperty(prop, '0');
        root.style.setProperty(prop1, '50%');
    }
}

async function slide(direction, hide, display, animoff = true) {
    display.style.display = 'block';
    let currentleftpos = main.style.left == '' ? '0' : main.style.left;
    root.style.setProperty('--slide0', currentleftpos);
    if (direction == 'right') root.style.setProperty('--slide100', parseInt(currentleftpos)-100+'%');
    else root.style.setProperty('--slide100', parseInt(currentleftpos)+100+'%');
    main.style.animation = 'slide .5s ease-out';
    await new Promise(r => setTimeout(r, 480));
    hide.style.display = 'none';
    main.style.animation = '';
    main.style.left = parseInt(currentleftpos) + (direction == "right" ? -100 : 100) + '%';
    if (animoff) nextpage = true; else if (nextpage) letters()
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
    nextpage = false;
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