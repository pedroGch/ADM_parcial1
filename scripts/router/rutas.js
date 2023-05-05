const inicio = { template: `
 			<div>
				<h1>inicio</h1> 
			</div>`, name:'inicio' 
}
const principal = {template: `<home></home>`, name:"principal"}
const calificar = {template: `<form-calificacion></form-calificacion>`, name:"calificar"}

const routes = [
  { path: '/', component: inicio },
  { path: '/home', component: principal },
  { path: '/calificar', component: calificar },
  { path: '*', redirect: '/' }

]

const router = new VueRouter({
  routes
})

const app = new Vue({
	el:"#app",
  	router,

})

