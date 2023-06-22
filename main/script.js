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

