<template>
  <div class="encriptar-contrasena-container">
    <textarea v-model="contrasena" placeholder="Escriba la contraseña" class="contrasena-input"></textarea>
    <button @click="encriptar" class="encriptar-btn">Hashear</button>
    <div v-if="contrasenaEncriptada" class="resultado-container">
      <p class="resultado-label">Contraseña Encriptada:</p>
      <code class="resultado-codigo">{{ contrasenaEncriptada }}</code>
    </div>
    <div v-if="showError" class="error-container">
      <p class="mensaje-error">Por favor, introduzca una contraseña válida.</p>
    </div>

   <!-- Sección de explicación para hashear contraseñas -->
   <div v-if="contrasenaEncriptada" class="explicacion-container">
    <ul>
      <li><strong>Seguridad:</strong> SHA-256 es extremadamente seguro. Genera un hash único para cada entrada única, lo que lo hace resistente a los ataques de colisión.</li>
      <br>
      <li><strong>Rendimiento:</strong> Rendimiento: Aunque un hash SHA-256 es un 20-30% más lento de calcular que los hashes MD5 o SHA-1, ofrece un equilibrio perfecto entre seguridad y eficiencia.</li>
      <br>
      <li><strong>Estándar global de hash:</strong> SHA-256 se ha convertido en el estándar global de hash y se usa para mantener segura una cantidad significativa de nuestras comunicaciones.</li>
      <br>
      <li><strong>Uso amplio:</strong> Se utiliza en aplicaciones de mensajería como WhatsApp y Signal, programas como VeraCrypt y WinZip, en una gama de hardware y una variedad de otras tecnologías que usamos todo el tiempo.</li>
      <br>
      <li><strong>Flexibilidad de tamaño de hash:</strong> SHA-256 siempre devuelve un valor de hash de 256 bits, o 64 dígitos hexadecimales, sin importar qué tan largo sea el contenido mediante el cual se genera el hash.</li>
      <br>
      <li><strong>Resistencia a ataques:</strong> SHA-256 es resistente a todos los ataques conocidos si se usa correctamente.</li>
      <br>
      <li><strong>Aprobado por el gobierno de los EE.UU:</strong> SHA-256 es tan seguro que es el algoritmo de hash elegido por el gobierno de los Estados Unidos para proteger la información clasificada.</li>
      <br>
    </ul>
    </div>
  </div>
</template>

<script>
import apiService from './apiService';

export default {
  data() {
    return {
      contrasena: '', // Variable para almacenar la contraseña ingresada por el usuario
      contrasenaEncriptada: '', // Variable para almacenar la contraseña encriptada recibida del backend
      showError: false // Variable para controlar la visualización del mensaje de error
    };
  },
  methods: {
    async encriptar() {
  // Verificar que la contraseña no esté vacía
  if (this.contrasena.trim() !== '') {
    try {
      const response = await apiService.hashearDataBcrypt(this.contrasena);
      console.log(response.data); // Verifica la estructura de la respuesta
      const contrasenaEncriptada = response.data; // Asigna directamente la respuesta del servidor
      this.contrasenaEncriptada = contrasenaEncriptada; // Asigna el resultado del hash
      this.showError = false;
    } catch (error) {
      console.error('Error al hashear la contraseña:', error);
      this.showError = true;
    }
  } else {
    this.showError = true;
  }
},
  }
};
</script>

<style scoped>
.encriptar-contrasena-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.contrasena-input {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.encriptar-btn {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
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
