let trailerPlayer = null;

function openTrailerVideo() {
    const trailerVideoModal = document.getElementById('trailerVideoModal');
    const trailerVideoContainer = document.getElementById('trailerVideoContainer');



    const trailerConfig = {
        type: 'direct', // Change to 'direct' for direct video URLs or 'youtube' for YouTube videos
        source: 'img/eng.mp4' // Replace with your video URL or with actualy YouTube video ID ex:dQw4w9WgXcQ
    };
    

    trailerVideoContainer.innerHTML = '';
    
    if (trailerConfig.type === 'youtube') {
      
        trailerVideoContainer.innerHTML = '<div class="loading">Loading video...</div>';
        
       
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            
            window.onYouTubeIframeAPIReady = function() {
                createTrailerPlayer(trailerConfig.source);
            };
        } else {
            createTrailerPlayer(trailerConfig.source);
        }
    } else if (trailerConfig.type === 'direct') {
     
        trailerVideoContainer.innerHTML = `
            <video controls autoplay width="100%" height="100%">
                <source src="${trailerConfig.source}" type="video/mp4">
                <source src="${trailerConfig.source}" type="video/webm">
                Your browser does not support the video tag.
            </video>
        `;
    }
    
    trailerVideoModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    setTimeout(() => trailerVideoModal.classList.add('show'), 10);
}

function createTrailerPlayer(videoId) {
    const trailerVideoContainer = document.getElementById('trailerVideoContainer');
    
    if (trailerPlayer) {
        trailerPlayer.destroy(); 
    }
    
    trailerPlayer = new YT.Player(trailerVideoContainer, {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
            'autoplay': 1,
            'modestbranding': 1,
            'rel': 0,
            'showinfo': 0,
            'color': 'white',
            'controls': 1,
            'enablejsapi': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function closeTrailerVideo() {
    const trailerVideoModal = document.getElementById('trailerVideoModal');
    trailerVideoModal.classList.remove('show');
    

    if (trailerPlayer && typeof trailerPlayer.stopVideo === 'function') {
        trailerPlayer.stopVideo();
    } else {
        const video = trailerVideoContainer.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    }
    
    document.body.style.overflow = '';
    setTimeout(() => {
        trailerVideoModal.style.display = 'none';
        if (trailerPlayer) {
            trailerPlayer.destroy();
            trailerPlayer = null;
        }
    }, 300);
}

function onPlayerStateChange(event) {
  
}


window.onclick = function(event) {
    const trailerVideoModal = document.getElementById('trailerVideoModal');
    if (event.target === trailerVideoModal) {
        closeTrailerVideo();
    }
}