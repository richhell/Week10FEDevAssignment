// Week 10 Assignment
// 

class Album {
    constructor(title, performer) {
        this.title = title;
        this.performer = performer;
    }
}

class Genre {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.albums = [];
    }
    addAlbum(album) {
        this.albums.push(album);
    }

    deleteAlbum(album) {
        let index = this.albums.indexOf(album);
        this.albums.splice(index, 1);
    }
}

let genres = []; 
let genreId = 0;

onClick('new-genre', () => {
    genres.push(new Genre(genreId++, getValue('new-genre-name')));
    drawDOM(); 
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let genreDiv = document.getElementById('genres');
    clearElement(genreDiv);
    for (genre of genres) {
        let table = createGenreTable(genre);
        let title = document.createElement('h2');
        title.innerHTML = genre.name;
        title.appendChild(createDeleteGenreButton(genre));
        genreDiv.appendChild(title);
        genreDiv.appendChild(table);
        for (album of genre.albums) {
            createAlbumRow(genre, table, album);
        }
    }
}

function createAlbumRow(genre, table, album) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = album.name;
    row.insertCell(1).innerHTML = genre.position;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(genre, album));
}

function createDeleteRowButton(genre, album) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = genre.albums.indexOf(album);
        genre.albums.splice(index, 1);
        drawDOM();
    }
    return btn;
}

function createDeleteGenreButton(genre) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete Genre';
    btn.onclick = () => {
        let index = genre.indexOf(genre);
        genres.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createNewAlbumButton(genre) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innterHTML = 'Add';
    btn.onclick = () => {
        genre.albums.push(new Album(getValue(`name-input-${genre.id}`), getValue(`position-input-${genre.id}`)));
        drawDOM;
    }
    return btn;
}

function createGenreTable(genre) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let positionColumn = document.createElement('th');
    nameColumn.innerHTML = 'Name';
    positionColumn.innerHTML = 'Position';
    row.appendChild(nameColumn);
    row.appendChild(positionColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let positionTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${genre.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let positionInput = document.createElement('input');
    positionInput.setAttribute('id', `position-input-${genre.id}`);
    positionInput.setAttribute('type', 'text');
    positionInput.setAttribute('class', 'form-control');
    let newAlbumButton = createNewAlbumButton(genre);
    nameTh.appendChild(nameInput);
    positionTh.appendChild(positionInput);
    createTh.appendChild(newAlbumButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(positionTh);
    formRow.appendChild(createTh);
    return table;

}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element, firstChild);
    }
}

