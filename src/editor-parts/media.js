export const media = {
  createVideoElement(src) {
    const videoElement = document.createElement('video');
    videoElement.src = src;
    videoElement.controls = true;
    videoElement.muted = true;
    videoElement.crossOrigin = 'anonymous';
    return videoElement;
  },

  addMediaOptionsEvent(config, mediaElement) {

    let progressBar = null;
    let orignalWidth = 0;
    if (config.progressBar) {
      let p = this.editor.find('.' + config.progressBar);
      if (p.length > 0) {
        progressBar = p[0];
        orignalWidth = progressBar.width();
      }
    }




    mediaElement.ontimeupdate = (e) => {

      if (!this.readOnly) {
        return;
      }

      if (progressBar) {
        // let data = (mediaElement.currentTime / 100) * orignalWidth * (mediaElement.duration / orignalWidth);
        // const currentTime = audio.currentTime;

        // Calculate the progress as a fraction of current time over audio duration
        const progress = (mediaElement.currentTime / mediaElement.duration) * orignalWidth;
        progressBar.width(progress)
       
      }


    }

    if (config.playBtn) {
      let playBtn = this.editor.find('.' + config.playBtn);
      // if play button found
      if (playBtn.length > 0) {
        playBtn[0].on('click', () => {
         
          mediaElement.play();

        })
      }
    }

    // pause button event

    if (config.pauseBtn) {
      let pauseBtn = this.editor.find('.' + config.pauseBtn);
      // if play button found
      if (pauseBtn.length > 0) {
        pauseBtn[0].on('click', () => {
   
          mediaElement.pause();

        })
      }
    }
  },

  addAudio(config, defaultAudio = '') {
    // if (this.isEmpty(defaultAudio)) {
      defaultAudio = "https://onlinetestcase.com/wp-content/uploads/2023/06/100-KB-MP3.mp3";
    // }
    let audioURL = defaultAudio;
    if (!this.isEmpty(config)) {
      audioURL = config.audioSrc;
    }

    const videoElement = this.createVideoElement(audioURL);

    const defaultConfig = {
      x: 50,
      y: 50,
      type: 'audio',
      image: videoElement,
      draggable: true,
      width: this.editorWidth / 3,
      height: this.editorWidth / 3,
    }

    return new Promise((resolve, reject) => {


      videoElement.onloadedmetadata = (e) => {
     
        let conf = config;
        if (this.isEmpty(config)) {
          conf = defaultConfig;
        } else {
          config.image = videoElement;
        }

        var video = new Konva.Image(conf)

        // resize video 
        let calculation = this.calculateNewSize(
          videoElement.videoWidth,
          videoElement.videoHeight,
          video.width()
        );
        video.width(calculation.width);
        video.height(calculation.height);
        video.setAttr('audioSrc', audioURL);

        this.medias.push(videoElement)
        video.hide(true)
        this.add(video);
        // Start the video
        videoElement.play();

        // if editor mode
        if (!this.readOnly) {
          videoElement.pause();
        } else {
          videoElement.muted = conf?.isMuted ?? false;
          if (conf?.isAutoPlay ?? true) {
            videoElement.pause();
          }

        }

        this.anim.start()
      };

      this.addMediaOptionsEvent(config, videoElement)

      resolve();
    });
  },

  addVideo(config) {
    let defaultVideo = "https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c4/Physicsworks.ogv/Physicsworks.ogv.240p.vp9.webm";
    let videoUrl = defaultVideo;
    if (!this.isEmpty(config)) {
      videoUrl = config.videoSrc;
    }
    const videoElement = this.createVideoElement(videoUrl);
    const defaultConfig = {
      x: 50,
      y: 50,
      type: 'video',
      image: videoElement,
      draggable: true,
      width: this.editorWidth / 3,
      height: this.editorWidth / 3,
    }

    return new Promise((resolve, reject) => {

      videoElement.onloadedmetadata = () => {
        let conf = config;
        if (this.isEmpty(config)) {
          conf = defaultConfig;
        } else {
          config.image = videoElement;
        }

        var video = new Konva.Image(conf)
        // resize video 

        // if (this.isEmpty(config)) {
        let calculation = this.calculateNewSize(
          videoElement.videoWidth,
          videoElement.videoHeight,
          video.width()
        );
        video.width(calculation.width);
        video.height(calculation.height);
        video.setAttr('videoSrc', videoUrl);
        // }

        this.add(video);

        this.medias.push(videoElement)

        // Start the video
        videoElement.play();

        // if editor mode
        if (!this.readOnly) {
          videoElement.pause();
        } else {
          videoElement.muted = conf?.isMuted ?? false;
          if (conf?.isAutoPlay ?? true) {
            // videoElement.pause();
          }

        }

        this.anim.start()
      };

      resolve();
    });
  },

  updateVideo(selected, videoUrl) {
    let config = selected.attrs;
    if (config.type === 'audio') {
      config.audioSrc = videoUrl;
    }

    config.videoSrc = videoUrl;
    selected.destroy();
    let conf = JSON.parse(JSON.stringify(config));
   

    if (conf.type === 'audio') {
      this.addAudio(conf)
    } else {
      this.addVideo(conf);
    }

  }
}; 