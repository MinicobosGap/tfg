<template>
  <div class="encriptar-tarjeta-container">
    <!-- Añadir el área de texto para el nombre del dueño de la tarjeta -->
    <input
      v-model="nombreDueno"
      placeholder="Nombre del Dueño"
      class="tarjeta-input"
      maxlength="50"
    />

    <!-- Añadir el área de texto para el número de tarjeta -->
    <input
      v-model="numeroTarjeta"
      placeholder="Número de Tarjeta"
      class="tarjeta-input"
      @input="formatoNumeroTarjeta"
      maxlength="19"  
    />

    <!-- Añadir el área de texto para la fecha de expiración -->
    <input
      v-model="fechaExpiracion"
      placeholder="Fecha de Expiración (MM/YY)"
      class="tarjeta-input"
      @input="formatoFechaExpiracion"
      maxlength="5"  
    />

    <!-- Añadir el área de texto para el CVV -->
    <input
      v-model="cvv"
      placeholder="CVV"
      class="tarjeta-input"
      maxlength="3"  
    />

    <!-- Botón de Encriptar -->
    <button @click="encriptar" class="encriptar-btn">Encriptar</button>

    <!-- Botón de Hashear -->
    <button @click="hashear" class="hashear-btn">Hashear</button>

<!-- Mostrar el resultado de la encriptación -->
<div v-if="tarjetaEncriptada" class="resultado-container">
  <p class="resultado-label">Datos de la Tarjeta Encriptados:</p>
  <code class="resultado-codigo">{{ tarjetaEncriptada }}</code>
  <!-- Explicación del algoritmo utilizado -->
  <!-- ---- -->
  <p v-if="tipoAlgoritmo" class="algoritmo-info">
    <!-- Explicación detallada del algoritmo -->
    <template v-if="tipoAlgoritmo === 'AES'">
      <!-- Explicación del algoritmo utilizado: Por qué se ha escogido AES-256 específicamente para encriptar datos de tarjeta de crédito -->
      <p class="subtitulo" style="font-size: 18px; font-weight: bold;">Se ha escogido AES-256 para encriptar datos de tarjeta de crédito:</p>
      <p>
        AES (Advanced Encryption Standard) es un algoritmo de cifrado simétrico ampliamente adoptado y considerado seguro. La elección de AES-256 para encriptar datos de tarjetas de crédito se detallará en la conclusión final, a la cual se recomienda acceder una vez se haya revisado todas las otras secciones.
      </p>
      <!-- Separación con punto y coma -->
      <span style="color: gray;">&bull;</span>
      <!-- Explicación comparativa con otros algoritmos -->
    </template>
    
    <template v-if="tipoAlgoritmo === 'SHA-256'">
      <!-- Explicación del algoritmo utilizado: Por qué se ha escogido SHA-256 específicamente para hashear datos de tarjeta de crédito -->
      <p class="subtitulo" style="font-size: 18px; font-weight: bold;">Se ha escogido SHA-256 para hashear datos de tarjeta de crédito:</p>
      <p>
        SHA-256 es una función hash criptográfica ampliamente utilizada que produce una salida de 256 bits. La elección de SHA-256 para hashear datos de tarjetas de crédito se detallará en la conclusión final, a la cual se recomienda acceder una vez se haya revisado todas las otras secciones.
      </p>
      <!-- Separación con punto y coma -->
      <span style="color: gray;">&bull;</span>  
  </template>
  </p>
</div>
    <!-- Mostrar mensaje si los datos de la tarjeta no son válidos -->
    <div v-if="mostrarError" class="error-container">
      <p class="mensaje-error">Por favor, introduzca datos de tarjeta válidos.</p>
    </div>
  </div>
</template>

<script>
import apiService from './apiService';

export default {
  data() {
    return {
      nombreDueno: '',
      numeroTarjeta: '',
      fechaExpiracion: '',
      cvv: '',
      tarjetaEncriptada: '',
      mostrarError: false,
      tipoAlgoritmo: '' // Variable para almacenar el tipo de algoritmo
    };
  },
  methods: {
    validarDatosTarjeta() {
      return (
        this.nombreDueno !== '' &&
        this.numeroTarjeta.length === 19 &&
        this.fechaExpiracion.length === 5 &&
        this.cvv.length === 3
      );
    },

    encriptar() {
  // Verificar que los datos de la tarjeta son válidos
  if (this.validarDatosTarjeta()) {
    // Crear un objeto con los datos de la tarjeta
    const datosTarjeta = {
      nombreDueno: this.nombreDueno,
      numeroTarjeta: this.numeroTarjeta,
      fechaExpiracion: this.fechaExpiracion,
      cvv: this.cvv
    };

    // Llamar al método encriptarData del servicio API y pasarle los datos de la tarjeta
    apiService.encriptarData(datosTarjeta)
      .then(response => {
        this.tarjetaEncriptada = response.data;
        this.mostrarError = false; // Restablecer el estado de mostrar error
        this.tipoAlgoritmo = 'AES'; // Establecer el tipo de algoritmo
      })
      .catch(error => {
        // Manejar errores de la llamada al servicio API
        console.error(error);
        this.mostrarError = true;
      });
    
    // Ocultar la explicación del hash si estaba mostrada
    this.tipoAlgoritmo = '';
  } else {
    // Mostrar el mensaje de error solo cuando los datos no son válidos
    this.mostrarError = true;
  }
},
    // Método para formatear el número de tarjeta con separación cada 4 dígitos
    formatoNumeroTarjeta() {
      this.numeroTarjeta = this.numeroTarjeta.replace(/\D/g, '');
      this.numeroTarjeta = this.numeroTarjeta.replace(/(\d{4})(?=\d)/g, '$1 ');

      // Restricción: Limitar a 19 caracteres (contando los espacios)
      if (this.numeroTarjeta.length > 19) {
        this.numeroTarjeta = this.numeroTarjeta.slice(0, 19);
      }
    },
    // Método para formatear la fecha de expiración con una barra después de 2 dígitos

    formatoFechaExpiracion() {
      this.fechaExpiracion = this.fechaExpiracion.replace(/\D/g, '');
      this.fechaExpiracion = this.fechaExpiracion.replace(/(\d{2})(\d{0,2})/, '$1/$2');

      // Restricción: Limitar a 5 caracteres (contando la /)
      if (this.fechaExpiracion.length > 5) {
        this.fechaExpiracion = this.fechaExpiracion.slice(0, 5);
      }
    },

    async hashear() {
  // Verificar que los datos de la tarjeta son válidos
  if (this.validarDatosTarjeta()) {
    try {
      // Crear un objeto con los datos de la tarjeta
      const datosTarjeta = {
        nombreDueno: this.nombreDueno,
        numeroTarjeta: this.numeroTarjeta,
        fechaExpiracion: this.fechaExpiracion,
        cvv: this.cvv
      };

      // Llamar al método hashearData256Dos de apiService.js y pasarle los datos de la tarjeta
      apiService.hashearData256Dos(datosTarjeta)
        .then(response => {
          this.tarjetaEncriptada = response.data;
          this.mostrarError = false; // Restablecer el estado de mostrar error
          this.tipoAlgoritmo = 'SHA-256'; // Establecer el tipo de algoritmo
        });
      
      // Ocultar la explicación de encriptación si estaba mostrada
      this.tipoAlgoritmo = '';
    } catch (error) {
      // Manejar errores de la llamada al backend
      console.error(error);
      this.mostrarError = true;
    }
  } else {
    // Mostrar el mensaje de error solo cuando los datos no son válidos
    this.mostrarError = true;
  }
},
  }
};
</script>

<style scoped>
.encriptar-tarjeta-container {
  width: 60%;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
}

.tarjeta-input {
  width: 100%;
  margin-bottom: 20px;
  padding: 15px;
  font-size: 18px;
  border: 2px solid #ddd;
  border-radius: 8px;
}

.encriptar-btn, .hashear-btn {
  background-color: #4CAF50;
  color: white;
  padding: 15px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  margin-right: 20px;
}

.encriptar-btn:hover, .hashear-btn:hover {
  background-color: #45a049;
}

.resultado-container {
  margin-top: 40px;
}

.resultado-label {
  font-size: 18px;
  margin-bottom: 10px;
}

.resultado-codigo {
  display: block;
  padding: 20px;
  background-color: #f8f8f8;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-family: monospace;
  font-size: 18px;
}

.error-container {
  margin-top: 20px;
}

.mensaje-error {
  color: red;
  font-size: 18px;
}

.algoritmo-info {
  font-size: 16px;
  color: #666;
}
</style>