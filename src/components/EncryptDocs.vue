<template>
  <div class="encriptar-documento-container">
    <input type="file" ref="fileInput" @change="handleFileChange" accept=".txt,.doc,.docx,.pdf,.zip,.rar,.tar,.mp3,.mp4,.png,.jpg,.jpeg,.gif" class="documento-input" />
    <button @click="encryptFile" class="encriptar-btn">Encriptar</button>
    <div v-if="downloadUrl" class="resultado-container">
      <a :href="downloadUrl" download="documento_encriptado.txt" class="descargar-link">Descargar Documento Encriptado</a>
    </div>

    <!-- Explicación detallada -->
    <div v-if="explanationVisible" class="explanation-container">
      <p class="subtitulo" style="font-size: 18px; font-weight: bold;">Se ha escogido AES-256 para encriptar documentos:</p>
      <p>
        AES (Advanced Encryption Standard) es un algoritmo de cifrado simétrico ampliamente adoptado y considerado seguro. La elección de AES-256 para encriptar documentos se detallará en la conclusión final, a la cual se recomienda acceder una vez se haya revisado todas las otras secciones.
      </p>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js';

export default {
  data() {
    return {
      fileContent: null,
      downloadUrl: null,
      explanationVisible: false
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.fileContent = reader.result;
        };
        reader.readAsText(file);
      }
    },

    encryptFile() {
      if (this.fileContent) {
        // Encriptar el contenido del archivo usando AES
        const encryptedData = CryptoJS.AES.encrypt(this.fileContent, 'secretKey').toString();
        // Crear un Blob con el contenido encriptado
        const blob = new Blob([encryptedData], { type: 'text/plain' });
        // Crear un enlace de descarga
        this.downloadUrl = window.URL.createObjectURL(blob);
        // Mostrar la explicación detallada
        this.explanationVisible = true;
      }
    },
  },
};
</script>

<style scoped>
.encriptar-documento-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.documento-input {
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

.descargar-link {
  display: block;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;
  transition: background-color 0.3s ease;
}

.descargar-link:hover {
  background-color: #45a049;
}
</style>

