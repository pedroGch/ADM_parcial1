Vue.component('form-recetas',{
  data:function(){
    return{
          unidades:[
            {"nombre": "a gusto" , "id": 0},
            {"nombre": "kg" , "id": 1},
            {"nombre": "Un" , "id": 2},
            {"nombre": "gr" , "id": 3},
            {"nombre": "lt" , "id": 4},
            {"nombre": "ml" , "id": 5},
          ],
          nombreReceta: "",
          ingredientes: [],
          nombre_ingrediente: "",
          cantidad_ingrediente: "",
          unidad_nombre: "",
          mostrar:true,
          mostrarBoton: false,
          preparacion: "",
          categoriaSeleccionada: "",
          errores: {
            "nombre": "",
            "ingredientes": "",
            "categoria": "",
            "preparacion": "",
          },
          err_nombre:"",
          err_ingredientes: "",
          err_categoria: "",
          err_preparacion: ""
    }
  },
  computed: {
    existenErrores: function(){
      return this.errores.length
    }  
  },
  template:
  `
    <div id="calificar">
      <div class="container">
        <div class= "row">
          <div class="col-12 text-center">
            <h2>Ingresar Receta</h2>
          </div>  
        </div>    

        <div class="col-12 col-sm-12 mb-3">
          <div class="form-floating">
            <input class="form-control" v-model="nombreReceta" type="text" name="nombre_receta" id="nombre_receta" placeholder="Nombre de la receta">
            <label class="form-label" for="nombre_receta">Nombre de la receta</label>
            <span>{{err_nombre}}</span>
          </div>
        </div>

        <div class="col-12 mb-3">
          <div class="form-floating">
            <select name="categoria" id="categoriaSelect" v-model="categoriaSeleccionada" class="form-select" aria-label="Categoria">
              <option selected value="Categoria">Categoria</option>
              <option>Dulces</option>
              <option>Salados</option>
              <option>Fit</option>              
            </select>
            <label for="categoriaSelect">Seleccione una categoria</label>
          </div>
          <span>{{err_categoria}}</span>
        </div>  

        <div class="row mb-3">
          <div class="col-12">
            <h2>Lista de ingredientes</h2>
          </div> 
          <ul>
            <li v-for= "(i, key) in ingredientes">
              <div class="row">
                <div class="col-6">
                  {{i.nombre}} {{i.cantidad}} {{i.unidad}}
                </div>
                <div class="col-6">
                  <button v-on:click="eliminarIngrediente(key)">x</button>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="column">
          <form v-on:submit.prevent="ingresarIngrediente" class="row" v-show="mostrar">

            <div class="col-5">
              <div class="form-floating">
                <input class="form-control"  v-model="nombre_ingrediente" type="text" name="nombre_ingrediente" id="nombre_ingrediente" placeholder="ingrediente">
                <label class="form-label" for="nombre_ingrediente">ingrediente</label>
              </div>
            </div>

            <div class="col-4">
              <div class="form-floating">
                <input class="form-control" type="number" v-model="cantidad_ingrediente" name="cantidad_ingrediente" id="cantidad_ingrediente" placeholder="cantidad">
                <label class="form-label" for="cantidad_ingrediente">cantidad</label>
              </div>
            </div>

            <div class="col-3">
              <div class="form-floating">
                <select name="unidadSelect" id="unidadSelect" v-model="unidad_nombre" class="form-select" aria-label="Categoria">
                  <option selected disabled>medida</option>
                  <option v-for = "u in unidades">{{u.nombre}}</option>
                </select>
                <label for="unidadSelect">Unidad</label>
              </div>  
            </div>            
          
            <div class="col-6 mt-3">
              <input type="submit" value="agregar ingrediente">
            </div>

            <div class="col-6 mt-3">
              <input v-on:click="limpiarCamposIngredientes" type="reset" value="cancelar">
            </div>

          </form>
          <span>{{err_ingredientes}}</span>
          <div v-if="mostrarBoton" class="col-12 mt-3">
            <button v-on:click="mostrarForm">Agregar nuevo ingrediente</button>
          </div>
        </div>  

        <div class="row">
          <div class="col-12 mt-3">
            <textarea v-model="preparacion" class="w-100" name="preparacion" placeholder="Preparación"/>
          </div>
          <span>{{err_preparacion}}</span>
        </div>
        <div class="row">
        <div class="col-12 mt-5">
          <button class="w-100" v-on:click="guardarReceta">Guardar receta</button>
        </div>
      </div>

      </div>
    </div>`,
  methods:{
    ingresarIngrediente:function () {

      ing = {}
      ing.nombre = this.nombre_ingrediente
      ing.cantidad = this.cantidad_ingrediente
      ing.unidad = this.unidad_nombre

      this.ingredientes.push(ing)

      this.mostrar = !this.mostrar
      this.mostrarBoton = !this.mostrarBoton

      this.limpiarCamposIngredientes()
    },
    mostrarForm:function () {
      this.mostrar = !this.mostrar
      this.mostrarBoton = !this.mostrarBoton
    },

    limpiarCamposIngredientes:function(){
      this.nombre_ingrediente = ""
      this.cantidad_ingrediente = ""
      this.unidad_nombre = ""
      
    },

    limpiarTodosLosCampos:function (){
      this.limpiarCamposIngredientes()
      this.categoriaSeleccionada = ""
      this.nombreReceta = ""
      this.preparacion = ""
      this.ingredientes = []

    },

    eliminarIngrediente:function (indice){
      console.log(indice)
      if (indice == 0){
        this.ingredientes.splice(indice, 1)
      }else if (indice == this.ingredientes.length){
        this.ingredientes.pop();
      }
      this.ingredientes.splice(indice, indice)

    },

    guardarReceta:function (){
      this.recetErrores();
      let receta = {
        nombre: "",
        categoria: "",
        ingredientes: [],
        preparacion: "",
        imagen_ruta: "/img/plato_comida.webp",
        alt: ""
      }
      console.log(this.validarFormulario())
      if (this.validarFormulario()){
        receta.nombre = this.nombreReceta
        receta.categoria = this.categoriaSeleccionada
        receta.ingredientes = this.ingredientes
        receta.preparacion = this.preparacion
        receta.alt = "imagen representativa de la receta " + receta.nombre
        this.actualizarLocalStorage(receta)
      }else{
        this.mostrarErrores()
      }

      
    },

    actualizarLocalStorage:function (unaReceta){
      let libroDeRecetas = [];
      let jsonlibroDeRecetas = localStorage.getItem('libroDeRecetas');
      if (jsonlibroDeRecetas != undefined){
        libroDeRecetas = JSON.parse(jsonlibroDeRecetas);
      }

      libroDeRecetas.push(unaReceta);
      localStorage.setItem('libroDeRecetas', JSON.stringify(libroDeRecetas));

      this.limpiarCamposIngredientes()
      this.limpiarTodosLosCampos()

    },
    validarFormulario: function (){
      let bandera = true
      if (this.nombreReceta == ""){
        bandera = false
        this.errores.nombre = 'El nombre de la receta es obligatorio.'
      }
      if(this.ingredientes.length <= 1 ){
        bandera = false
        this.errores.ingredientes = 'Debe ingresar más de un elemento.'
      }
      if(this.categoria == ""){
        bandera = false
        this.errores.categoria = 'Se debe seleccionar una categoria.'
      }
      if(this.preparacion == ""){
        bandera = false
        this.errores.preparacion = 'Es necesario que se describa la preparación.'
      }
      return bandera

    },
    mostrarErrores: function(){
      this.err_nombre = this.errores["nombre"]
      this.err_categoria = this.errores["categoria"]
      this.err_ingredientes = this.errores["ingredientes"]
      this.err_preparacion = this.errores["preparacion"]
    },
    recetErrores: function (){
      this.errores.nombre = ""
      this.errores.ingredientes = ""
      this.errores.categoria = ""
      this.errores.preparacion = ""
    }
  }
});