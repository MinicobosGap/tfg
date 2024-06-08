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
    <p>
     A continuación se van a listar los puntos fuertes y las ventajas por las cuales se ha decidido utilizar bcrypt como algoritmo de hash para este trabajo:
     <ul>
      <li><strong>Seguridad:</strong> bcrypt es extremadamente seguro. Utiliza un factor de costo que permite aumentar la cantidad de tiempo necesario para calcular el hash, lo que lo hace resistente a los ataques de fuerza bruta.</li>
      <br>
      <li><strong>Rendimiento:</strong> bcrypt es un algoritmo de funcionamiento lento que tarda tiempo en crear hashes de contraseñas y requiere tiempo para descifrarlos, lo que ralentiza significativamente los intentos de los hackers de romper el hash bcrypt.</li>
      <br>
      <li><strong>Uso de sal:</strong> Agregar un pedazo de datos aleatorios y hacer hash con la contraseña ayuda a generar hashes de contraseñas únicos resistentes a los ataques de tablas arco iris.</li>
      <br>
      <li><strong>Estándar global de hash:</strong> bcrypt es ampliamente aceptado como un estándar fuerte para el hash de contraseñas y se usa en muchas plataformas de desarrollo web.</li>
      <br>
      <li><strong>Uso amplio:</strong> Se utiliza en una variedad de aplicaciones y plataformas, especialmente en sistemas que requieren una seguridad de contraseña robusta.</li>
      <br>
      <li><strong>Flexibilidad de tamaño de hash:</strong> bcrypt siempre devuelve un valor de hash de longitud fija, sin importar qué tan largo sea el contenido mediante el cual se genera el hash.</li>
      <br>
      <li><strong>Resistencia a ataques:</strong> bcrypt es resistente a todos los ataques conocidos si se usa correctamente, incluyendo ataques de fuerza bruta y ataques de rainbow table.</li>
      <br>
      <li><strong>Adaptabilidad:</strong>  bcrypt puede adaptarse a los cambios en la tecnología y el hardware, lo que significa que puede mantenerse seguro incluso a medida que aumenta la potencia de cálculo.</li>
      <br>
      <li><strong>Aprobado por la comunidad de seguridad:</strong> bcrypt es tan seguro que es el algoritmo de hash elegido por la comunidad de seguridad para proteger la información sensible.</li>
      <br>
    </ul>
    </p>
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
  max-width: 800px; /* Aumenta el ancho máximo del contenedor */
  margin: 100px auto;
  padding: 40px; /* Aumenta el padding del contenedor */
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 18px; /* Aumenta el tamaño de la fuente */
}

.contrasena-input {
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
