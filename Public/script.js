let title = document.getElementById("title");
let description = document.getElementById("description");
let addNote = document.getElementById("addNote");
let clearAll = document.getElementById("clearAll");
let notesContainer = document.getElementById("notesContainer");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

addNote.addEventListener("click", function () {

    if (title.value === "" || description.value === "") {
        alert("Please enter title and description");
        return;
    }

    let note = {
        title: title.value,
        description: description.value,
        color: "lightyellow",
        time: new Date().toLocaleString()
    };

    notes.push(note);

    localStorage.setItem("notes", JSON.stringify(notes));

    displayNotes();

    title.value = "";
    description.value = "";
});

function displayNotes() {

    notesContainer.innerHTML = "";

    notes.forEach(function (note, index) {

        let noteDiv = document.createElement("div");

        noteDiv.style.backgroundColor = note.color;

        noteDiv.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.description}</p>
            <small>Created: ${note.time}</small>
        `;

        if (note.editedTime) {
            noteDiv.innerHTML += `
                <br>
                <small>Edited: ${note.editedTime}</small>
            `;
        }

        let expandButton = document.createElement("button");
        expandButton.innerText = "Expand";

        expandButton.addEventListener("click", function () {

            let editArea = document.createElement("div");

            editArea.innerHTML = `
                <br>
                <input type="text" value="${note.title}">
                <br><br>
                <textarea>${note.description}</textarea>
                <br><br>
            `;

            let newTitle = editArea.querySelector("input");
            let newDescription = editArea.querySelector("textarea");

            let yellowButton = document.createElement("button");
            yellowButton.innerText = "Yellow";

            yellowButton.addEventListener("click", function () {
                note.color = "lightyellow";
                noteDiv.style.backgroundColor = note.color;
            });

            let blueButton = document.createElement("button");
            blueButton.innerText = "Blue";

            blueButton.addEventListener("click", function () {
                note.color = "lightblue";
                noteDiv.style.backgroundColor = note.color;
            });

            let pinkButton = document.createElement("button");
            pinkButton.innerText = "Pink";

            pinkButton.addEventListener("click", function () {
                note.color = "lightpink";
                noteDiv.style.backgroundColor = note.color;
            });

            let saveButton = document.createElement("button");
            saveButton.innerText = "Save";

            saveButton.addEventListener("click", function () {

                if (newTitle.value === "" || newDescription.value === "") {
                    alert("Title and description are required");
                    return;
                }

                note.title = newTitle.value;
                note.description = newDescription.value;
                note.editedTime = new Date().toLocaleString();

                localStorage.setItem("notes", JSON.stringify(notes));

                displayNotes();
            });

            editArea.appendChild(yellowButton);
            editArea.appendChild(blueButton);
            editArea.appendChild(pinkButton);

            editArea.appendChild(document.createElement("br"));
            editArea.appendChild(document.createElement("br"));

            editArea.appendChild(saveButton);

            noteDiv.appendChild(editArea);
        });

        let copyButton = document.createElement("button");
        copyButton.innerText = "Copy";

        copyButton.addEventListener("click", function () {
            copyNote(index);
        });

        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";

        deleteButton.addEventListener("click", function () {
            deleteNote(index);
        });

        noteDiv.appendChild(document.createElement("br"));
        noteDiv.appendChild(document.createElement("br"));

        noteDiv.appendChild(expandButton);
        noteDiv.appendChild(copyButton);
        noteDiv.appendChild(deleteButton);

        notesContainer.appendChild(noteDiv);
    });
}

function deleteNote(index) {

    notes.splice(index, 1);

    localStorage.setItem("notes", JSON.stringify(notes));

    displayNotes();
}

function copyNote(index) {

    let copy = {
        title: notes[index].title,
        description: notes[index].description,
        color: notes[index].color,
        time: new Date().toLocaleString()
    };

    notes.push(copy);

    localStorage.setItem("notes", JSON.stringify(notes));

    displayNotes();
}

clearAll.addEventListener("click", function () {

    notes = [];

    localStorage.removeItem("notes");

    displayNotes();
});

displayNotes();