<template>
  <div class="encriptar-datos-container">
    <!-- Añadir el área de texto para el nombre -->
    <input v-model="nombre" placeholder="Nombre" class="datos-input" />

    <!-- Añadir el área de texto para el apellido -->
    <input v-model="apellido" placeholder="Apellido" class="datos-input" />

    <!-- Añadir el área de texto para el correo electrónico -->
    <input v-model="correo" placeholder="Correo Electrónico" class="datos-input" @input="validarCorreo" />

    <!-- Añadir el área de texto para la dirección de vivienda -->
    <input v-model="direccion" placeholder="Dirección de Vivienda" class="datos-input" />

    <!-- Añadir el área de texto para el código postal -->
    <input v-model="codigoPostal" placeholder="Código Postal" class="datos-input" @input="validarCodigoPostal" />

    <!-- Añadir el área de texto para el número de teléfono -->
    <input v-model="telefono" placeholder="Número de Teléfono (+123 456 789)" class="datos-input" @input="validarTelefono" />

    <!-- Añadir el área de texto para la fecha de nacimiento -->
    <input
      v-model="fechaNacimiento"
      placeholder="Fecha de Nacimiento (YYYY-MM-DD)"
      class="datos-input"
      @input="validarFechaNacimiento"
    />

    <!-- Añadir el botón para encriptar -->
    <button @click="encriptar" class="encriptar-btn">Encriptar</button>

    <!-- Añadir el botón para hashear -->
    <button @click="hashear" class="encriptar-btn">Hashear</button>

    <!-- Mostrar mensajes de error -->
    <div v-if="errorDatosVacios || errorFormatoCorreo || errorFormatoCampos" class="error-container">
      <p v-if="errorDatosVacios" class="mensaje-error">Por favor, rellene todos los campos.</p>
      <p v-if="errorFormatoCorreo" class="mensaje-error">Formato de correo electrónico inválido.</p>
      <p v-if="errorFormatoCampos" class="mensaje-error">Formato incorrecto en el campo: {{ campoError }}.</p>
    </div>

    <!-- Mostrar el resultado de la encriptación o hasheo -->
    <div v-if="datosEncriptados || datosHasheados" class="resultado-container">
      <p class="resultado-label">Datos Encriptados o Hasheados:</p>
      <code class="resultado-codigo">{{ datosEncriptados || datosHasheados }}</code>
    </div>

    <div v-if="mostrarExplicacionEncriptar" class="explicacion-container">
    <!-- Razones para la Elección de AES256 para Encriptar Datos Personales -->
    <p class="subtitulo" style="font-size: 18px; font-weight: bold;">Se ha escogido AES-256 para encriptar datos personales:</p>
    <p>
      AES (Advanced Encryption Standard) es un algoritmo de cifrado simétrico ampliamente adoptado y considerado seguro. La elección de AES-256 para encriptar datos de tarjetas de crédito se detallará en la conclusión final, a la cual se recomienda acceder una vez se haya revisado todas las otras secciones.  </p>
  </div>

<!-- Añadir sección de explicación para hashear -->
<div v-if="mostrarExplicacionHashear" class="explicacion-container">
  <p class="subtitulo" style="font-size: 18px; font-weight: bold;">Se ha escogido SHA-256 para hashear datos personales:</p>
  <p>
  SHA-256 es una función hash criptográfica ampliamente utilizada que produce una salida de 256 bits. La elección de SHA-256 para hashear datos personales se detallará en la conclusión final, a la cual se recomienda acceder una vez se haya revisado todas las otras secciones.
  </p>
</div>
</div>

</template>

<script>
import apiService from './apiService';

export default {
  data() {
    return {
      nombre: '',
      apellido: '',
      correo: '',
      direccion: '',
      codigoPostal: '',
      telefono: '',
      fechaNacimiento: '',
      datosEncriptados: '',
      datosHasheados: '',
      errorDatosVacios: false,
      errorFormatoCorreo: false,
      errorFormatoCampos: false,
      camposConError: [],
      mostrarExplicacionEncriptar: false,
      mostrarExplicacionHashear: false,
    };
  },
  methods: {
    encriptar() {
      // Verificar si los campos obligatorios están llenos
      if (
        !this.nombre ||
        !this.apellido ||
        !this.correo ||
        !this.direccion ||
        !this.codigoPostal ||
        !this.telefono ||
        !this.fechaNacimiento
      ) {
        this.errorDatosVacios = true;
        this.errorFormatoCorreo = false;
        this.errorFormatoCampos = false;
        this.camposConError = [];
        this.mostrarExplicacionEncriptar = false;
        this.mostrarExplicacionHashear = false;
        return;
      }

      // Verificar el formato del correo electrónico
      if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(this.correo)) {
        this.errorDatosVacios = false;
        this.errorFormatoCorreo = true;
        this.errorFormatoCampos = false;
        this.camposConError = ['Correo Electrónico'];
        this.mostrarExplicacionEncriptar = false;
        this.mostrarExplicacionHashear = false;
        return;
      }

      // Verificar el formato de los campos
      if (this.tieneFormatoIncorrecto()) {
        this.errorDatosVacios = false;
        this.errorFormatoCorreo = false;
        this.errorFormatoCampos = true;
        this.camposConError = this.obtenerCamposConError();
        this.mostrarExplicacionEncriptar = false;
        this.mostrarExplicacionHashear = false;
        return;
      }

      // Limpiar mensajes de error
      this.errorDatosVacios = false;
      this.errorFormatoCorreo = false;
      this.errorFormatoCampos = false;
      this.camposConError = [];

    const datos = {
    nombre: this.nombre,
    apellido: this.apellido,
    correo: this.correo,
    direccion: this.direccion,
    codigoPostal: this.codigoPostal,
    telefono: this.telefono,
    fechaNacimiento: this.fechaNacimiento
  };

  // Llamar al método encriptarData de apiService.js
  apiService.encriptarData(datos)
    .then(response => {
      // Manejar la respuesta del backend (datos encriptados)
      this.datosEncriptados = response.data;
    })
    .catch(error => {
      // Manejar errores
      console.error(error);
    });
      // Mostrar explicación para encriptar
      this.mostrarExplicacionEncriptar = true;
      this.mostrarExplicacionHashear = false;
    },
    hashear() {
      // Verificar si los campos obligatorios están llenos
      if (
        !this.nombre ||
        !this.apellido ||
        !this.correo ||
        !this.direccion ||
        !this.codigoPostal ||
        !this.telefono ||
        !this.fechaNacimiento
      ) {
        this.errorDatosVacios = true;
        this.errorFormatoCorreo = false;
        this.errorFormatoCampos = false;
        this.camposConError = [];
        this.mostrarExplicacionEncriptar = false;
        this.mostrarExplicacionHashear = false;
        return;
      }

      // Verificar el formato del correo electrónico
      if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(this.correo)) {
        this.errorDatosVacios = false;
        this.errorFormatoCorreo = true;
        this.errorFormatoCampos = false;
        this.camposConError = ['Correo Electrónico'];
        this.mostrarExplicacionEncriptar = false;
        this.mostrarExplicacionHashear = false;
        return;
      }

      // Verificar el formato de los campos
      if (this.tieneFormatoIncorrecto()) {
        this.errorDatosVacios = false;
        this.errorFormatoCorreo = false;
        this.errorFormatoCampos = true;
        this.camposConError = this.obtenerCamposConError();
        this.mostrarExplicacionEncriptar = false;
        this.mostrarExplicacionHashear = false;
        return;
      }

      // Limpiar mensajes de error
      this.errorDatosVacios = false;
      this.errorFormatoCorreo = false;
      this.errorFormatoCampos = false;
      this.camposConError = [];

      const datos = {
  nombre: this.nombre,
  apellido: this.apellido,
  correo: this.correo,
  direccion: this.direccion,
  codigoPostal: this.codigoPostal,
  telefono: this.telefono,
  fechaNacimiento: this.fechaNacimiento
};

// Llamar al método hashearData256Dos de apiService.js
//algo .
apiService.hashearData256Dos(datos)
  .then(response => {
    // Manejar la respuesta del backend (datos hasheados)
    this.datosHasheados = response.data;
  })
  .catch(error => {
    // Manejar errores
    console.error(error);
  });

// Limpiar datos encriptados
this.datosEncriptados = '';

// Mostrar explicación para hashear
this.mostrarExplicacionEncriptar = false;
this.mostrarExplicacionHashear = true;

    },
    validarCorreo() {
      // Restricción: Validar el formato de correo electrónico
      if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(this.correo)) {
        // Si no cumple con el formato, eliminar solo los caracteres inválidos
        this.correo = this.correo.replace(/[^\s@]+@[^\s@]+\.[a-z]{2,}/i, '');
      }
    },
    validarCodigoPostal() {
      // Restricción: Limitar a 5 caracteres numéricos
      this.codigoPostal = this.codigoPostal.replace(/\D/g, '');
      if (this.codigoPostal.length > 5) {
        this.codigoPostal = this.codigoPostal.slice(0, 5);
      }
    },
    validarTelefono() {
      // Restricción: Formato de número de teléfono (+123 456 789)
      this.telefono = this.telefono.replace(/\D/g, '');
      this.telefono = this.telefono.replace(/(\d{1,3})(\d{3})(\d{3})(\d{3})/, '+$1 $2 $3 $4');
      if (this.telefono.length > 16) {
        this.telefono = this.telefono.slice(0, 16);
      }
    },
    validarFechaNacimiento() {
      // Restricción: Formato de fecha de nacimiento (YYYY-MM-DD)
      this.fechaNacimiento = this.fechaNacimiento.replace(/\D/g, '');
      this.fechaNacimiento = this.fechaNacimiento.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
      if (this.fechaNacimiento.length > 10) {
        this.fechaNacimiento = this.fechaNacimiento.slice(0, 10);
      }
    },
    tieneFormatoIncorrecto() {
      // Verificar el formato de los campos
      const formatoTelefono = /^\+\d{1,3} \d{3} \d{3} \d{3}$/;
      const formatoCodigoPostal = /^\d{5}$/;
      const formatoFechaNacimiento = /^\d{4}-\d{2}-\d{2}$/;

      return (
        !formatoTelefono.test(this.telefono) ||
        !formatoCodigoPostal.test(this.codigoPostal) ||
        !formatoFechaNacimiento.test(this.fechaNacimiento)
      );
    },
    obtenerCamposConError() {
      const camposConError = [];

      const campos = [
        { nombre: 'Nombre', valor: this.nombre },
        { nombre: 'Apellido', valor: this.apellido },
        { nombre: 'Correo Electrónico', valor: this.correo },
        { nombre: 'Dirección de Vivienda', valor: this.direccion },
        { nombre: 'Código Postal', valor: this.codigoPostal },
        { nombre: 'Número de Teléfono', valor: this.telefono },
        { nombre: 'Fecha de Nacimiento', valor: this.fechaNacimiento },
      ];

      campos.forEach(campo => {
        switch (campo.nombre) {
          case 'Número de Teléfono':
            if (!/^\+\d{1,3} \d{3} \d{3} \d{3}$/.test(campo.valor)) {
              camposConError.push(campo.nombre);
            }
            break;
          case 'Código Postal':
            if (!/^\d{5}$/.test(campo.valor)) {
              camposConError.push(campo.nombre);
            }
            break;
          case 'Fecha de Nacimiento':
            if (!/^\d{4}-\d{2}-\d{2}$/.test(campo.valor)) {
              camposConError.push(campo.nombre);
            }
            break;
          default:
            break;
        }
      });

      return camposConError;
    },
  },
};
</script>

<style scoped>
.encriptar-datos-container {
  max-width: 800px; /* Aumenta el ancho máximo del contenedor */
  margin: 100px auto;
  padding: 40px; /* Aumenta el padding del contenedor */
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 18px; /* Aumenta el tamaño de la fuente */
}

.datos-input {
  width: 100%;
  margin-bottom: 20px; /* Aumenta el margen inferior */
  padding: 16px; /* Aumenta el padding del input */
  font-size: 20px; /* Aumenta el tamaño de la fuente del input */
  border: 1px solid #ddd;
  border-radius: 4px;
}

.encriptar-btn {
  background-color: #4CAF50;
  color: white;
  padding: 20px 30px; /* Aumenta el padding del botón */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 20px; /* Aumenta el tamaño de la fuente del botón */
  margin-right: 20px; /* Aumenta el margen derecho del botón */
}

.encriptar-btn:hover {
  background-color: #45a049;
}

.resultado-container {
  margin-top: 40px; /* Aumenta el margen superior */
}

.resultado-label {
  font-size: 20px; /* Aumenta el tamaño de la fuente */
  margin-bottom: 10px; /* Aumenta el margen inferior */
}

.resultado-codigo {
  display: block;
  padding: 20px; /* Aumenta el padding del código */
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: monospace;
  overflow-x: auto; /* Añade un desplazamiento horizontal si es necesario */
  white-space: nowrap; /* Evita que el texto se ajuste automáticamente a la siguiente línea */
}

.error-container {
  margin-top: 20px; /* Aumenta el margen superior */
}

.mensaje-error {
  color: red;
  font-size: 18px; /* Aumenta el tamaño de la fuente */
}
</style>