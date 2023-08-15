const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];


const addBox = document.querySelector(".add-box"),
wrapper = document.querySelector(".wrapper"),
popupBox = document.querySelector(".popup-box"),
closeIcon = popupBox.querySelector("header i"),
addBtn = popupBox.querySelector("button"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
input = document.querySelector(".input");

const notes = JSON.parse(localStorage.getItem("todo-list") || "[]");

let userId, isEditing = false;

function showNotes(){
    document.querySelectorAll(".note").forEach(note => note.remove("note"));
    notes.forEach((note, id) => {
        let liTag = `<li class="note">
        <div class="details">
            <h3>${note.title}</h3>
            <p>${note.description}</p>
        </div>
        <div class="button-content">
            <span>${note.date}</span>
            <div class="setting">
                <i onclick="Open(this)" class='bx bx-dots-horizontal-rounded'></i>
                <div class="menu">
                    <div onclick="edit(${id}, '${note.title}', '${note.description}')"><i class='bx bx-edit' ></i> edit</div>
                    <div onclick="delet(${id})"><i class='bx bx-trash-alt' ></i> delet</div>
                </div>
            </div>
        </div>
    </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
    });
    let allNotes = document.querySelectorAll(".note");
    input.addEventListener("keyup", () => {
        allNotes.forEach(e => {
            e.style.display = e.innerHTML.toLowerCase().indexOf(input.value.toLowerCase()) > -1 ? "" : "none";
        });
    })
}
showNotes();

function edit(noteId, noteTitle, noteDesc){
    userId = noteId;
    isEditing = true;
    addBox.click();
    titleTag.value = noteTitle;
    descTag.value = noteDesc;
}

function delet(e){
    let com = confirm("you sure");
    if(!com) return;
    notes.splice(e, 1);
    localStorage.setItem("todo-list", JSON.stringify(notes));
    showNotes();
}

function Open(e){
    e.parentElement.classList.add("show");
    document.addEventListener("click", (el) => {
        if(el.target.tagName !== "I" || el.target !== e){
            e.parentElement.classList.remove("show");
        }
    });
}

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let noteTitle = titleTag.value,
    noteDesc = descTag.value;

    if(noteTitle || noteDesc){
        let dateObj = new Date(),
        m = months[dateObj.getMonth()],
        d = dateObj.getDate(),
        y = dateObj.getFullYear();
        
        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${m} ${d}, ${y}`
        }
        if(!isEditing){
            notes.push(noteInfo);
        }else{
            notes[userId] = noteInfo;
        }
        localStorage.setItem("todo-list", JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
});

addBox.addEventListener("click", () => {
    popupBox.classList.add("show");
    titleTag.focus();
});

closeIcon.addEventListener("click", () => {
    titleTag.value = "";
    descTag.value = "";
    popupBox.classList.remove("show");
});