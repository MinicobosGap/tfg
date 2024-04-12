<template>
  <div class="biometric-container">
    <!-- Botones para seleccionar el tipo de dato biométrico -->
    <button @click="seleccionarTipo('voz')" class="accion-btn">Nota de Voz</button>
    <p class="mini-text">Extensiones permitidas: MP3 (.mp3), WAV (.wav), AAC (.aac), FLAC (.flac), OGG (.ogg)</p>
    <button @click="seleccionarTipo('huella')" class="accion-btn">Huellas Dactilares</button>
    <p class="mini-text">Solo disponible en el navegador Firefox y si tienes el hardware adecuado</p>
    <button @click="seleccionarTipo('foto')" class="accion-btn">Foto de Cara</button>
    
    <!-- Área para mostrar la entrada correspondiente -->
    <div v-if="tipoSeleccionado === 'voz'">
      <input type="file" @change="cargarNotaVoz" accept="audio/*">
    </div>
    <div v-if="tipoSeleccionado === 'huella'">
      <button @click="capturarHuellasDactilares" class="accion-btn">Capturar Huellas</button>
    </div>
    <div v-if="tipoSeleccionado === 'foto'">
      <button @click="capturarFotoCara" class="accion-btn">Capturar Foto</button>
    </div>
    
    <!-- Botón para encriptar el dato biométrico seleccionado -->  <!--  -->
    <button @click="encriptarDato" class="accion-btn" :disabled="!tipoSeleccionado">Encriptar Dato Biométrico</button>
    
    <!-- Mostrar el resultado de la encriptación -->
    <div v-if="resultadoTexto" class="resultado-container">
      <p class="resultado-label">Dato Biométrico Encriptado:</p>
      <code class="resultado-codigo">{{ resultadoTexto }}</code>
    </div>
  </div>
</template>

<script>
import apiService from './apiService';

export default {
  data() {
    return {
      tipoSeleccionado: '', // Variable para almacenar el tipo de dato biométrico seleccionado
      resultadoTexto: '', // Variable para mostrar el resultado de la encriptación
      notaVoz: null, // Almacena el archivo de nota de voz
      huellasDactilaresCapturadas: false, // Indica si se han capturado las huellas dactilares
      fotoCaraCapturada: false, // Indica si se ha capturado la foto de la cara
    };
  },
  methods: {
    seleccionarTipo(tipo) {
      // Método para seleccionar el tipo de dato biométrico
      this.tipoSeleccionado = tipo;
    },
    cargarNotaVoz(evento) {
      // Método para cargar la nota de voz seleccionada
      this.notaVoz = evento.target.files[0];
    },
    //capturar huellas dactilares que solo funcionan si tienes el hardware adecuado para ello sumado a si estás usando firefox (para que la API esté activada, ya que esta API está solo dispo en firefox)
    async capturarHuellasDactilares() {
  try {
    // Verificar si el navegador es Firefox
    if (!window.navigator.userAgent.includes("Firefox")) {
      console.error("La captura de huellas dactilares solo está disponible en Firefox.");
      return;
    }

    // Obtener la instancia del lector de huellas dactilares
    const fingerprintReader = window.navigator.fingerprint;

    if (!fingerprintReader) {
      console.error("No se encontró un lector de huellas dactilares en el navegador.");
      return;
    }

    // Solicitar la captura de la huella dactilar
    const fingerprint = await fingerprintReader.capture();

    // La huella dactilar se capturó con éxito
    console.log("Huella dactilar capturada:", fingerprint);

    // Llama al método hashearDato256(dato) del servicio apiService.js y pasa la huella dactilar
    apiService.hashearData256(fingerprint)
      .then((resultado) => {
        // Muestra el resultado hasheado por pantalla
        this.resultadoTexto = resultado;
      })
      .catch((error) => {
        console.error('Error al hashear la huella dactilar:', error);
      });
    
  } catch (error) {
    console.error("Error al capturar la huella dactilar:", error);
  }
}
,
 
  async capturarFotoCara() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const videoElement = document.createElement('video');
    videoElement.srcObject = stream;
    videoElement.play();

    videoElement.addEventListener('loadedmetadata', () => {
      const canvasElement = document.createElement('canvas');
      canvasElement.width = videoElement.videoWidth;
      canvasElement.height = videoElement.videoHeight;
      const context = canvasElement.getContext('2d');
      context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
      const fotoCara = canvasElement.toDataURL('image/jpeg');

      // Llama al método hashearData256(data) del servicio apiService.js y pasa el valor de fotoCara
      apiService.hashearData256(fotoCara)
        .then((resultado) => {
          // Muestra el resultado hasheado por pantalla
          this.resultadoTexto = resultado;
        })
        .catch((error) => {
          console.error('Error al hashear la foto de la cara:', error);
        });
    });
  } catch (error) {
    console.error('Error al acceder a la cámara', error);
  }
},
    async encriptarDato() {
      // Método para encriptar el dato biométrico seleccionado
      try {
        let datoBiometrico;
        switch (this.tipoSeleccionado) {
          case 'voz':
            // Si se seleccionó la nota de voz, se asigna el archivo a datoBiometrico
            datoBiometrico = this.notaVoz;
            break;
          case 'huella':
            // Si se seleccionaron las huellas dactilares, se establece un valor booleano
            datoBiometrico = this.huellasDactilaresCapturadas;
            break;
          case 'foto':
            // Si se seleccionó la foto de la cara, se establece un valor booleano
            datoBiometrico = this.fotoCaraCapturada;
            break;
          default:
            console.error('Tipo de dato biométrico no válido');
            return;
        }
        // Llama al servicio de API para encriptar el dato biométrico seleccionado
        const response = await apiService.encriptarDatoBiometrico(datoBiometrico);
        this.resultadoTexto = response.data; // Asigna el resultado de la encriptación
      } catch (error) {
        console.error('Error al encriptar el dato biométrico', error);
      }
    },
  },
};
</script>

<style scoped>
.biometric-container {
  max-width: 600px;
  margin: 100px auto; /* Centrar en el eje horizontal */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.biometric-input, .accion-btn {
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

.mini-text {
  font-size: 12px;
  color: #666;
}
</style>
