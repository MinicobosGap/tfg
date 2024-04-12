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
      <h2>Elección de Bcrypt para el Hasheo de Contraseñas</h2>

      <!-- Punto 1: Seguridad Adaptativa -->
      <p><strong>1. Seguridad Adaptativa:</strong> Bcrypt se caracteriza por su capacidad para adaptarse al tiempo, lo que significa que su costo computacional puede incrementarse con el avance de la tecnología. Esta adaptabilidad asegura que, incluso con el aumento de la capacidad de cómputo, el proceso de hasheo de contraseñas siga siendo resistente y seguro.</p>

      <!-- Punto 2: Resistencia Frente a Ataques de Fuerza Bruta -->
      <p><strong>2. Resistencia Frente a Ataques de Fuerza Bruta:</strong> Bcrypt incorpora un factor de costo ajustable, lo que dificulta significativamente los intentos de descifrado mediante ataques de fuerza bruta. Esta característica es crucial para proteger contraseñas, ya que dificulta la posibilidad de descubrir la contraseña original a partir del hash almacenado.</p>

      <!-- Punto 3: Protección Contra Ataques de Tablas de Arco Iris -->
      <p><strong>3. Protección Contra Ataques de Tablas de Arco Iris:</strong> Bcrypt utiliza el concepto de "sal" de manera predeterminada, lo que agrega una capa adicional de seguridad al proteger contra ataques de tablas de arco iris. Estos ataques son comunes en intentos de descifrar contraseñas mediante el uso de tablas precalculadas de hashes.</p>

      <!-- Punto 4: Ampliamente Utilizado en Aplicaciones de Autenticación -->
      <p><strong>4. Ampliamente Utilizado en Aplicaciones de Autenticación:</strong> Bcrypt es una elección común en el mundo de la seguridad informática y es ampliamente utilizado en sistemas de autenticación. Su reputación se basa en su capacidad para proteger de manera efectiva las contraseñas, uno de los datos más sensibles en cualquier sistema.</p>

      <!-- Punto 5: Enfoque Específico para Contraseñas Sensibles -->
      <p><strong>5. Enfoque Específico para Contraseñas Sensibles:</strong> Bcrypt se elige específicamente para proteger contraseñas debido a su capacidad para adaptarse a las crecientes demandas de seguridad y brindar una protección robusta contra posibles amenazas. Dado que las contraseñas son un dato altamente sensible, se requiere un enfoque especializado y Bcrypt ofrece exactamente eso.</p>

      <!-- Punto 6: Cumplimiento con Normativas de Protección de Datos -->
      <p><strong>6. Cumplimiento con Normativas de Protección de Datos:</strong> La elección de Bcrypt asegura el cumplimiento con normativas y regulaciones de protección de datos, proporcionando una capa adicional de seguridad necesaria para contraseñas. En entornos regulados, como aquellos que manejan datos personales, el uso de algoritmos de hasheo robustos como Bcrypt es fundamental para garantizar la seguridad de la información.</p>
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
