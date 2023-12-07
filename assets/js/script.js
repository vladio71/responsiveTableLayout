let page = 1
const max = 40
const paginationList = document.querySelector("[data-pagination]");
const navBtn = document.querySelector("[data-nav]");
const nav = document.querySelector("[data-navbar]");
const back = document.querySelector("[data-back]");
const forward = document.querySelector("[data-forward]");

navBtn.addEventListener('click', function () {
    nav.classList.toggle('absolute-navbar')
    document.body.classList.toggle('overflow-hidden')

})
back.addEventListener('click', (e) => onClickHandler(e, page - 1))
forward.addEventListener('click', (e) => onClickHandler(e, page + 1))

for (let i = 0; i < paginationList.children.length; i++) {
    paginationList.children[i].addEventListener('click', onClickHandler);
}


function onClickHandler(event, pId = 0) {
    const target = event.target;
    const p = pId ? pId : target.getAttribute('data-value') * 1
    if (p < 1 || p > max) return
    if (p <= 3) {
        createStartPagination(p)
    } else if (p >= max - 2) {
        createEndPagination(p)
    } else {
        createMiddlePagination(p)
    }
    page = p
}

function createStartPagination(p) {
    paginationList.textContent = '';
    paginationList.appendChild(createPaginationItem(1, 1 === p))
    paginationList.appendChild(createPaginationItem(2, 2 === p))
    paginationList.appendChild(createPaginationItem(3, 3 === p))
    paginationList.appendChild(createPaginationItem(4, 4 === p))
    paginationList.appendChild(createPaginationItem('...'))
    paginationList.appendChild(createPaginationItem(max))
}


function createMiddlePagination(p) {
    paginationList.textContent = '';
    paginationList.appendChild(createPaginationItem(1))
    paginationList.appendChild(createPaginationItem('...'))
    paginationList.appendChild(createPaginationItem(p - 1))
    paginationList.appendChild(createPaginationItem(p, true))
    paginationList.appendChild(createPaginationItem(p + 1))
    paginationList.appendChild(createPaginationItem('...'))
    paginationList.appendChild(createPaginationItem(max))
}

function createEndPagination(p) {
    paginationList.textContent = '';
    paginationList.appendChild(createPaginationItem(1, 1 === p))
    paginationList.appendChild(createPaginationItem('...'))
    paginationList.appendChild(createPaginationItem(max - 3, max - 3 === p))
    paginationList.appendChild(createPaginationItem(max - 2, max - 2 === p))
    paginationList.appendChild(createPaginationItem(max - 1, max - 1 === p))
    paginationList.appendChild(createPaginationItem(max, max === p))
}


function createPaginationItem(string, select = false) {
    let span = document.createElement('span')
    span.innerHTML = string
    if (select)
        span.classList.add('selected')
    if (string !== '...') {
        span.setAttribute('data-value', string)
        span.classList.add('frame__footer__item')
    } else {

    }
    span.addEventListener('click', onClickHandler)
    return span

}