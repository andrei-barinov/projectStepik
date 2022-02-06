let navHeaderElem = $('#navbar-header')[0];

class navBarHeader {
    constructor(startStr){
        this.startStr = startStr;
    }
    set fio(name){
        this.name = name;
        this.updateName();
    }
    get fio(){
        return this.name;
    }
    set greeting(str){
        this.greetMsg = str;
    }
    get greeting(){
        return this.greetMsg;
    }
    get HeaderHTML(){
        return `<p>${this.startStr}, <span id="userName" style="font-weight: bold">${this.fio}</span>,
        ${this.greeting === undefined || this.greeting === '' ? ' как настроение?' : this.greeting()}</p>`
    }
    updateName(){
        let nameBlocks = $('#userName');

        for(let elem of nameBlocks){
            elem.innerText = this.fio;
        }
    }
}

window.onload = function () {
    let Uname;
    let navHeader = new navBarHeader('Здравствуйте');
    let name = localStorage.getItem('UserName');

    if(name === null || name.trim() === ''){
        let newName = prompt('Как к Вам обращаться?', 'Dude');
        while(newName === null || newName.trim() === ''){
            newName = prompt('Как к Вам обращаться?', localStorage.getItem('UserName'));
        }
        navHeader.fio = newName;
        localStorage.setItem('UserName', newName);
    }

    navHeader.fio = localStorage.getItem('UserName');

    navHeaderElem.innerHTML = navHeader.HeaderHTML;
    Uname = document.getElementById('userName');

    Uname.addEventListener("click", function () {
        let newName = prompt('Как к Вам обращаться?', localStorage.getItem('UserName'));
        while(newName === null || newName.trim() === ''){
            newName = prompt('Как к Вам обращаться?', localStorage.getItem('UserName'));
        }
        navHeader.fio = newName;
        localStorage.setItem('UserName', newName);
    });
}