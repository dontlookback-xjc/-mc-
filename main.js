import Vue from 'vue'
import App from './App'

import SocketIo from 'mcServer/socket.io/socket.io.js'


<<<<<<< HEAD
Vue.prototype.$socket=socket
=======
>>>>>>> dev
// #ifndef H5
let b=uni.getMenuButtonBoundingClientRect()

Vue.prototype.$navHeight=(b.top-uni.getSystemInfoSync().statusBarHeight+b.bottom)*2
// #endif

// #ifdef H5
Vue.prototype.$navHeight=120
// #endif


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
