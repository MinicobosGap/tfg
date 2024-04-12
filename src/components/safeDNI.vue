<template>
  <div class="dni-container">
    <!-- Área de texto -->
    <textarea v-model="dni" placeholder="Escriba el DNI" class="dni-input"></textarea>
    
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
      <h2 v-if="explicacionTipo === 'hashear'">Elección de SHA-256 para el Hasheo del DNI</h2>
      <h2 v-if="explicacionTipo === 'encriptar'">Elección de AES-256 para la Encriptación del DNI</h2>
      <p v-if="explicacionTipo === 'hashear'">
        La elección de utilizar el algoritmo de hash SHA-256 para el hasheo del Documento Nacional de Identidad (DNI)
        se basa en su robustez y amplia aceptación en la industria de la seguridad de la información. SHA-256 proporciona
        una alta seguridad criptográfica al ser resistente a diversos tipos de ataques, incluidos los de colisión, y ofrece
        un equilibrio adecuado entre seguridad y rendimiento. Recordemos que en criptografía, los ataques de colisión ocurren cuando dos conjuntos de datos diferentes generan el mismo valor hash. SHA-256, al ser resistente a este tipo de ataques, garantiza que cada DNI tenga un valor único en su hash correspondiente, fortaleciendo la integridad de los datos.
      </p>
      <h3>Ventajas de AES-256 para encriptar DNIs</h3>
<ul>
  <li><strong>Seguridad Especializada:</strong> AES-256 se destaca como una elección ideal para encriptar DNIs debido a su alta seguridad criptográfica y su capacidad para proteger datos sensibles. Al considerar la naturaleza confidencial de los DNIs, es crucial utilizar un algoritmo de encriptación robusto que garantice la integridad y confidencialidad de la información personal.</li>
  <li><strong>Rendimiento y Eficiencia:</strong> A pesar de ser computacionalmente más pesado que algunos algoritmos más ligeros, AES-256 ofrece un equilibrio óptimo entre seguridad y rendimiento. Al encriptar grandes volúmenes de datos, como los DNIs, es fundamental elegir un algoritmo que garantice una protección sólida sin comprometer el rendimiento del sistema.</li>
  <li><strong>Adaptabilidad y Estándares Industriales:</strong> AES-256 es ampliamente adoptado en la industria de seguridad y cumple con estándares reconocidos a nivel internacional. Esta amplia aceptación y uso generalizado aseguran que los DNIs encriptados con AES-256 sean compatibles con una variedad de sistemas y aplicaciones, lo que facilita su integración y gestión.</li>
</ul>

<h3>Comparación con otros algoritmos</h3>
<ul>
  <li><strong>Comparación con RSA:</strong> Aunque RSA es efectivo para la encriptación, su uso en la protección de DNIs puede ser menos adecuado debido a su naturaleza asimétrica y su rendimiento menos eficiente en el cifrado de datos a gran escala.</li>
  <li><strong>Comparación con 3DES:</strong> Aunque 3DES proporciona cierto nivel de seguridad, su uso está disminuyendo gradualmente debido a sus vulnerabilidades conocidas y su menor eficiencia en comparación con AES-256. Al encriptar DNIs, es crucial optar por un algoritmo que ofrezca una seguridad sólida y una eficiencia óptima, lo cual AES-256 logra de manera más efectiva.</li>
</ul>
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
