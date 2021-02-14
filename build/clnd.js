const ddBtn = document.querySelector("#btnInHead");
const ssBtn = document.querySelector("#btnInDay");
const ttBtn = document.querySelector("#btnInTime");
const ppBtn = document.querySelector("#btnInParticipants");

const menu1 = document.querySelector("#menuInHead");
const item1 = menu1.querySelectorAll(".dropdown-item");
const menu2 = document.querySelector("#menuInDay");
const item2 = menu2.querySelectorAll(".dropdown-item");
const menu3 = document.querySelector("#menuInTime");
const item3 = menu3.querySelectorAll(".dropdown-item");
const menuP = document.querySelector("#menuInParticipants");
const itemP = menuP.querySelectorAll(".dropdown-item");
let arr = [];
let draggedItem = null;
let droppedItem = null;

const nameOfMeeting = document.querySelector("input");
const titleddBtn1 = document.querySelector('#titleInHead');
const titleddBtn2 = document.querySelector('#titleInDay');
const titleddBtn3 = document.querySelector('#titleInTime');
const titleddBtnP = document.querySelector('#titleInParticipants')

const eBtn = document.querySelector('.nev');
const modalHidden1 = document.querySelector(".modal-hidden1");
const modalHidden2 = document.querySelector(".modal-hidden2");
const inmodal2 = document.querySelector(".inmodal2");
const nobtn = document.querySelector(".no");
const yesbtn = document.querySelector(".yes");
 
const btnCreate = document.querySelector('#btnCreate');
const btnCancel = document.querySelector('#btnCancel');
const forClosemodal = document.querySelector('.icon');

const dayTh = document.querySelectorAll('.days');
const timeTh = document.querySelectorAll('.time');
const cell = document.querySelectorAll('img.invisible');
const flEd = document.querySelectorAll('tr td');
const flEv = document.querySelectorAll('td');
const back = document.querySelector('.back');
const invisible = document.querySelector('.invisible');
const forCloseerr = document.querySelector('.icon2')

const show = function(value) {
    value.classList.toggle("show")
}

const remShow = function(argMenu, argId, e) {
    if (argMenu.classList.contains("show") && !e.target.matches(argId)) {
        argMenu.classList.remove('show');
    }
}

const changeText = function(titleInBtn, e) {
    titleInBtn.textContent = e.target.textContent
 }

const toggleCell = function(itm1, itm2, itm3, itm4) {
    itm1.lastChild.classList.replace(itm2, itm3);
    itm1.classList.toggle(itm4);
    if (itm1.firstChild.textContent.length > 0) {
        itm1.firstChild.classList.toggle('invisible');
    }
}

ddBtn.addEventListener("click", e => show(menu1));
ssBtn.addEventListener("click", e => show(menu2));
ttBtn.addEventListener("click", e => show(menu3));
ppBtn.addEventListener("click", e => show(menuP));

window.addEventListener("click", e => {
    remShow(menu1, "#btnInHead", e);
    remShow(menu2, "#btnInDay", e);
    remShow(menu3, "#btnInTime", e);
    remShow(menuP, "#btnInParticipants", e);
})

item1.forEach (el => {
    el.addEventListener("click", e => {
        if (e.target.textContent === el.textContent) {changeText(titleddBtn1, e)};
        flEv.forEach (name => {
            if (!name.classList.contains("back") && name.hasAttribute("data-participants") &&
                name.getAttribute("data-participants").includes(e.target.textContent)) {
                    toggleCell(name, "invisible", "backClose", "back");
            }
            if (name.classList.contains("back") && !name.getAttribute("data-participants").includes(e.target.textContent)) {
                    toggleCell(name, "backClose", "invisible", "back");
            }
            if (name.hasAttribute("data-participants") && e.target.textContent === "All members") {
                    toggleCell(name, "invisible", "backClose", "back");
            }
        });
    });
})   

item2.forEach (el => {
    el.addEventListener("click", e => {
    if (e.target.textContent === el.textContent) {changeText(titleddBtn2, e)}
})})

item3.forEach (el => {
    el.addEventListener("click", e => {
    if (e.target.textContent === el.textContent) {changeText(titleddBtn3, e)}
})})

itemP.forEach (el => {
    el.addEventListener("click", e => {
        if (!titleddBtnP.textContent.includes(e.target.textContent)){arr.push(el)};
        if (e.target.textContent === el.textContent) {
            titleddBtnP.textContent = arr.reduce((acc, itm) => acc + `'${itm.textContent}' `, '')
        }
})})

eBtn.addEventListener("click", e => {
    modalHidden1.classList.replace("modal-hidden1", "show");
    nameOfMeeting.value = "";
    titleddBtn2.textContent = "Select day";
    titleddBtn3.textContent = "0:00";
    titleddBtnP.textContent = "Participants";
    arr = [];
    if (invisible.classList.contains("blockerr")) {invisible.classList.replace("blockerr", "invisible")};
})

//                It's Drag & Drop. But it works as moving only - not as copying.

// const handleDragstart = function(e) {
//     draggedItem = this;
// }
 
// const handleDragover =  function(e) {
//     e.preventDefault();
// }

// const handleDrop =  function(e) {
//     if(droppedItem) {
//         this.replaceWith(draggedItem);
//         draggedItem.id = this.id
//     };
// }
        
// flEv.forEach (dragItem => {
//     dragItem.draggable = true;
//     dragItem.addEventListener("dragstart", handleDragstart);
//         dragItem.addEventListener('dragenter', e => {
//         e.preventDefault();
//         if (draggedItem !== droppedItem) {
//             droppedItem = dragItem;
//         }
//     });
//     dragItem.addEventListener('dragover', handleDragover);
//     dragItem.addEventListener("drop", handleDrop);
// });

modalHidden1.addEventListener("click", e => {
	if (e.target.matches(".js-modal-backdrop") && modalHidden1.classList.contains("show")) {
        modalHidden1.classList.replace ("show", "modal-hidden1")
    }
})

btnCreate.addEventListener("click", e => {
    if (titleddBtn2.textContent !== "Select day" && titleddBtn3.textContent !== "0:00" &&
        arr.length > 1) {
        dayTh.forEach (el => {
            timeTh.forEach (item => {
                if (titleddBtn2.textContent.includes(el.textContent) &&
                    titleddBtn3.textContent === item.textContent) {
                    cell.forEach (p => {
                        if (p.closest('tr[id]').id === item.textContent && p.parentNode.className === el.textContent &&
                            !p.parentNode.classList.contains("back")) {
                                p.parentNode.setAttribute("data-participants", titleddBtnP.textContent);
                                p.parentNode.classList.add("back");
                                p.classList.replace("invisible", "backClose");
                                if (nameOfMeeting.value.length > 0) {
                                    p.parentNode.firstChild.textContent = nameOfMeeting.value;
                                }
                                if (p.parentNode.classList.contains("back")) {
                                    p.addEventListener("click", e => {
                                        modalHidden2.classList.replace("modal-hidden2", "show");
                                        inmodal2.textContent = `Are you sure you want to delete "${p.parentNode.firstChild.textContent}" event ?`
                                        yesbtn.addEventListener("click", e => {
                                            p.parentNode.lastChild.classList.replace("backClose", "invisible");
                                            p.parentNode.classList.remove("back");
                                            p.parentNode.firstChild.textContent = "";
                                            p.parentNode.removeAttribute("data-participants");
                                            modalHidden2.classList.replace("show", "modal-hidden2");
                                        })
                                    })
                                }
                                modalHidden1.classList.replace ("show", "modal-hidden1")
                        } else if (p.parentNode.classList.contains("back")) {
                            invisible.classList.replace("invisible", "blockerr")
                        } 
                        nobtn.addEventListener("click", e => {
                            modalHidden2.classList.replace("show", "modal-hidden2");
                        })
                    })
                }
            })
        })
    }
})

forCloseerr.addEventListener("click", e => {
    invisible.classList.replace("blockerr", "invisible")
})

btnCancel.addEventListener("click", e => {
    nameOfMeeting.value = "";
    titleddBtn2.textContent = "Select day";
    titleddBtn3.textContent = "0:00";
    titleddBtnP.textContent = "Participants";
    arr = []
})

forClosemodal.addEventListener("click", e => {
    modalHidden1.classList.replace ("show", "modal-hidden1");
})
