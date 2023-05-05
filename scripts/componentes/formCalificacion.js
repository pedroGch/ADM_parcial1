Vue.component('form-calificacion',{
  data:function(){
    return{
          dato_padre:"mis datos",
          elemento:"Dato inicial",
          }
  },
  template:
  `
    <div id="calificar">
      <h2>Componente formCalificar</h2>
        <p>Valor del padre: <span> {{ dato_padre }} </span></p>
        <p>Variable de padre/hijo: <span> {{ elemento}} </span></p>
    </div>`
});