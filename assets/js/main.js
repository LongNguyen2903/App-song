const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.player');
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const cd = $('.cd')
const audio = $('#audio')
const playlist = $('.playlist')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')

const app = {
   currentIndex:0,
   isRandom:false,
   isPlaying:false,
   songs: [
    {
        name:'BoEmVaoBalo',
        singer:'Tân Trần',
        path:'/assets/music/BoEmVaoBalo.mp3',
        image:'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/9/2/d/1/92d1087e7b366b4cf7d1539d37e5f610.jpg'
    },
    {
        name:'ChuyenRang',
        singer:'Thịnh Suy',
        path:'/assets/music/ChuyenRang.mp3',
        image:'https://avatar-ex-swe.nixcdn.com/song/share/2020/08/07/9/3/d/3/1596786879179.jpg'
    },
    {
        name:'DuChoMaiVeSau',
        singer:'Bùi Trường Linh',
        path:'/assets/music/DuChoMaiVeSau.mp3',
        image:'https://i.scdn.co/image/ab67616d0000b273d08e312c1749467b13f34608'
    },
    {
        name:'DuongTaChoEmVe',
        singer:'Bùi Trường Linh',
        path:'/assets/music/DuongTaChoEmVe.mp3',
        image:'https://i.ytimg.com/vi/9W5Aw04YhwM/sddefault.jpg'
    },
    {
        name:'GacLaiAuLo',
        singer:'Da Lab, Miu lê',
        path:'/assets/music/GacLaiAuLo.mp3',
        image:'https://i.scdn.co/image/ab67616d0000b273dd2af0ac13dc6769fab11178'
    },
    {
        name:'PhaiChangEmDaYeu',
        singer:'Juky San',
        path:'/assets/music/PhaiChangEmDaYeu.mp3',
        image:'https://i.ytimg.com/vi/luAD0aMPCcc/maxresdefault.jpg'
    },
    {
        name:'SinhRaDaLaThuDoiLap',
        singer:'Da Lab',
        path:'/assets/music/SinhRaDaLaThuDoiLap.mp3',
        image:'https://i1.sndcdn.com/artworks-cUmt57zAn6PlI3XR-z4UCHQ-t500x500.jpg'
    },
    {
        name:'ThangNam',
        singer:'Soobin Hoàng Sơn',
        path:'/assets/music/ThangNam.mp3',
        image:'https://media.blogradio.vn/Upload/CMS/Nam_2014/Thang_5/Ngay_7/Images/viet-cho-thang-5.jpg'
    }, {
        name:'ThichEmHoiNhieu',
        singer:'Wren Evans',
        path:'/assets/music/ThichEmHoiNhieu.mp3',
        image:'https://avatar-ex-swe.nixcdn.com/song/2021/06/18/d/c/e/c/1623997610871_640.jpg'
    },
    {
        name:'TuThichThanhThuong',
        singer:'Amee, Hoàng Dũng',
        path:'/assets/music/TuThichThichThanhThuongThuong.mp3',
        image:'https://i1.sndcdn.com/artworks-RUQZpaOBvPN0EwFP-kyhRCw-t500x500.jpg'
    },

   ],
        // Render playlist 
   
   render: function(){
    const htmls = this.songs.map(song =>{
        return `
        <div class="song">
        <div class="thumb" style="background-image: url('${song.image}')">
        </div>
        <div class="body">
          <h3 class="title">${song.name}</h3>
          <p class="author">${song.singer} </p>
        </div>
        <div class="option">
          <i class="fas fa-ellipsis-h"></i> 
        </div>
      </div>
        `
    })

    $('.playlist').innerHTML = htmls.join('')

   },
        // định nghĩa các thuộc tính cho object

   defineProperties: function(){
        Object.defineProperty(this ,'currentSong',{
            get:function(){
                return this.songs[this.currentIndex]
            }
        })
       
   },
        // lắng nghe / xử lý các sự kiện

   handleEvents: function(){
       const _this = this
       const cdWidth = cd.offsetWidth

        // xử lý cd quay và dừng

        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration:10000,
            iteration: Infinity
        })
        cdThumbAnimate.pause()
        // xử lý phóng to thu nhỏ
        
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ?  newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
       }
       // xử lý khi click play
       playBtn.onclick = function(){    
           if( _this.isPlaying){
            audio.pause()
           } else{
            audio.play()
           }
       }

       // Khi bài hát được play 
        audio.onplay = function(){   
            _this.isPlaying=true
            player.classList.add('playing')
            cdThumbAnimate.play()
       }
         // Khi bài hát được pause
        audio.onpause = function(){   
            _this.isPlaying=false
            player.classList.remove('playing')
            cdThumbAnimate.pause()

       }

       // khi tiến độ bài hát thay đổi
       audio.ontimeupdate = function(){ 
           if (audio.duration){
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
           }
       }    
       // tua bài hát
       progress.onchange = function(e){
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
       }
       // khi next bài hát
       nextBtn.onclick= function(){
           if(_this.isRandom){
               _this.playRandomSong()
           } else {
               _this.nextSong()
            }
           audio.play()
       }
        // khi prev bài hát
        prevBtn.onclick= function(){
            if(_this.isRandom){
                _this.playRandomSong()
            } else {
                _this.prevSong()
             }
            audio.play()
        }
        // khi random bài hát
        randomBtn.onclick = function(e){    
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom)
           
        }
   },
        // tải thông tin bài hát đầu tiên

   loadCurrentSong:function(){
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path

   },
   nextSong:function(){
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
   },
   prevSong:function(){
        this.currentIndex--
        if(this.currentIndex < 0){
        this.currentIndex = this.songs.length - 1
    }
    this.loadCurrentSong()
    },
    
    playRandomSong:function(){
        let newIndex
        do{
            newIndex = Math.floor(Math.random() * this.songs.length) 
        }    
        while(newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    start: function(){
        // định nghĩa các thuộc tính cho object
        this.defineProperties()
        // lắng nghe / xử lý các sự kiện
        this.handleEvents()
        // tải thông tin bài hát đầu tiên
        this.loadCurrentSong()
        // Render playlist 
        this.render()
   }
   
}
    app.start()