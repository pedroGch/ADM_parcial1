Vue.component('home',{
  data:function(){
    return{
          miLibroDeRecetas: [],
          libroDeCocina: [
            {
              nombre:"panqueques",
              categoria:"dulces",
              ingredientes:[
                {"nombre":"huevo", "cantidad": "3", "unidad":"Unidades"},
                {"nombre":"azúcar Hileret Light", "cantidad": "1", "unidad":"cucharada"},
                {"nombre":"lehe", "cantidad": "1", "unidad":"taza"},
                {"nombre":"harina 0000", "cantidad": "1", "unidad":"taza"},
                {"nombre":"sal", "cantidad": "1", "unidad":"pizca"}
              ],
              preparacion: `Mezclar los huevos con el azúcar Hileret Light, incorporar la leche y la pizca de sal.
              Por último, agregar de a poco la harina para que no se formen grumos.
              Poner a calentar en una sartén o panquequera una cucharada de manteca, esparcir por toda la sartén para que el panqueque no se pegue.
              Luego agregar la mezcla con un cucharón (la cantidad depende del espesor que te guste) y cocinar hasta que veas que se despegan los bordes y se dora, dar vuelta y terminar la cocción.
              Algunas opciones de relleno pueden ser clásico con dulce de leche sin azúcar, mermelada de duraznos light con peras frescas, frutos rojos y todas las que te animes a probar.`,
              imagen_ruta: "plato_comida.webp",
              alt: ""
            },
            {
              nombre:"salsa de hongos de pino",
              categoria:"salados",
              ingredientes: [
                {"nombre": "cebolla", "cantidad": "1", "unidad": "unidad"},
                {"nombre": "manteca", "cantidad": "25", "unidad": "gr"},
                {"nombre": "aceite", "cantidad": "2", "unidad": "cucharada"},
                {"nombre": "harina", "cantidad": "1", "unidad": "cucharada"},
                {"nombre": "agua caliente", "cantidad": "1", "unidad": "taza"},
                {"nombre": "hongos de pino", "cantidad": "30", "unidad": "gr"},
                {"nombre": "perejil", "cantidad": "1", "unidad": "cucharada"},
                {"nombre": "jugo de limon", "cantidad": "1", "unidad": "cucharada"},
                {"nombre": "sal", "cantidad": "15", "unidad": "gr"},
                {"nombre": "pimienta", "cantidad": "1", "unidad": "cucharadita"},
                {"nombre": "mostaza", "cantidad": "1", "unidad": "cucharada"}
              ],
              preparacion: `Poner a remojar en la taza de agua los hongos y picar finamente el prejil.
              Colocar en una sartén la manteca y el aceite. Cuando estén calientes, dorar la cebolla y agregar la harina; añadir revolver un rato y cuando esté todo cocido, añadir el jugo de limón, los hongos con el agua en que han estado en remojo, el perejil, y dejar cocinar 5 ó 10 minutos; si quedara  muy espesa,, agregar un poco más de caldo o agua.
              Nota: Esta salsa es muy rica para acompañar carnes o arroz blanco.
              `,
              imagen_ruta: "./img/lato_comida.webp",
              alt: ""
            }
          ],
          usuario: "Mabel",

          }
  },
  template:
  `
    <div class="container" id="padre">
      <div class="row">
        <div class="col-12">
          <h2>Bienvenida {{usuario}} a tu libro de recetas</h2>
        </div>

        <div class="row">
          <div class="col-12">
            <h3>Recetas recomendadas</h3>
          </div>
          <div v-for = "(receta, i) in libroDeCocina" class="col-12 col-lg-4">
            <div class="row">
              <div class="col-12">
                <span>{{receta.categoria}}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <span>{{receta.nombre}}</span>
              </div>
              <div class="col-6">
                <img class="img-fluid" src="./img/plato_comida.webp"">
              </div>
            </div>
            <div class="row">
              <button class="col-12">Ver más</button>
            </div>
          </div>
        </div>

        <div class="row">
        <div class="col-12">
          <h3>Mis recetas</h3>
        </div>
        <div v-for = "(receta, i) in miLibroDeRecetas" class="col-12 col-lg-4">
          <div class="row">
            <div class="col-12">
              <span>{{receta.categoria}}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <span>{{receta.nombre}}</span>
            </div>
            <div class="col-6">
              <img class="img-fluid" src="./img/plato_comida.webp">
            </div>
          </div>
          <div class="row">
            <button class="col-12">Ver más</button>
          </div>
        </div>
      </div>
      </div>


    </div>`,
  methods:{
    actualizarLibroDeRecetas:function (recetario){
      //aca voy a preguntar si hay algo en el local storage y lo actualizo
      this.miLibroDeRecetas = recetario
    }
  },
  mounted: function(){ //al insertar al DOM
    let jsonlibroDeRecetas = localStorage.getItem('libroDeRecetas');
    console.log(jsonlibroDeRecetas)

    if (jsonlibroDeRecetas != undefined || jsonlibroDeRecetas != undefined){
      let libroDeRecetas = JSON.parse(jsonlibroDeRecetas)
      this.actualizarLibroDeRecetas(libroDeRecetas)
    }
  },
});