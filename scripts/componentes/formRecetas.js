Vue.component('form-recetas',{
  data:function(){
    return{
          sombraError:false,
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
          err_preparacion: "",
          imagen_receta: null
    }
  },
  computed: {
    existenErrores: function(){
      return this.errores.length
    }  
  },
  template:
  `
    <div id="calificar" class="d-flex justify-content-center mb-4">
      <div class="container card-ingresar-receta p-4 mx-2">
        <div class= "row">
          <div class="col-12 text-center pb-3">
            <h2>Ingresar Receta</h2>
          </div>  
        </div>    

        <div class="col-12 col-sm-12 mb-3">
          <div class="form-floating">
            <input :class="{sombraError:sombraError}"  class="form-control" v-model="nombreReceta" type="text" name="nombre_receta" id="nombre_receta" placeholder="Nombre de la receta">
            <label class="form-label" for="nombre_receta">Nombre de la receta</label>
      
            <span class="textoError">{{err_nombre}}</span>
          </div>
        </div>

        <div  :class="{sombraError:sombraError}"  class="col-12 mb-3">
          <div class="form-floating">
            <select name="categoria" id="categoriaSelect" v-model="categoriaSeleccionada" class="form-select" aria-label="Categoria">
              <option selected value="Categoria">Categoria</option>
              <option>Dulces</option>
              <option>Salados</option>
              <option>Fit</option>              
            </select>
            <label for="categoriaSelect">Seleccione una categoria</label>
          </div>
    
          <span class="textoError">{{err_categoria}}</span>
        </div>  

        <div class="container-carga-individual p-3 py-4">
          <div class="row mb-3">
            <div class="col-12">
              <h2 class="h2-form" >Lista de ingredientes</h2>
            </div>
            <div class="d-flex justify-content-center p-3">
              <ul>
                <li v-for= "(i, key) in ingredientes">
                  <div class="row">
                    <div class="col-10 p-2">
                      {{i.nombre}} {{i.cantidad}} {{i.unidad}}
                    </div>
                    <div class="col-2">
                      <button class="boton-formulario p-1" v-on:click="eliminarIngrediente(key)">x</button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="column">
            <form  :class="{sombraError:sombraError}" v-on:submit.prevent="ingresarIngrediente" class="row" v-show="mostrar">
              <div class="col-12 col-md-5  mt-2">
                <div class="form-floating">
                  <input class="form-control"  v-model="nombre_ingrediente" type="text" name="nombre_ingrediente" id="nombre_ingrediente" placeholder="ingrediente">
                  <label class="form-label" for="nombre_ingrediente">ingrediente</label>
                </div>
              </div>
              <div class="col-6 col-md-4 mt-2">
                <div class="form-floating">
                  <input class="form-control" type="number" v-model="cantidad_ingrediente" name="cantidad_ingrediente" id="cantidad_ingrediente" placeholder="cantidad">
                  <label class="form-label" for="cantidad_ingrediente">cantidad</label>
                </div>
              </div>
              <div class="col-6 col-md-3  mt-2">
                <div class="form-floating">
                  <select name="unidadSelect" id="unidadSelect" v-model="unidad_nombre" class="form-select" aria-label="Categoria">
                    <option selected disabled>medida</option>
                    <option v-for = "u in unidades">{{u.nombre}}</option>
                  </select>
                  <label for="unidadSelect">Unidad</label>
                </div>
              </div>
          
              <div class="d-flex">
                <div class="flex-shrink col-7 mt-3 d-flex justify-content-center">
                  <input type="submit" value="agregar ingrediente" class="boton-formulario">
                </div>
                <div class="col-5 mt-3 d-flex justify-content-center">
                  <input v-on:click="limpiarCamposIngredientes" type="reset" value="cancelar"  class="boton-formulario">
                </div>
              </div>
            </form>
      
            <span class="textoError">{{err_ingredientes}}</span>
            <div v-if="mostrarBoton" class="col-12 mt-3 d-flex justify-content-center">
              <button v-on:click="mostrarForm" class="boton-formulario">Agregar nuevo ingrediente</button>
            </div>
          </div>
        </div>

        <div class="row container-carga-individual p-3 py-4 mt-3 mx-1">
        <div class="col-12 p-3">
              <h2 class="h2-form">Preparación</h2>
            </div>
          <div class="col-12 mt-3">
            <textarea :class="{sombraError:sombraError}" v-model="preparacion" class="w-100" name="preparacion" placeholder="Preparación"/>
      
            <span class="textoError">{{err_preparacion}}</span>
          </div>
        </div>
        <div class="col-12 mt-5 d-flex justify-content-center">
          <input type="file" @change="subirImagen($event)">
        </div>
        
        <div class="row">
        <div class="col-12 mt-5 d-flex justify-content-center pb-4">
          <button class="boton-formulario" v-on:click="guardarReceta">Guardar receta</button>
        </div>
      </div>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="modalCartelExito" tabindex="-1" aria-labelledby="modalDeExito" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <div class="row">
                <div class="col-12">
                  <p>Tu receta fue cargada con exito</p>
                </div>
              </div>  

            </div>
            <div class="modal-footer">
              <button type="button" class="boton-card-receta" data-bs-dismiss="modal">Cerrar</button>
            </div>
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
        imagen_ruta: null,
        alt: ""
        
      }
  
      if (this.validarFormulario()){
        receta.nombre = this.nombreReceta
        receta.categoria = this.categoriaSeleccionada
        receta.ingredientes = this.ingredientes
        receta.preparacion = this.preparacion
        receta.alt = "imagen representativa de la receta " + receta.nombre
        if (this.imagen_receta){
          receta.imagen_ruta = this.imagen_receta
        }else{
          receta.imagen_ruta = "/img/receta-predeterminada.jpg"
        }
        this.actualizarLocalStorage(receta)
        this.mostrarCartelExito()
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
      if(this.categoriaSeleccionada == ""){
        bandera = false
        this.errores.categoria = 'Se debe seleccionar una categoria.'
      }
      if(this.preparacion == ""){
        bandera = false
        this.errores.preparacion = 'Es necesario que se describa la preparación.'
      }
      this.sombraError = !bandera
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
      this.err_nombre = ""
      this.err_categoria = ""
      this.err_ingredientes = ""
      this.err_preparacion = ""
      this.sombraError = false
    },
    subirImagen:function (file){

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file.target.files[0])

      fileReader.onload = (event) => {
        this.imagen_receta = event.target.result
        
      };
    },
    mostrarCartelExito: function(){
      let cartelModal = new bootstrap.Modal(document.getElementById("modalCartelExito"), {backdrop: 'static', keyboard: false});
      cartelModal.show();
      setTimeout(() => {
        cartelModal.hide();
      }, 5000);
    }
  }
});