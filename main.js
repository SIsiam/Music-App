
// useing ASYNC AWAIT 

/* 
    const searchSongs = async () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`

    // load data

    const res = await fetch(url);
    const data = await res.json();
    displaySongs(data.data);
*/

const searchSongs = () => {
    const userSearch = document.getElementById('search-box').value;
    const myUrl = `https://api.lyrics.ovh/suggest/${userSearch}`

    // My Song Loading Data

    fetch(myUrl)
        .then(respo => respo.json())
        .then(myJsonData => displaySongs(myJsonData.data))
        .catch(error => displayError('Oppps!!.Something Went Wrong!! Please try again later!'));
}


const displaySongs = songs => {
    console.log(songs);
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    songs.forEach(song => {
        const everySongDiv = document.createElement('div');
        everySongDiv.className = 'single-result row align-items-center my-3 p-3 song-div-style';
        everySongDiv.innerHTML = `
            <div class="col-md-9">
            <img src="${song.artist.picture_small}">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div>
            <div>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
            `;
        songContainer.appendChild(everySongDiv);
    })
}

// Song Lyrics when User Click lyric Button 

const getLyric = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    }
    catch (error) {
        displayError('Sorry! I failed to load lyrics, Please try again later!!!')
    }
}

/* 
    const getLyric = (artist, title) => {
        const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
        fetch(url)
        .then(res => res.json())
   .then(data => displayLyrics(data.lyrics))
 }
*/

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.className ="song-lyrics-style"
    lyricsDiv.innerText = lyrics;

}

const displayError = error => {
    const errorMsg = document.getElementById('err-Msg');
    errorMsg.innerText = error;
}