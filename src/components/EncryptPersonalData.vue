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
    <h2>Razones para la Elección de AES256 en la Encriptación de Datos Personales</h2>

    <!-- Punto 1: Seguridad y Protección de Datos Personales -->
    <p>1. <strong>Seguridad y Protección de Datos Personales:</strong> Los datos personales, como nombre, apellido, teléfono, dirección de vivienda, correo electrónico y código postal, requieren una protección sólida. AES256, al ser un algoritmo de encriptación simétrica, proporciona una capa robusta de seguridad con una clave de encriptación de 256 bits, lo que garantiza la confidencialidad de la información personal.</p>

    <!-- Punto 2: Eficacia y Robustez -->
    <p>2. <strong>Eficacia y Robustez:</strong> AES256 es ampliamente reconocido por su eficacia y robustez en la protección de datos sensibles. Al ser uno de los estándares de encriptación más utilizados y confiables, ha demostrado ser altamente resistente a los ataques criptográficos, asegurando la integridad y la confidencialidad de los datos personales.</p>

    <!-- Punto 3: Cumplimiento con Normativas de Protección de Datos -->
    <p>3. <strong>Cumplimiento con Normativas de Protección de Datos:</strong> La elección de AES256 garantiza el cumplimiento con normativas y regulaciones de protección de datos, proporcionando una capa adicional de seguridad necesaria para datos personales. Su amplia adopción en entornos donde la seguridad de la información personal es primordial refuerza su idoneidad para cumplir con los estándares de privacidad y seguridad requeridos.</p>

    <!-- Punto 4: Eficiencia y Flexibilidad -->
    <p>4. <strong>Eficiencia y Flexibilidad:</strong> AES256 ofrece un equilibrio adecuado entre seguridad, eficiencia y flexibilidad. Su implementación eficiente permite encriptar y desencriptar grandes volúmenes de datos sin comprometer el rendimiento, lo que lo convierte en una opción eficaz para proteger datos personales en una variedad de aplicaciones y entornos.</p>

    <!-- Punto 5: Amplia Adopción y Soporte -->
    <p>5. <strong>Amplia Adopción y Soporte:</strong> AES256 es ampliamente adoptado y cuenta con un sólido soporte en la industria de la seguridad informática. Su uso extendido en aplicaciones y sistemas garantiza la interoperabilidad y la compatibilidad, lo que facilita su implementación y gestión en diferentes entornos.</p>

    <!-- Comparación con Otros Algoritmos en Encriptación de Datos Personales -->
    <h3>Comparación con Otros Algoritmos en la Encriptación de Datos Personales</h3>
    <p>En la evaluación comparativa con otros algoritmos de encriptación, se consideró especialmente la necesidad de proteger datos personales. AES256 se destaca como la opción preferida frente a otros algoritmos, como DES o 3DES, gracias a su mayor longitud de clave y su resistencia a los ataques criptográficos, lo que garantiza un nivel superior de seguridad para los datos personales en cuestión.</p>
  </div>

<!-- Añadir sección de explicación para hashear -->
<div v-if="mostrarExplicacionHashear" class="explicacion-container">
  <!-- Razones para la Elección de SHA-256 para Datos Personales -->
  <h2>Razones para la Elección de SHA-256 en el Hasheo de Datos Personales</h2>

  <!-- Punto 1: Resistencia y Amplio Soporte -->
  <p>1. <strong>Resistencia y Amplio Soporte:</strong> SHA-256 es un algoritmo de hash ampliamente reconocido y respaldado en la industria de la seguridad informática. Su robustez y amplia adopción lo convierten en una opción confiable para proteger datos personales en una página web.</p>

  <!-- Punto 2: Comparación con Bcrypt y SHA-3 -->
  <h3>Comparación con Bcrypt y SHA-3</h3>
  <p>Al comparar SHA-256 con otros algoritmos de hash como bcrypt y SHA-3, se destacan las siguientes razones para elegir SHA-256 en una página web donde se manejan datos personales:</p>

  <!-- Punto 3: Eficiencia y Flexibilidad -->
  <p>• <strong>Eficiencia y Flexibilidad:</strong> Aunque bcrypt es ampliamente utilizado para el almacenamiento seguro de contraseñas, su diseño orientado a la seguridad adaptativa puede introducir una carga computacional adicional en aplicaciones web con un alto volumen de usuarios. En cambio, SHA-256 ofrece una combinación óptima de eficiencia y seguridad, lo que lo hace más adecuado para el hasheo rápido y eficiente de datos personales sin comprometer la seguridad.</p>

  <!-- Punto 4: Seguridad y Robustez -->
  <p>• <strong>Seguridad y Robustez:</strong> Aunque SHA-3 es un algoritmo de hash reciente que ofrece ciertas mejoras en seguridad y resistencia criptográfica, SHA-256 sigue siendo la opción preferida para el hasheo de datos personales en aplicaciones web establecidas. Esto se debe a su amplia adopción y al tiempo que ha sido sometido a pruebas y análisis exhaustivos, lo que ha demostrado su seguridad y robustez en una amplia variedad de casos de uso.</p>

  <!-- Punto 5: Estándar de la Industria -->
  <p>• <strong>Estándar de la Industria:</strong> SHA-256 es un estándar de la industria reconocido y ampliamente utilizado para el hasheo de datos sensibles, incluidos los datos personales. Su estatus como estándar establecido proporciona una medida adicional de confianza y seguridad en el contexto de la protección de la privacidad y la integridad de los datos.</p>
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
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.datos-input {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.encriptar-btn {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
}

.encriptar-btn:hover {
  background-color: #45a049;
}

.resultado-container {
  margin-top: 20px;
}

.resultado-label {
  font-size: 16px;
  margin-bottom: 5px;
}

.resultado-codigo {
  display: block;
  padding: 10px;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: monospace;
}

.error-container {
  margin-top: 10px;
}

.mensaje-error {
  color: red;
}
</style>
