// Week 10 Assignment
// Using HTML, Bootstrap, and JavaScript create a single page website that contains the following:
//      A Bootstrap styled table representing your choice of data.
//      A Bootstrap styled form that allows a user to add a new row to the table when clicking on submit.
//
// For this I enabled someone to add the albums in their music collection by genre (Pop, Rock, Metal, etc.), using the 
// album artist's name and the album title. 

// There are two classes: Album and Genre.

class Album {
    constructor(artist, title) {
        this.artist = artist;
        this.title = title;
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

//The function that redraws the table(s) when a genre or an album is added or deleted.
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

//Adds an album in a row to a genre.
function createAlbumRow(genre, table, album) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = album.artist;
    row.insertCell(1).innerHTML = album.title;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(genre, album));
}

//Remove an album from a genre list.
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

// The button that deletes a genre category.
function createDeleteGenreButton(genre) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete Genre';
    btn.onclick = () => {
        let index = genres.indexOf(genre);
        genres.splice(index, 1);
        drawDOM();
    };
    return btn;
}

// The button that creates a new album.
function createNewAlbumButton(genre) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Add';
    btn.onclick = () => {
        genre.albums.push(new Album(getValue(`artist-input-${genre.id}`), getValue(`title-input-${genre.id}`)));
        drawDOM();
    }
    return btn;
}


// When the Add button is clicked with text in the Genre text field, a new table is created to hold the albums in the genre.
function createGenreTable(genre) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let titleColumn = document.createElement('th');
    let artistColumn = document.createElement('th');
    artistColumn.innerHTML = 'Artist';
    titleColumn.innerHTML = 'Title';
    row.appendChild(artistColumn);
    row.appendChild(titleColumn);
    let formRow = table.insertRow(1);
    let artistTh = document.createElement('th');
    let titleTh = document.createElement('th');
    let createTh = document.createElement('th');

    let artistInput = document.createElement('input');
    artistInput.setAttribute('id', `artist-input-${genre.id}`);
    artistInput.setAttribute('type', 'text');
    artistInput.setAttribute('class', 'form-control');

    let titleInput = document.createElement('input');
    titleInput.setAttribute('id', `title-input-${genre.id}`);
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('class', 'form-control');
   
    let newAlbumButton = createNewAlbumButton(genre);
    artistTh.appendChild(artistInput);
    titleTh.appendChild(titleInput);
    createTh.appendChild(newAlbumButton);
    formRow.appendChild(artistTh);
    formRow.appendChild(titleTh);
    formRow.appendChild(createTh);
    return table;

}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

