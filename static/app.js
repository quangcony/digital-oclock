
const hour = document.querySelector('#hour')
const minute = document.querySelector('#minute')
const second = document.querySelector('#second')

const btnToggle = document.querySelector('#btn-toggle-fullscreen')

let interval

const app = {

    countDown: function () {
        interval = setInterval(() => {
            this.getTimer()
        }, 1000);
    },

    getTimer: function () {

        let date = new Date()

        // get and set hour
        let h = 24 - date.getHours()
        // get and set minute
        let m = 60 - date.getMinutes()
        h = (m > 0) ? --h : h
        h = (h + '').length == 1 ? ('0' + h) : h

        // get and set second
        let s = 60 - date.getSeconds()
        m = (s > 0) ? --m : m
        m = (m + '').length == 1 ? ('0' + m) : m
        s = (s + '').length == 1 ? ('0' + s) : s
        
        let isMinHour =  (h == '00') ? true : false
        isMinHour && (hour.style.display = 'none')

        hour.textContent = h + ':'
        minute.textContent = m + ':'
        second.textContent = s

    },

    toggleFullScreen: function () {

        var doc = document;
        var docEl = doc.documentElement;

        var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
            requestFullScreen.call(docEl);
            btnToggle.classList.add('isFull')
        }
        else {
            cancelFullScreen.call(doc);
            btnToggle.classList.remove('isFull')
        }
    },

    init: function () {

        this.countDown()

        const elem = document.documentElement

        document.onkeyup = (e) => {
            if(e.key === 'f') {
               this.toggleFullScreen()
            }
        }

        btnToggle.onclick = () => {
            this.toggleFullScreen()
        }

        document.addEventListener('dblclick', () => {
            this.toggleFullScreen()
        })

    }

}

app.init()
