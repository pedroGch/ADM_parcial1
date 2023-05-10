Vue.component('home',{
  data:function(){
    return{
          miLibroDeRecetas: [],
          ingredientesSleccionados:[],
          recetaSeleccionada: {},
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
              preparacion: `mezclar los huevos con el azúcar Hileret Light, incorporar la leche y la pizca de sal.
              Por último, agregar de a poco la harina para que no se formen grumos.
              Poner a calentar en una sartén o panquequera una cucharada de manteca, esparcir por toda la sartén para que el panqueque no se pegue.
              Luego agregar la mezcla con un cucharón (la cantidad depende del espesor que te guste) y cocinar hasta que veas que se despegan los bordes y se dora, dar vuelta y terminar la cocción.
              Algunas opciones de relleno pueden ser clásico con dulce de leche sin azúcar, mermelada de duraznos light con peras frescas, frutos rojos y todas las que te animes a probar.`,
              imagen_ruta: "/img/panqueque.jpg",
              alt: "imagen de de panqueques",
              meGusta: false
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
              preparacion: `poner a remojar en la taza de agua los hongos y picar finamente el prejil.
              Colocar en una sartén la manteca y el aceite. Cuando estén calientes, dorar la cebolla y agregar la harina; añadir revolver un rato y cuando esté todo cocido, añadir el jugo de limón, los hongos con el agua en que han estado en remojo, el perejil, y dejar cocinar 5 ó 10 minutos; si quedara  muy espesa,, agregar un poco más de caldo o agua.
              Nota: Esta salsa es muy rica para acompañar carnes o arroz blanco.
              `,
              imagen_ruta: "/img/salsa_hongos.jpg",
              alt: "imagen ilustrativa de salsa de hongos de pino",
              meGusta: false
            }
          ],
          usuario: "mabel",

          }
  },
  template:
  `
    <div class="container" id="padre">
      <div class="row justify-content-center">
        <div class="col-12">
          <h2>Bienvenida {{usuario | mayuscula}} a tu libro de recetas</h2>
        </div>
        <div class="col-12 div-h3 p-2 mt-5 d-flex">
          <div class="ps-2 pt-1">
            <img src="./img/icons/star_icon60.png" alt="icono estrella">
          </div>
          <h3>Recetas recomendadas</h3>
        </div>

        <div class="row d-flex justify-content-center ">
          <div v-for = "(receta, i) in libroDeCocina" class="col-12 col-lg-4 p-4 my-3 m-md-4 card-receta-home">
            <div class="row div-categ d-flex">
              <div class="col-5 col-sm-2">
                <div class="ps-2 pt-1">
                  <img src="./img/icons/meal_icon80.png" alt="icono cubiertos">
                </div>
              </div>
              <div class="col-7 col-sm-10 pt-4">
                <span class="p-categoria">{{receta.categoria | mayusculaPrimeraLetra}}</span>
              </div>
            </div>
            <div class="row d-flex">
              <div class="col-12 order-2 order-lg-1">
                <span class="p-nombre-receta">{{receta.nombre | mayusculaPrimeraLetra}}</span>
                  <div class="row d-flex pb-3 pe-2">
                    <div class="col-8 col-md-4 pt-4">
                      <p class="me-gusta">Me gusta</p>
                    </div>
                    <div class="col-4 col-md-7 pt-3 icono-corazon" @click="darMeGusta(i)">
                      <img v-if="receta.meGusta " src="./img/icons/heart_icon_filled.png" alt="icono corazon">
                      <img v-else src="./img/icons/heart_icon.png" alt="icono corazon">
                    </div>

                  </div>
              </div>
              <div class="col-12 p-3 order-1 order-lg-2">
                <img class="img-fluid img-card-receta" :src="receta.imagen_ruta">
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <button class="col-5 p-2 boton-card-receta" data-bs-toggle="modal" data-bs-target="#modalReceta" @click="seleccionarReceta(receta)">Ver más</button>
            </div>
          </div>
        </div>

        <div class="row justify-content-center">
        <div class="col-12 div-h3 p-2 mt-5 d-flex">
          <div class="ps-2 pt-1">
            <img src="./img/icons/star_icon60.png" alt="icono estrella">
          </div>
          <h3>Mis recetas</h3>
        </div>

        <div v-if="miLibroDeRecetas.length == 0" class="col-12 div-h3 p-2 mt-5 d-flex">
          <h3>Aún no tenes recetas cargadas</h3>
        </div>
        
        </div>
        <div class="row d-flex justify-content-center">
        <div v-for = "(receta, i) in miLibroDeRecetas" class="col-12 col-lg-4 p-4 my-3 m-md-4 card-receta-home">
          <div class="row  div-categ d-flex">
             <div class="col-5 col-sm-2">
                <div class="ps-2 pt-1">
                   <img src="./img/icons/meal_icon80.png" alt="icono cubiertos">
                </div>
              </div>
              <div class="col-7 col-sm-10 pt-4">
              <span class="p-categoria">{{receta.categoria | mayusculaPrimeraLetra}}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <span class="p-nombre-receta">{{receta.nombre | mayusculaPrimeraLetra}}</span>
            </div>
            <div class="col-6 p-3">
              <img class="img-fluid img-card-receta" :src="receta.imagen_ruta">
            </div>
          </div>
          <div class="row d-flex justify-content-center">
            <button class="col-5 p-2 boton-card-receta" data-bs-toggle="modal" data-bs-target="#modalReceta"  @click="seleccionarReceta(receta)" >Ver más</button>
          </div>
        </div>
      </div>
      </div>
      <!-- Modal -->
      <div class="modal fade" id="modalReceta" tabindex="-1" aria-labelledby="modalDeLaReceta" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalDeLaReceta">{{recetaSeleccionada.nombre}}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="reiniciarIngredientes"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-12">
                  <ul>
                    <li v-for="(ingrediente, i) in ingredientesSleccionados"> {{ingrediente.nombre}} - {{ingrediente.cantidad}} - {{ingrediente.unidad}}</li>
                  </ul>
                </div>
                <div class="col-12">
                  <p>{{recetaSeleccionada.preparacion}}</p>
                </div>
              </div>  

            </div>
            <div class="modal-footer">
              <button type="button" class="boton-card-receta" data-bs-dismiss="modal" @click="reiniciarIngredientes">Cerrar</button>
            </div>
          </div>
        </div>
      </div>

    </div>`,
  methods:{
    actualizarLibroDeRecetas:function (recetario){
      //aca voy a preguntar si hay algo en el local storage y lo actualizo
      this.miLibroDeRecetas = recetario
    },
    seleccionarReceta: function (unaReceta){
      unaReceta.ingredientes.forEach(ing => {
        this.ingredientesSleccionados.push(ing)
      })
      this.recetaSeleccionada = unaReceta;
      
    },
    reiniciarIngredientes: function (){
      this.ingredientesSleccionados = []
    },
    darMeGusta: function(indice){
      console.log(this.libroDeCocina[indice].meGusta)
      this.libroDeCocina[indice].meGusta = !this.libroDeCocina[indice].meGusta
      
    }
  },
  mounted: function(){ //al insertar al DOM    
    let jsonlibroDeRecetas = localStorage.getItem('libroDeRecetas');

    if (jsonlibroDeRecetas != undefined || jsonlibroDeRecetas != undefined){
      let libroDeRecetas = JSON.parse(jsonlibroDeRecetas)
      this.actualizarLibroDeRecetas(libroDeRecetas)
    }
  },
  filters:{
    mayuscula:function (value){
      if (!value) return "";
      return value.toUpperCase();
    },
    mayusculaPrimeraLetra: function (texto){
      if (!texto) return "";
      return texto.charAt(0).toUpperCase() + texto.slice(1)
    }
  }
  
});