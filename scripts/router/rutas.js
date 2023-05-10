const principal = {template: `<home></home>`, name:"principal"}
const ingresar_recetar = {template: `<form-recetas></form-recetas>`, name:"ingresar_recetar"}

const routes = [
  { path: '/', component: principal },
  { path: '/home', component: principal },
  { path: '/ingresar_recetar', component: ingresar_recetar },
  { path: '*', redirect: '/' }

]

const router = new VueRouter({
  routes
})

const app = new Vue({
	el:"#app",
  	router,

})

