var d = true;
let root = document.querySelector(':root');
let host = document.getElementById("host");
let join = document.getElementById("join");
let main = document.getElementById("main");
let spectate = document.getElementById("spectate");
let mainmenu = document.getElementById("mainmenu");
let addWordsDiv = document.getElementById('addwords');
let textareas = addWordsDiv.getElementsByTagName('textarea');
let creategameErrorbox = document.querySelector("#creategame > div > div.creategameErrorbox");
let creategamedata = {};
let rs = getComputedStyle(root);
let nextpage = false;
let lettercount = 0;

function createGame() {
    let creategamedata = {};
    creategameErrorbox.innerHTML = 'Exceptions:<br/><br/>';
    creategameErrorbox.style.display = 'none';
    let players = document.querySelector('input[name=players]').value;
    players = players == '' ? 0 : parseInt(players);
    if (players <= 0) {
        creategameErrorbox.innerHTML += '- Players cannot be less than 1.';
        creategameErrorbox.style.display = 'block';
        return
    }
    let count = 0;
    let checks = 0;
    let letter = addWordsDiv.getElementsByClassName('letter');
    for (i of letter) if (i.value != '') count++;
    if (count < players*98) {
        creategameErrorbox.innerHTML += '<br/>';
        creategameErrorbox.innerHTML += '- Please fill all the letter boxes.';
        checks--
    } count = 0;
    for (i of textareas) if (i.value != '') count++;
    if (count < 14*players) {
        creategameErrorbox.innerHTML += '<br/>';
        creategameErrorbox.innerHTML += '- Please fill all the word description textboxes.';
        checks--

    }
    if (checks < 0) {
        creategameErrorbox.style.display = 'block';
        return
    }
    creategamedata.players = players;
    creategamedata.pressl = rs.getPropertyValue('--switchpressl') == "50%" ? true : false;
    creategamedata.spect = rs.getPropertyValue('--switchspect') == "50%" ? true : false;
    creategamedata.words = {
        '4': {},
        '5': {},
        '6': {},
        '7': {},
        '8': {},
        '9': {},
        '10': {}
    }
    let word = 0;
    let letters = '';
    for (i of letter) letters += i.value;
    for (let i = 0; i < 8*players; i+=4) {
        creategamedata.words['4'][textareas[word].value] = letters.substring(i, i+4);
        word++
    } let till = 8*players;
    for (let i = 5; i <= 10; i++) {
        for (let j = till; j < i*2*players+till; j+=i) {
            creategamedata.words[`${i}`][textareas[word].value] = letters.substring(j, j+i);
            word++
        } till += i*2*players;
    }
    console.log(creategamedata)
}

function focusnext(ev) {
    try {
        ev.preventDefault();
        ev.target.value = ev.data;
        ev.target.nextSibling.focus();
    } catch (err) {}
}

function addword(e) {
    if (!['', '0'].includes(e.value) && parseInt(e.value)>0) {
    creategameErrorbox.innerHTML = 'Exceptions:<br/><br/>';
    creategameErrorbox.style.display = 'none';
    root.style.setProperty('--spectateafterdisplay', 'block');
    document.querySelector('.option:last-child').style.display = 'block';
    if (document.querySelector('#addwords textarea')) {
        while (textareas.length > 0) textareas[0].parentNode.removeChild(textareas[0]);
        let wboxs = addWordsDiv.getElementsByClassName('wbox');
        while (wboxs.length > 0) wboxs[0].parentNode.removeChild(wboxs[0]);
    }
    for (let i = 1; i <= parseInt(e.value)*2; i++)
        for (let num = 4; num <= 10; num++) 
            document.getElementById(`l${num}`).innerHTML += '<textarea placeholder="Word description" maxlength="70"></textarea><div class="wbox" style="grid-template-columns: ' + '1fr '.repeat(num) +'">' + '<input class="letter" maxlength="1" pattern="[A-Za-z]" onbeforeinput="focusnext(event)"/>'.repeat(num) + '</div>';
    } else {
        root.style.setProperty('--spectateafterdisplay', 'none');
        document.querySelector('.option:last-child').style.display = 'none';
    }
}

let spanresize = (span, wider = false) => {
    if (wider) span.style.width = '100%';
    else span.style.width = '40%'
}

let switcher = (prop, prop1) => {
    if (rs.getPropertyValue(prop) == "0") {
        root.style.setProperty(prop, '50%');
        root.style.setProperty(prop1, '100%')
    } else {
        root.style.setProperty(prop, '0');
        root.style.setProperty(prop1, '50%')
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