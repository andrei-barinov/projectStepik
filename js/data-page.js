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