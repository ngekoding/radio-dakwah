import { ref, computed } from 'vue'
import { Howl, Howler } from 'howler'

Howler.volume(1)

export function usePlayer(stations) {
  const playlist = ref([])
  const playing = ref(false)
  const playingIndex = ref(0)
  const playingStation = computed(() => playlist.value[playingIndex.value])
  const playingState = computed(() => playingStation.value?.howl?.state())
  const playingError = ref(false)

  stations.forEach(station => {
    playlist.value.push({
      ...station,
      howl: null
    })
  })

  function play(index) {
    playingError.value = false

    // Stop current
    stop()

    let sound
    const soundIndex = index ?? playingIndex.value
    const data = playlist.value[soundIndex]
    
    if (data.howl) {
      sound = data.howl
    } else {
      sound = new Howl({
        src: data.url,
        html5: true,
        format: ['mp3', 'aac']
      })

      playlist.value[soundIndex].howl = sound
    }

    sound.on('playerror', () => {
      playingError.value = true
      playlist.value[soundIndex].howl = null
    })

    sound.on('loaderror', () => {
      playingError.value = true
      playlist.value[soundIndex].howl = null
    })

    if (sound.state() === 'unloaded') {
      sound.load()
      sound.on('load', () => sound.play())
    } else {
      sound.play()
    }

    playing.value = true
    playingIndex.value = soundIndex
  }

  function stop() {
    playing.value = false
    switch (playingState.value) {
      case 'loaded':
        playingStation.value.howl.stop()
        break;
      case 'loading':
        playingStation.value.howl.unload()
        break;
    }
  }

  function prev() {
    play(playingIndex.value - 1)
  }

  function next() {
    play(playingIndex.value + 1)
  }

  function togglePlay(index) {
    const soundIndex = index ?? playingIndex.value
    if (playing.value && playingIndex.value == soundIndex) {
      stop()
    } else {
      play(soundIndex)
    }
  }

  return {
    playlist,
    playing,
    playingError,
    playingIndex,
    playingStation,
    play,
    stop,
    prev,
    next,
    togglePlay
  }
}