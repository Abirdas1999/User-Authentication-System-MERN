function getRecentSongs(playlist, k) {
    // Convert the playlist string into an array of songs
    const songs = playlist.split(" ");
    const recentSongs = []; // Array to maintain the most recent songs

    songs.forEach((song) => {
        // If the song is already in the recentSongs array, remove it
        const index = recentSongs.indexOf(song);
        if (index !== -1) {
            recentSongs.splice(index, 1);
        }
        // Add the song to the front of the array
        recentSongs.unshift(song);

        // Ensure the array doesn't exceed size k
        if (recentSongs.length > k) {
            recentSongs.pop();
        }
    });

    return recentSongs; // Return the final state of k most recent songs
}

// Example usage:
const playlist = "song1 song2 song3 song1 song4 song2 song5";
const k = 3;
console.log(getRecentSongs(playlist, k));
// Output: ["song5", "song2", "song4"]