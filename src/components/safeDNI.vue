<template>
  <div class="dni-container">
    <!-- Área de texto -->
    <textarea v-model="dni" placeholder="Escriba el DNI (8 números y 1 letra)" class="dni-input"></textarea>
    
    <!-- Botones -->
    <button @click="hashear" class="accion-btn">Hashear</button>
    <button @click="encriptar" class="accion-btn">Encriptar</button>
    
    <!-- Mostrar el resultado -->
    <div v-if="resultadoTexto" class="resultado-container">
      <p class="resultado-label">{{ resultadoLabel }}:</p>
      <code class="resultado-codigo">{{ resultadoTexto }}</code>
    </div>
    
    <!-- Mostrar mensaje de error si el DNI no es válido -->
    <div v-if="showError" class="error-container">
      <p class="mensaje-error">Por favor, introduzca un DNI válido.</p>
    </div>
    
    <!-- Sección de Explicación -->
    <div v-if="mostrarExplicacion" class="explicacion-container">

      <p v-if="explicacionTipo === 'hashear'">Se ha escogido SHA-256 para hashear el DNI:</p>
      <p v-if="explicacionTipo === 'encriptar'">Se ha escogido AES-256 para encriptar el DNI:</p>
      <p v-if="explicacionTipo === 'hashear'">
        SHA-256 es una función hash criptográfica ampliamente utilizada que produce una salida de 256 bits. La elección de SHA-256 para hashear datos de tarjetas de crédito se detallará en la conclusión final, a la cual se recomienda acceder una vez se haya revisado todas las otras secciones.
      </p>
      <p v-if="explicacionTipo === 'encriptar'">
        AES (Advanced Encryption Standard) es un algoritmo de cifrado simétrico ampliamente adoptado y considerado seguro. La elección de AES-256 para encriptar datos de tarjetas de crédito se detallará en la conclusión final, a la cual se recomienda acceder una vez se haya revisado todas las otras secciones.
      </p>
    </div> 
  </div>
</template>

<script>
import apiService from './apiService';

export default {
  data() {
    return {
      dni: '',
      resultadoTexto: '',
      resultadoLabel: '',
      showError: false,
      mostrarExplicacion: false,
      explicacionTipo: '',
    };
  }, 
  methods: {
    async hashear() {
  const dniSinEspacios = this.dni.replace(/\s/g, '');
  if (/^\d{8}[a-zA-Z]$/.test(dniSinEspacios)) {
    try {
      const response = await apiService.hashearData256(this.dni);
      console.log(response.data); // Verifica la estructura de la respuesta
      const hashedData = response.data; // Asigna directamente la respuesta del servidor
      this.resultadoTexto = hashedData; // Asigna el resultado del hash
      this.resultadoLabel = 'DNI Hasheado';
      this.showError = false;
      this.mostrarExplicacion = true;
      this.explicacionTipo = 'hashear'; // Mostrar la explicación de hashear
    } catch (error) {
      console.error('Error al hashear los datos', error); 
      this.showError = true;
      this.mostrarExplicacion = false;
    }
  } else {
    this.showError = true;
    this.mostrarExplicacion = false;
  }
},
    async encriptar() {
  const dniSinEspacios = this.dni.replace(/\s/g, '');
  if (/^\d{8}[a-zA-Z]$/.test(dniSinEspacios)) {
    try {
      const datos = {
      dni: this.dni
    };
      const response = await apiService.encriptarData(datos);
      console.log(response.data); // Verifica la estructura de la respuesta
      const encryptedData = response.data; // Asigna directamente la respuesta del servidor
      this.resultadoTexto = encryptedData; // Asigna el resultado del cifrado
      this.resultadoLabel = 'DNI Encriptado';
      this.showError = false;
      this.mostrarExplicacion = true;
      this.explicacionTipo = 'encriptar'; // Mostrar la explicación de encriptar
    } catch (error) {
      console.error('Error al encriptar los datos', error); 
      this.showError = true;
      this.mostrarExplicacion = false;
    }
  } else {
    this.showError = true;
    this.mostrarExplicacion = false;
  }
},
  },
};
</script>

<style scoped>
.dni-container {
  max-width: 600px;
  margin: 100px auto; /* Centrar en el eje horizontal */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.dni-input, .accion-btn {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.accion-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

.accion-btn:hover {
  background-color: #45a049;
}

.resultado-container {
  margin-top: 20px;
  text-align: center; /* Centrar el texto en el eje horizontal */
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
  text-align: center; /* Centrar el texto en el eje horizontal */
}

.mensaje-error {
  color: red;
}
</style>
