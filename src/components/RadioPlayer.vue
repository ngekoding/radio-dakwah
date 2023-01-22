<script setup>
import { ref, computed } from 'vue'
import stations from '@/data/stations.json'
import { usePlayer } from '@/composables/player'

const {
  playlist,
  playing,
  playingError,
  playingIndex,
  playingStation,
  togglePlay,
  prev,
  next
} = usePlayer(stations)

const showPlaylist = ref(true)
const allowPrev = computed(() => playingIndex.value > 0)
const allowNext = computed(() => playingIndex.value < playlist.value.length - 1)
</script>

<template>
  <div class="radio-player">
    <header>
     <div class="thumbnail">
      <div class="playing-indicator" :class="{ running: playing }"></div>
      <div class="image">
        <img src="/thumbnail.jpg" />
      </div>
     </div>
    </header>
    <div class="playing">
      <div class="playing-title">
        <material-icon
          name="keyboard_voice"
          type="outlined"
          size="14" />
        <span>Sedang Mendengarkan</span>
      </div>
      <div class="playing-station">
        <h3 class="playing-station--name">{{ playingStation.name + ' ' + playingStation.frequency }}</h3>
        <p class="playing-station--slogan">{{ playingStation.slogan }}</p>
      </div>
      <p v-if="playingError" class="playing-error">Stasiun sedang tidak tersedia.</p>
      <!-- <div class="playing-actions">
        <button class="playing-actions--share">
          <material-icon name="share" type="rounded" />
        </button>
        <button class="playing-actions--favorite">
          <material-icon name="favorite_border" type="rounded" />
        </button>
      </div> -->
    </div>
    <div class="controls">
      <button
        class="controls--prev"
        :disabled="!allowPrev"
        @click="prev()">
        <material-icon
          name="skip_previous"
          type="rounded"
          size="32" />
      </button>
      <button class="controls--play" @click="togglePlay()">
        <material-icon
          :name="playing ? 'stop' : 'play_arrow'"
          type="rounded"
          size="32" />
      </button>
      <button
        class="controls--prev"
        :disabled="!allowNext"
        @click="next()">
        <material-icon
          name="skip_next"
          type="rounded"
          size="32" />
      </button>
    </div>
    <div class="playlist">
      <div class="playlist-toggle">
        <button @click="showPlaylist = !showPlaylist">
          <material-icon
            :name="showPlaylist ? 'expand_more' : 'expand_less'"
            type="rounded" />
        </button>
      </div>
      <h5 class="playlist-title">Daftar Stasiun Radio</h5>
      <ul v-if="showPlaylist" class="station-list">
        <li
          v-for="(station, index) in playlist"
          :key="'station-' + index"
          class="station-item"
          :class="{ active: playingIndex === index }">
          <div class="station-item-info">
            <div class="station-name">{{ station.name + ' ' + station.frequency  }}</div>
            <div class="station-slogan">{{ station.slogan }}</div>
          </div>
          <div class="station-item-actions">
            <button class="station-item-actions--play" @click="togglePlay(index)">
              <material-icon
                :name="playing && playingIndex === index ? 'stop' : 'play_arrow'"
                type="rounded" />
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>