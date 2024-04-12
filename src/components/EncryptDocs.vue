<template>
  <div class="encriptar-documento-container">
    <input type="file" ref="fileInput" @change="handleFileChange" accept=".txt,.doc,.docx,.pdf,.zip,.rar,.tar,.mp3,.mp4,.png,.jpg,.jpeg,.gif" class="documento-input" />
    <button @click="encryptFile" class="encriptar-btn">Encriptar</button>
    <div v-if="downloadUrl" class="resultado-container">
      <a :href="downloadUrl" download="documento_encriptado.txt" class="descargar-link">Descargar Documento Encriptado</a>
    </div>

    <!-- Explicación detallada -->
    <div v-if="explanationVisible" class="explanation-container">
      <h2>Elección del algoritmo AES para la encriptación de documentos sensibles</h2>
      <p>
        Al encriptar documentos sensibles de cualquier extensión, la elección del algoritmo de encriptación es crítica para garantizar la seguridad y la privacidad de los datos. Hemos seleccionado AES (Advanced Encryption Standard) como el algoritmo preferido por las siguientes razones:
      </p>
      <ol>
        <li><strong>Versatilidad:</strong> AES puede encriptar eficazmente documentos de cualquier extensión, lo que nos permite proteger una amplia variedad de tipos de archivos sensibles.</li>
        <li><strong>Seguridad comprobada:</strong> AES ha sido ampliamente evaluado y utilizado en la industria de la seguridad informática, demostrando ser altamente seguro y resistente a los ataques.</li>
        <li><strong>Confidencialidad y privacidad:</strong> Al encriptar documentos sensibles, es crucial mantener la confidencialidad y la privacidad de los datos. AES proporciona un alto nivel de protección para garantizar que solo las personas autorizadas puedan acceder al contenido encriptado.</li>
        <li><strong>Compatibilidad y facilidad de uso:</strong> AES es compatible con una amplia gama de plataformas y sistemas, lo que facilita su integración en diferentes entornos. Además, su implementación es relativamente sencilla y ofrece un buen rendimiento en términos de velocidad y eficiencia.</li>
      </ol>
      <p>
        En resumen, la elección del algoritmo AES nos brinda la tranquilidad de que nuestros documentos sensibles estarán protegidos de manera confiable, independientemente de su extensión, garantizando la seguridad y la privacidad de los datos.
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

