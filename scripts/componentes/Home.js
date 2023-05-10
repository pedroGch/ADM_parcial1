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
              imagen_ruta: "/img/plato_comida.webp",
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
              imagen_ruta: "/img/plato_comida.webp",
              alt: ""
            }
          ],
          usuario: "mabel",

          }
  },
  template:
  `
    <div class="container" id="padre">
      <div class="row">
        <div class="col-12">
          <h2>Bienvenida {{usuario | mayuscula}} a tu libro de recetas</h2>
        </div>
        <div class="col-12 div-h3 p-2 mt-5 d-flex">
          <div class="ps-2 pt-1">
            <img src="./img/icons/star_icon60.png" alt="icono estrella">
          </div>
          <h3>Recetas recomendadas</h3>
        </div>

        <div class="row d-flex justify-content-center">
          <div v-for = "(receta, i) in libroDeCocina" class="col-12 col-lg-4 p-4 m-4 card-receta-home">
            <div class="row div-categ d-flex">
              <div class="col-2">
                <div class="ps-2 pt-1">
                   <img src="./img/icons/meal_icon80.png" alt="icono cubiertos">
                </div>
              </div>
              <div class="col-10 pt-4">
                <span class="p-categoria">{{receta.categoria}}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <span class="p-nombre-receta">{{receta.nombre}}</span>
                  <div class="row d-flex">
                    <div class="col-4 pt-4 ms-3">
                      <p class="me-gusta">Me gusta</p>
                    </div>
                    <div class="col-7 pt-3">
                      <img src="./img/icons/heart_icon.png" alt="icono estrella">
                    </div>
                  </div>
              </div>
              <div class="col-6 p-3">
                <img class="img-fluid img-card-receta" :src="receta.imagen_ruta">
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <button class="col-5 p-2 boton-card-receta">Ver más</button>
            </div>
          </div>
        </div>

        <div class="row">
        <div class="col-12 div-h3 p-2 mt-5 d-flex">
          <div class="ps-2 pt-1">
            <img src="./img/icons/star_icon60.png" alt="icono estrella">
          </div>
          <h3>Mis recetas</h3>
        </div>
        </div>
        <div class="row d-flex justify-content-center">
        <div v-for = "(receta, i) in miLibroDeRecetas" class="col-12 col-lg-4 p-4 m-4 card-receta-home">
          <div class="row  div-categ d-flex">
             <div class="col-2">
                <div class="ps-2 pt-1">
                   <img src="./img/icons/meal_icon80.png" alt="icono cubiertos">
                </div>
              </div>
              <div class="col-10 pt-4">
              <span class="p-categoria">{{receta.categoria}}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <span class="p-nombre-receta">{{receta.nombre}}</span>
            </div>
            <div class="col-6 img-card-receta">
              <img class="img-fluid" :src="receta.imagen_ruta">
            </div>
          </div>
          <div class="row d-flex justify-content-center">
            <button class="col-5 p-2 boton-card-receta">Ver más</button>
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
  filters:{
    mayuscula:function (value){
      if (!value) return "";
      return value.toUpperCase();
    }
  }
});