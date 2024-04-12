<template>
  <div class="home-container">
    <!-- Título principal con fondo azul más grande -->
    <h1 class="main-title">Conclusión tras encriptar y hashear todos los datos</h1>

    <!-- Botón "¿Has terminado?" -->
    <button v-if="botonTerminadoVisible" @click="mostrarBotones = true; botonTerminadoVisible = false" class="terminado-btn">¿Has terminado?</button>
    
    <!-- Botones de explicación -->
    <div v-if="mostrarBotones" class="botones-explicacion">
      <button v-if="!mostrarHash" @click="mostrarHash = true; mostrarEncriptacion = false" class="explicacion-btn encriptacion-btn">Explicación encriptación</button>
      <button v-if="!mostrarEncriptacion" @click="mostrarEncriptacion = true; mostrarHash = false" class="explicacion-btn hash-btn">Explicación hash</button>
    </div>

    <!-- Conclusión para algoritmos de hash -->
    <!-- Conclusión para algoritmos de hash -->
<div v-if="mostrarHash" class="conclusion">
  <h2>Conclusión para algoritmos de encriptación</h2>
  <p>
    Los algoritmos de encriptación son como cerraduras digitales que mantienen nuestros datos seguros en línea. Pero hay diferentes tipos de cerraduras para diferentes tipos de datos.
    <br><br>
    Cuando tenemos algo que queremos mantener en secreto pero que necesitamos ver de nuevo más tarde, usamos un tipo de cerradura llamada encriptación. Es como poner nuestros datos en una caja fuerte que solo podemos abrir con una llave especial. Pero debemos asegurarnos de que nadie más pueda encontrar esa llave.
    <br><br>
    Para contraseñas, como las que usamos para iniciar sesión en sitios web, usamos una cerradura diferente llamada hash. En lugar de ser reversible, es decir, no podemos volver a la contraseña original, convierte la contraseña en algo completamente diferente y mucho más seguro.
    <br><br>
    Para cosas como números de tarjeta de crédito, direcciones y otros datos que necesitamos mantener seguros pero que también necesitamos ver de nuevo más tarde, utilizamos un tipo especial de cerradura llamada encriptación. En este caso, hemos usado el método AES para encriptar todos los datos de la página web.
    <br><br>
    Ahora, hablemos de por qué elegimos AES sobre otros tipos de encriptación:
    <br><br>
    <ul>
      <li><strong>AES (Advanced Encryption Standard):</strong> AES es como el guardián digital confiable de nuestros datos en la web. Es rápido, seguro y ampliamente utilizado en todo el mundo. AES ofrece un equilibrio perfecto entre seguridad y eficiencia, lo que significa que nuestros datos están bien protegidos sin comprometer el rendimiento del sistema. Además, AES ha resistido la prueba del tiempo y ha sido revisado y aprobado por expertos en seguridad digital.</li>
      <br>
      <li><strong>RSA (Rivest-Shamir-Adleman):</strong> RSA es un algoritmo popular para la criptografía asimétrica, que se utiliza principalmente para el intercambio seguro de claves y la firma digital. Aunque RSA es efectivo en ciertos casos, como la autenticación y la firma digital, es menos eficiente que AES para el cifrado de datos a gran escala en la web.</li>
      <br>
      <li><strong>ECC (Elliptic Curve Cryptography):</strong> ECC es otro algoritmo de criptografía asimétrica que se basa en curvas elípticas para cifrar datos. Si bien ECC es eficiente en términos de uso de recursos, puede ser más vulnerable a ciertos tipos de ataques en comparación con AES. Además, ECC puede ser menos compatible con algunos sistemas y aplicaciones en comparación con AES.</li>
      <br>
      <li><strong>ChaCha20:</strong> ChaCha20 es un algoritmo de cifrado de flujo diseñado para ofrecer alta seguridad y rendimiento en aplicaciones modernas. Si bien ChaCha20 es una opción sólida para ciertos casos de uso, como el cifrado de datos en dispositivos móviles, su uso en la web puede ser menos común en comparación con AES, que es ampliamente adoptado y probado en el campo.</li>
      <br>
      <li><strong>3DES (Triple Data Encryption Standard):</strong> 3DES es una versión mejorada del algoritmo DES original. Aunque sigue siendo utilizado en algunos sistemas heredados, su uso está disminuyendo gradualmente debido a su menor eficiencia y vulnerabilidades conocidas en comparación con AES.</li>
      <br>
      <li><strong>RC4 (Rivest Cipher 4):</strong> RC4 es un algoritmo de cifrado de flujo que ha sido ampliamente utilizado en el pasado. Sin embargo, debido a sus debilidades de seguridad conocidas, como los ataques de flujo de bits y la falta de robustez, su uso está desaconsejado en la actualidad.</li>
    </ul>
    <br><br>
    En resumen, al elegir AES sobre otros algoritmos de encriptación como RSA, ECC, ChaCha20, 3DES y RC4, estamos asegurando que nuestros datos estén protegidos de manera óptima en la web. Con AES, podemos estar seguros de que nuestros datos están bien protegidos contra posibles amenazas y vulnerabilidades en línea.
  </p>
</div>


<!-- Conclusión para algoritmos de encriptación -->
<div v-if="mostrarEncriptacion" class="conclusion">
  <h2>Conclusión para algoritmos de hash</h2>
  <p>Explicación de la conclusión</p>
</div>

<footer>
  <p>&copy; 2024 Mi Sitio Web de Encriptación. Todos los derechos reservados.</p>
</footer>
</div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      mostrarBotones: false,
      botonTerminadoVisible: true, // Mostrar el botón "¿Has terminado?" inicialmente
      mostrarHash: false,
      mostrarEncriptacion: false
    };
  }
};
</script>

<style scoped>
.home-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.main-title {
  text-align: center;
  font-size: 3rem; /* Tamaño del título más grande */
  margin-bottom: 40px; /* Aumentar el margen entre el título principal y el siguiente subtítulo */
  background-color: #04080b; /* Agregar fondo azul */
  color: white; /* Color del texto en blanco para contrastar */
  padding: 30px; /* Añadir un poco de espacio alrededor del título */
}

.terminado-btn {
  display: block;
  margin: 0 auto;
  font-size: 1.5rem;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.terminado-btn:hover {
  background-color: #153150; /* Cambiar el color de fondo al pasar el ratón */
  color: white; /* Cambiar el color del texto al pasar el ratón */
}

.botones-explicacion {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.explicacion-btn {
  font-size: 1.5rem;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

/* Estilo para el botón de "Explicación encriptación" */
.encriptacion-btn {
  background-color: #b02316;
  color: white;
}

/* Estilo para el botón de "Explicación hash" */
.hash-btn {
  background-color: #b02316;
  color: white;
}

.explicacion-btn:hover {
  opacity: 0.8;
}

.conclusion {
  margin-top: 30px;
  text-align: justify;
}

.conclusion h2 {
  font-size: 2rem;
}

.about-section {
  text-align: center;
  margin-top: 50px;
}

footer {
  text-align: center;
  color: #888;
  padding: 20px;
  font-size: 0.9rem;
}
</style>