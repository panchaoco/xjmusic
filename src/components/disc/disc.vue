<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import { mapGetters } from 'vuex'
  import { getSongList } from 'api/recommend'
  import { ERR_OK } from 'api/config'
  import { createSong } from 'common/js/song'

  export default {
    computed: {
      title() {
        return this.disc.dissname ? this.disc.dissname : this.$route.query.dissname
      },
      bgImage() {
        return this.disc.imgurl ? this.disc.imgurl : this.$route.query.imgurl
      },
      ...mapGetters([
        'disc'
      ])
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getSongList()
    },
    methods: {
      _getSongList() {
        let dissid
        if (!this.disc.dissid) {
          dissid = this.$route.params.id
          if (!dissid) {
            dissid = this.$route.query.dissid
          }
        } else {
          dissid = this.disc.dissid
        }

        getSongList(dissid).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._noramlizeSongs(res.cdlist[0].songlist)
          }
        })
      },
      _noramlizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albumid) {
              ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0px, 0px)
</style>
