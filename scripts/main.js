let socket = io();
let root = document.querySelector(':root');
let host = document.getElementById("host");
let join = document.getElementById("join");
let main = document.getElementById("main");
let room = document.getElementById("room");
let spectate = document.getElementById("spectate");
let mainmenu = document.getElementById("mainmenu");
let addWordsDiv = document.getElementById('addwords');
let textareas = addWordsDiv.getElementsByTagName('textarea');
let creategameErrorbox = document.querySelector("#creategame > div > div.creategameErrorbox");
let optionBoxTitleAnim = {
    '#help': false,
    '#settings': false
}
// let creategamedata = {}; //initial
let creategamedata = {
    "playerNum": 1,
    "pressl": true,
    "spect": false,
    "words": {
        "4": {
            "Zipt": "A sudden or quick movement.",
            "Blux": "A color that combines blue and luxuriant green."
        },
        "5": {
            "Drime": "A small droplet of water.",
            "Plinx": "A substance that creates a sparkling effect."
        },
        "6": {
            "Frimzy": "A state of being slightly nervous or jittery.",
            "Glidex": "A futuristic device that allows smooth gliding or sliding."
        },
        "7": {
            "Crystex": "A crystalline substance with extraordinary properties.",
            "Quibbit": "A small, quick, and playful movement or action."
        },
        "8": {
            "Lumivore": "A mythical creature that feeds on light.",
            "Zephyrus": "A gentle and refreshing breeze."
        },
        "9": {
            "Whisprite": "A sprite or small creature associated with whispers.",
            "Luminexia": "A magical world filled with vibrant luminescence."
        },
        "10": {
            "Serenimist": "Someone who seeks serenity and promotes peace.",
            "Chromisaur": "A dinosaur-like creature with colorful scales."
        }
    }
}
let rs = getComputedStyle(root);
let nextpage = false;
let lettercount = 0;

async function optionboxtitle(elem) {
    optionBoxTitleAnim[elem] =  true;
    let letters = document.querySelectorAll(`${elem} h1 span`);
    while (optionBoxTitleAnim[elem]) {
        for (let i = 0; i < letters.length; i++) {
            letters[i].style.color = window.getComputedStyle(i == letters.length - 1 ? letters[0] : letters[i+1]).color
        } await new Promise(r => setTimeout(r, letters.length <= 5 ? 300 : 150))
    }
}

function createGame() {
    // let creategamedata = {};
    // creategameErrorbox.innerHTML = 'Exceptions:<br/><br/>';
    // creategameErrorbox.style.display = 'none';
    // let players = document.querySelector('input[name=players]').value;
    // players = players == '' ? 0 : parseInt(players);
    // if (players <= 0) {
    //     creategameErrorbox.innerHTML += '- Players cannot be less than 1.';
    //     creategameErrorbox.style.display = 'block';
    //     return
    // }
    // let count = 0;
    // let checks = 0;
    // let letter = addWordsDiv.getElementsByClassName('letter');
    // for (i of letter) if (i.value != '') count++;
    // if (count < players*98) {
    //     creategameErrorbox.innerHTML += '<br/>';
    //     creategameErrorbox.innerHTML += '- Please fill all the letter boxes.';
    //     checks--
    // } count = 0;
    // for (i of textareas) if (i.value != '') count++;
    // if (count < 14*players) {
    //     creategameErrorbox.innerHTML += '<br/>';
    //     creategameErrorbox.innerHTML += '- Please fill all the word description textboxes.';
    //     checks--

    // }
    // if (checks < 0) {
    //     creategameErrorbox.style.display = 'block';
    //     return
    // } slide('right', host, room);
    // creategamedata.playerNum = players;
    // creategamedata.pressl = rs.getPropertyValue('--switchpressl') == "50%" ? true : false;
    // creategamedata.spect = rs.getPropertyValue('--switchspect') == "50%" ? true : false;
    // creategamedata.words = {
    //     '4': {},
    //     '5': {},
    //     '6': {},
    //     '7': {},
    //     '8': {},
    //     '9': {},
    //     '10': {}
    // }
    // let word = 0;
    // let letters = '';
    // for (i of letter) letters += i.value;
    // for (let i = 0; i < 8*players; i+=4) {
    //     creategamedata.words['4'][letters.substring(i, i+4)] = textareas[word].value;
    //     word++
    // } let till = 8*players;
    // for (let i = 5; i <= 10; i++) {
    //     for (let j = till; j < i*2*players+till; j+=i) {
    //         creategamedata.words[`${i}`][letters.substring(j, j+i)] = textareas[word].value;
    //         word++
    //     } till += i*2*players;
    // }
    slide('right', host, room); // remove this line after debug is done
    console.log(creategamedata);
    if (!socket.connected) socket.connect();
    socket.emit('creategame', creategamedata);
}

function deletegame() {
    socket.disconnect();
    slide('reft', room, host,false);
}

socket.on('response', function(response) {
    if (response.to == 'creategame') {
        if (response.code == 201) {
            // slide to the accepting players/spectators window and write the room code from response.room
            document.cookie = `secret=${response.secret}`;
            var roomCode = response.room
            console.log(roomCode)
            document.querySelector('#roomCode>span').innerHTML = roomCode;
        }
    }
});

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
    display.style.visibility = 'visible';
    let currentleftpos = main.style.left == '' ? '0' : main.style.left;
    root.style.setProperty('--slide0', currentleftpos);
    if (direction == 'right') root.style.setProperty('--slide100', parseInt(currentleftpos)-100+'%');
    else root.style.setProperty('--slide100', parseInt(currentleftpos)+100+'%');
    main.style.animation = 'slide .5s ease-out';
    await new Promise(r => setTimeout(r, 480));
    main.style.left = direction == 'right' ? parseInt(currentleftpos)-100+'%' : parseInt(currentleftpos)+100+'%';
    hide.style.visibility = 'hidden';
    main.style.animation = '';
    if (animoff) nextpage = true; else if (nextpage) letters()
}

function option(op) {
    let menu = document.getElementById('menu');
    let settings = document.getElementById('settings');
    let help = document.getElementById('help');
    if (op == 1) 
        if (settings.style.display == 'block') {
            settings.style.display = 'none';
            menu.style.display = 'block';
            optionBoxTitleAnim['#settings'] = false;
        } else {
            settings.style.display = 'block';
            help.style.display = 'none';
            menu.style.display = 'none';
            optionBoxTitleAnim['#help'] = false;
            optionboxtitle('#settings')
        }
    else
        if (help.style.display == 'block') {
            help.style.display = 'none';
            menu.style.display = 'block';
            optionBoxTitleAnim['#help'] = false;
        } else {
            settings.style.display = 'none';
            help.style.display = 'block';
            menu.style.display = 'none';
            optionBoxTitleAnim['#settings'] = false;
            optionboxtitle('#help')
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