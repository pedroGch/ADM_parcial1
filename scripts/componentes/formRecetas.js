Vue.component('form-recetas',{
  data:function(){
    return{
          unidades:[
            {"nombre": "kg" , "id": 1},
            {"nombre": "Un" , "id": 2},
            {"nombre": "gr" , "id": 3},
            {"nombre": "ltr" , "id": 4}
          ],
          nombreReceta: "",
          ingredientes: [],
          nombre_ingrediente: "",
          cantidad_ingrediente: 0,
          unidad_nombre: 0,
          mostrar:true,
          mostrarBoton: false
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
          </div>
        </div>

        <div class="col-12 mb-3">
          <select name="categoria">
            <option>Dulces</option>
            <option>Salados</option>
            <option>Fit</option>
          </select>
        </div>  

        <div class="row mb-3">
          <div class="col-12">
            <h2>Lista de ingredientes</h2>
          </div> 
          <ul>
            <li v-for= "i in ingredientes">
              {{i.nombre}} {{i.cantidad}} {{i.unidad}}
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
              <select name="categoria" v-model="unidad_nombre">
                <option v-for = "u in unidades">{{u.nombre}}</option>
              </select>
            </div>            
          
            <div class="col-6 mt-3">
              <input type="submit" value="agregar ingrediente">
            </div>

            <div class="col-6 mt-3">
              <input v-on:click="limpiarCampos" type="reset" value="cancelar">
            </div>
          </form>

          <div v-if="mostrarBoton" class="col-12 mt-3">
            <button v-on:click="mostrarForm">Agregar nuevo ingrediente</button>
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

      this.limpiarCampos
    },
    mostrarForm:function () {
      this.mostrar = !this.mostrar
      this.mostrarBoton = !this.mostrarBoton
    },

    limpiarCampos:function(){
      this.nombre_ingrediente = ""
      this.cantidad_ingrediente = 0
      this.unidad_nombre = ""
    }
  }  
});