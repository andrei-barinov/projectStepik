function Tab(tabData, i) {
    return `<li class="tab-link_tab" id="${i}"><span></span>${tabData.name}</li>`
}

function TabList(tabs){
    return `<ul>
                ${tabs.map((el,i) => Tab(el, i)).join('')}
            </ul>`
}

let tabs =[
    {
        name: 'gitHub',
        contentLink: 'https://github.com/Mitrr',
        contentLinkText: '@github/Mitrr',
        contentText: 'Здесь вы можете посмотреть мои проекты'
    },
    {
        name: 'email',
        contentLink: 'mailto:mitrskoggson@yandex.ru',
        contentLinkText: 'mitrskoggson@yandex.ru',
        contentText: 'Ваши предложения'
    },
    {
        name: 'skype',
        contentLink: 'skype:skypename?call',
        contentLinkText: 'skypename',
        contentText: 'Связаться с нами'
    },
];

$('.tabs_container')[0].innerHTML = TabList(tabs);

function TabContent(tab) {
    return `<div class="tabs_content_container" style="display: block">
                <a href="${tab.contentLink}" target="_blank">${tab.contentLinkText}</a>
                <p>${tab.contentText}</p>
            </div>`
}

$('.tab-link_tab').on('click', function () {
    $('.tab-content_wrapper')[0].innerHTML = TabContent(tabs[+this.id])
});

// $('.tabs_container>ul>li').hover(function () {
//     $(this)
//         .addClass('active_tab-link')
//         .siblings()
//         .removeClass('active_tab-link')
//         .closest(".contacts_block")
//         .find('div.tabs_content_container')
//         .removeClass('active_tab-content')
//         .eq($(this).index())
//         .addClass('active_tab-content')
// });