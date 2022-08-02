import Vue from 'nativescript-vue'

import Home from './components/Home'
import { LoginManager } from '@nativescript/facebook';
LoginManager.init();

new Vue({
  render: (h) => h('frame', [h(Home)]),
}).$start()
