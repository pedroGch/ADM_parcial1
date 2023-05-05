Vue.component('home',{
  data:function(){
    return{
          dato_padre:"DATO DEL PADRE",
          elemento:"Dato inicial",
          }
  },
  template:
  `
    <div id="padre">
      <h2>Componente Principal</h2>
        <p>Valor del padre: <span> {{ dato_padre }} </span></p>
        <p>Variable de padre/hijo: <span> {{ elemento}} </span></p>
    </div>`
});