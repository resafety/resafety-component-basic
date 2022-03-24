import Main from './Index.vue'

Main.install = Vue => {
if (!Vue) {
window.Vue = Vue
}
Vue.component(Main.name, Main)
}
export default Main;
