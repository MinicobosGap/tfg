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
  <p v-if="tipoAlgoritmo" class="algoritmo-info">
    <!-- Explicación detallada del algoritmo -->
    <template v-if="tipoAlgoritmo === 'AES'">
      <!-- Explicación del algoritmo utilizado: Por qué se ha escogido AES-256 específicamente para encriptar datos de tarjeta de crédito -->
      <p class="subtitulo" style="font-size: 18px; font-weight: bold;">Por qué se ha escogido AES-256 para encriptar datos de tarjeta de crédito:</p>
      <p>
        AES (Advanced Encryption Standard) es un algoritmo de cifrado simétrico ampliamente adoptado y considerado seguro. La elección de AES-256 para encriptar datos de tarjetas de crédito se fundamenta en su robustez, eficiencia y seguridad comprobada en la protección de datos sensibles. AES-256 ofrece una combinación óptima de seguridad y rendimiento, lo que lo hace adecuado para aplicaciones donde la protección de la información es fundamental. Ha sido evaluado y recomendado por organizaciones de seguridad de renombre como el NIST (Instituto Nacional de Normas y Tecnología).
      </p>
      <!-- Mención de empresas conocidas que utilizan AES-256 para encriptar datos -->
      <p>
        En la actualidad, es muy probable que numerosas entidades financieras líderes y organizaciones de renombre utilicen AES-256 para encriptar datos sensibles, incluyendo bancos, instituciones gubernamentales y empresas de tecnología. Algunos ejemplos destacados incluyen Bank of America, PayPal, Google y Microsoft, quienes seguramente emplean AES-256 para garantizar la seguridad de la información confidencial de sus clientes. Sin embargo, es importante tener en cuenta que esta información no puede ser confirmada al 100% debido a las políticas de seguridad y confidencialidad de las empresas, pero es altamente probable que utilicen este algoritmo dado su nivel de seguridad y adopción en la industria.
      </p>
      <!-- Separación con punto y coma -->
      <span style="color: gray;">&bull;</span>
      <!-- Explicación comparativa con otros algoritmos -->
      <p class="subtitulo" style="font-size: 18px; font-weight: bold;">Comparación con otros algoritmos:</p>
      <p>
        Aunque existen varios algoritmos de cifrado disponibles, AES-256 destaca por su mayor seguridad y eficiencia en comparación con otros algoritmos. Algunos algoritmos más antiguos, como DES, RSA, MD5 y SHA-1, han demostrado vulnerabilidades a ataques de colisión y no cumplen con los estándares actuales de seguridad. Por otro lado, AES-256 ofrece una resistencia excepcional a los ataques criptográficos conocidos y una amplia aceptación en la industria de la seguridad, lo que lo convierte en la elección preferida para la encriptación de datos sensibles como los de tarjetas de crédito.
      </p>
    </template>
    
    <template v-if="tipoAlgoritmo === 'SHA-256'">
      <!-- Explicación del algoritmo utilizado: Por qué se ha escogido SHA-256 específicamente para hashear datos de tarjeta de crédito -->
      <p class="subtitulo" style="font-size: 18px; font-weight: bold;">Por qué se ha escogido SHA-256 para hashear datos de tarjeta de crédito:</p>
      <p>
        SHA-256 es una función hash criptográfica ampliamente utilizada que produce una salida de 256 bits. La elección de SHA-256 para hashear datos de tarjetas de crédito se basa en su robustez y resistencia a colisiones. SHA-256 ofrece una forma rápida y confiable de generar un hash único para los datos de la tarjeta, lo que los hace difíciles de invertir o reconstruir. Además, SHA-256 es ampliamente adoptado por instituciones financieras y organizaciones gubernamentales para garantizar la seguridad de la información confidencial.
      </p>
      <!-- Mención de empresas conocidas que utilizan SHA-256 para hashear datos de tarjeta de crédito -->
      <p>
        En la industria financiera, es muy probable que varias instituciones líderes, como Visa, Mastercard y American Express, utilicen SHA-256 para hashear datos de tarjetas de crédito y proteger la información de sus clientes. Este algoritmo también es utilizado por empresas de tecnología como PayPal y Amazon, quienes seguramente confían en SHA-256 para mantener seguros los datos de transacciones financieras. Sin embargo, es importante tener en cuenta que esta información no puede ser confirmada al 100% debido a las políticas de seguridad y confidencialidad de las empresas, pero es altamente probable que utilicen este algoritmo dado su nivel de seguridad y adopción en la industria.
      </p>
      <!-- Separación con punto y coma -->
      <span style="color: gray;">&bull;</span>
      <!-- Explicación comparativa con otros algoritmos -->
      <p class="subtitulo" style="font-size: 18px; font-weight: bold;">Comparación con otros algoritmos de hash:</p>
      <p>
        A pesar de la disponibilidad de varios algoritmos de hash, SHA-256 destaca por su mayor seguridad y confiabilidad. Algunos algoritmos más antiguos, como MD5 y SHA-1, han demostrado vulnerabilidades a ataques de colisión y ya no son considerados seguros para aplicaciones críticas de seguridad. En contraste, SHA-256 ofrece una resistencia excepcional a los ataques criptográficos conocidos y es ampliamente aceptado como estándar de seguridad en la industria. Por lo tanto, la elección de SHA-256 para hashear datos de tarjetas de crédito se basa en su seguridad comprobada y su uso generalizado en aplicaciones de seguridad sensibles.
      </p>
    <!-- Comparación con otros algoritmos -->
    <p>
    Sin embargo, aunque existen otros algoritmos de encriptación y hash, como DES, RSA, MD5, SHA-1, entre otros, AES y SHA-256 son preferibles para el cifrado y hashing de datos de tarjetas de crédito debido a su robustez, resistencia a ataques conocidos y amplia aceptación en la industria de la seguridad. Algunos algoritmos más antiguos como MD5 y SHA-1 han demostrado vulnerabilidades a ataques de colisión, mientras que RSA puede ser menos eficiente y más costoso computacionalmente. Por lo tanto, la elección de AES y SHA-256 se basa en su seguridad, rendimiento y fiabilidad en la protección de datos sensibles como los números de tarjeta de crédito.
    </p>
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