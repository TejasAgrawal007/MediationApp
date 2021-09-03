const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vio-container video')


    // sounds
    const souunds = document.querySelectorAll('.sound-picker button')

    // Time Display
    const timeDisplay = document.querySelector('.timeDisplay');
    const timeSelect = document.querySelectorAll('.time-select button')

    // Get the length off the outline
    const outlineLength = outline.getTotalLength();
    // console.log(outlineLength); to Check the length

    // Durations
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;


    // play different Sounds
    souunds.forEach(sound => {
        sound.addEventListener('click', function () {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        }) 
    })

    // play Sounds
    play.addEventListener('click', () => {
        checkPlaying(song);
    });


    // selectSounds

    timeSelect.forEach(option => {
        option.addEventListener('click', function () {
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        })
    })

    // creating a function to play the sound off
    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    }

    // We Can animinate the circule

    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let secound = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        // Animited the bar or circule
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        // Animinate the text
        timeDisplay.textContent = `${minutes}:${secound}`;

        if (currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg'
            video.pause();
        }
    }
};

app();