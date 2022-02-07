import {theme} from './theme.js';

theme.coolUpdate();

window.addEventListener('storage', function (event) {
    theme.coolUpdate();
});

$(function(){
    var includes = $('[data-include]');
    //document.querySelector("[data-include]").innerText;
    jQuery.each(includes, function(){
        var file = 'components/' + $(this).data('include') + '.html';
        $(this).load(file);
    });
});

let peoples = [];
let cupPeoples =[];
let nextPeoplesPage ='';
let prevPeoplesPage ='';
function Personage(pers) {
    return `<div class="personage-item_container" id="pers_${pers.i}" style="flex: 1;transform: translateY(70%)">hello
        <h5 style="margin: 0 auto">${pers.name}</h5>
        <p>Родился ${pers.birth_year}</p>
    </div>`;
}

function drawPersonages(startIndex = 0, endIndex = 3){
    cupPeoples = peoples.slice(startIndex, endIndex);

    let HTMLPeoples = cupPeoples.map(el => Personage(el));

    $('.personages_container')[0].innerHTML = HTMLPeoples.join('');

    $('.personage-item_container').on('click', function () {
        if(this.style.transform === "translate(0%, 10%) matrix(1, 0, 0, 1, 0, 0)"){
            TweenMax.to(this, 0.6, {y: '70%', ease: Power4.easeOut});
        } else {
            TweenMax.to(this, 0.6, {y: '10%', ease: Back.easeOut});
        }
    });
}

window.onload = async function () {
    let res = await fetch('https://swapi.dev/api/people/').then(res => res.json());

    peoples = res.results.map((el, i) => {
        el.i = i;
        return el;
    });

    nextPeoplesPage = res.next;
    prevPeoplesPage = res.previous;

    drawPersonages();
}

let load = async function loadNewPeoplePage(url){
    let {next, previous, results} = await fetch(url).then(res => res.json());

    nextPeoplesPage = next;
    prevPeoplesPage = previous;

    peoples = results.map((el, i) => {
        el.i = i;
        return el;
    });

    drawPersonages()
}

document.getElementById('next').addEventListener("click", () =>{
   let lastIntCurrentCup = cupPeoples[cupPeoples.length - 1].i;

   if(lastIntCurrentCup !== peoples.length - 1){
       drawPersonages(lastIntCurrentCup + 1, lastIntCurrentCup + 4)
   }else {
       if(nextPeoplesPage !== null){
            load(nextPeoplesPage);
       }
   }
});

document.getElementById('prev').addEventListener("click", () => {
    let firstIntCurrentCup = cupPeoples[0].i;

    if(firstIntCurrentCup !== 0){
        drawPersonages(firstIntCurrentCup - 3, firstIntCurrentCup)
    }else {
        if(prevPeoplesPage !== null){
            load(prevPeoplesPage);
        }
    }
});