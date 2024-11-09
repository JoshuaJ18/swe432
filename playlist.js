class Playlist {
    constructor(name, songs) {
        this.name = name;
        this.songs = songs;
    }

    getName() {
        return this.name;
    }

    setDj(dj) {
        this.dj = dj;
    }
}

export default Playlist;