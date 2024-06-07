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

<!-- Conclusión para algoritmos de encriptacion -->
<div v-if="mostrarHash" class="conclusion">
  <h2>Conclusión para algoritmos de encriptación</h2>
  <p>
    Los algoritmos de encriptación son como cerraduras digitales que mantienen nuestros datos seguros en línea. Pero hay diferentes tipos de cerraduras para diferentes tipos de datos.
    <br><br>
    Cuando tenemos algo que queremos mantener en secreto pero que necesitamos ver de nuevo más tarde, usamos un tipo de cerradura llamada encriptación. Es como poner nuestros datos en una caja fuerte que solo podemos abrir con una llave especial. Pero debemos asegurarnos de que nadie más pueda encontrar esa llave.
    <br><br>
    Para cosas como números de tarjeta de crédito, direcciones y otros datos que necesitamos mantener seguros pero que también necesitamos ver de nuevo más tarde, utilizamos la encriptación para ofuscar el dato en texto plano y almacenarlo de forma segura. 
    <br><br>
    Existen varios tipos de encriptación, pero mayoritariamente se prefiere usar la encriptación simétrica para almacenar datos sensibles en una página web por temas de rendimiento, pese a que también es posible utilizar encriptación asimétrica. Por otro lado, existen muchos algoritmos de encriptación simétrica y en este caso se ha utilizado el método AES para encriptar todos los datos de la página web.
    <br><br>
    Ahora, se van a listar los puntos fuertes y las ventajas por las cuales se ha decidido utilizar AES-256 como algoritmo de encriptación en este trabajo:
    <br><br>
    <ul>
      <li><strong>Seguridad:</strong> AES-256 es extremadamente seguro. Su tamaño de clave mayor hace que sea esencialmente irrompible, lo que significa que, incluso si los servidores fueran hackeados, los datos serían imposibles de descifrar.</li>
      <br>
      <li><strong>Rapidez:</strong> AES-256 también tiene la ventaja de ser extremadamente rápido. Esto significa que puede manejar grandes volúmenes de datos sin ralentizar significativamente el rendimiento del sistema.</li>
      <br>
      <li><strong>Estándar global de encriptación:</strong> AES se ha convertido en el estándar global de encriptación y se usa para mantener segura una cantidad significativa de comunicaciones.</li>
      <br>
      <li><strong>Uso amplio:</strong> Lo vemos en aplicaciones de mensajería como WhatsApp y Signal, programas como VeraCrypt y WinZip, en una gama de hardware y una variedad de otras tecnologías que usamos todo el tiempo.</li>
      <br>
      <li><strong>Resistencia a ataques:</strong> AES-256 es resistente a todos los ataques conocidos si se usa correctamente.</li>
      <br>
      <li><strong>Flexibilidad de tamaño de clave:</strong> Flexibilidad de tamaño de clave: AES permite diferentes longitudes de clave (128, 192 o 256 bits), lo que lo hace mucho más robusto que otros algoritmos de cifrado.</li>
      <br>
      <li><strong>Aprobado por el gobierno de los EE.UU:</strong> AES-256 es tan seguro que es el algoritmo de cifrado elegido por el gobierno de los Estados Unidos para proteger la información clasificada.</li>
      <br>
    </ul>
    Finalmente, compararemos AES-256 con otros algoritmos:
    <br><br>
    <ul>
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
    Como conclusión a todo esto, se puede decir que al elegir AES sobre otros algoritmos de encriptación como RSA, ECC, ChaCha20, 3DES y RC4, estamos asegurando que nuestros datos estén protegidos de manera óptima en la web. Además, utilizando AES no nos hemos de preocupar por posibles amenazas y vulnerabilidades modernas.
  </p>
</div>
<!-- Conclusión para algoritmos de hash -->
<div v-if="mostrarEncriptacion" class="conclusion">
  <h2>Conclusión para algoritmos de hash</h2>
  <p>
    Los algoritmos de hash son como huellas digitales únicas para nuestros datos. Pero hay diferentes tipos de huellas para diferentes tipos de datos.
    <br><br>
    Cuando tenemos algún tipo de dato que queremos mantener en secreto por algún motivo en específico, pero que no necesitamos ver explícitamente de nuevo más tarde, usamos un tipo de huella llamada hash. La idea de utilizar un hash, es convertir nuestros datos en un texto a priori de carácteres aleatorios para el ojo humano que no puede ser revertido a los datos originales. 
    Normalmente no se suele utilizar un hash para almacenar datos sensibles "comunes" como por ejemplo el código postal o el número de teléfono, ya que este tipo de datos normalmente suelen almacenarse de forma segura pero reversible, utilizando un algoritmo de encriptación. En esta página web se ha incluido la posibilidad de hashear datos de este estilo, ya que no es imposible que se pueda dar el caso de almacenar como hash este tipo de datos, además de que sirve como ejemplo demostrativo.
    <br><br>
    Por un lado, en esta web se ha utilizado el algoritmo SHA-256 para hashear datos sensibles "comunes", como por ejemplo DNI, tarjeta de crédito, documentos, etc.. 
    Este algoritmo es muy útil para datos sensibles comunes, debido a que es rápido, eficiente y proporciona robustez ante ataques de fuerza bruta, por lo que es una muy buena elección como algoritmo para cumplir con esta función de mantener estos datos a salvo de manera eficiente.
    <br><br>
    Por otro lado, para contraseñas como las que usamos para iniciar sesión en sitios web, usamos un algoritmo diferente llamado bcrypt. Este algoritmo es preferible para contraseñas debido a su resistencia a los ataques de fuerza bruta. 
    La “lentitud” incorporada en bcrypt hace que sea más difícil para los atacantes descifrar las contraseñas cifradas. Además, bcrypt utiliza una sal aleatoria y única para cada contraseña cifrada, lo que significa que incluso si dos usuarios tienen la misma contraseña, la contraseña cifrada será diferente. Esto hace que sea más difícil para los atacantes descifrar las contraseñas mediante ataques de diccionario y de tabla arco iris.
    <br><br>
    Ahora, vamos a listar los puntos fuertes de utilizar SHA-256, los puntos fuertes de utilizar bcrypt ya están listados en la sección "Hash password":
    <br><br>
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
    <br><br>
    Finalmente, vamos a comparar los algoritmos SHA-256 y bcrypt con otros tipos de algoritmos de hash:
    <br><br>
    <ul>
      <li><strong>MD5 (Message Digest Algorithm 5):</strong> MD5 es un algoritmo de hash ampliamente utilizado en el pasado. Sin embargo, debido a sus debilidades de seguridad conocidas, como la vulnerabilidad a los ataques de colisión, su uso está desaconsejado en la actualidad.</li>
      <br>
      <li><strong>SHA-1 (Secure Hash Algorithm 1):</strong> SHA-1 es otro algoritmo de hash que ha sido ampliamente utilizado en el pasado. Sin embargo, debido a sus debilidades de seguridad conocidas, como la vulnerabilidad a los ataques de colisión, su uso está desaconsejado en la actualidad.</li>
      <br>
      <li><strong>SHA-512 (Secure Hash Algorithm 512):</strong> SHA-512 produce un hash de 512 bits. Aunque ofrece una mayor seguridad, este algoritmo es bastante más lento que SHA-256, por lo tanto la elección entre SHA-256 y SHA-512 depende del equilibrio que se busque entre velocidad y seguridad. Teniendo en cuenta que la seguridad de SHA-256 es muy buena y que además es bastante más eficiente que SHA-512, se ha decidido escoger este algoritmo para esta página web. </li>
      <br>
      <li><strong>Argon2:</strong> Argon2 es una alternativa bastante realista y tentadora para substituir a bcrypt, pero esta decisión puede variar dependiendo de la situación. Argon2 es un algoritmo bastante moderno, fue ganador del concurso de hasing de contraseñas. La razón por la que no se ha escogido Argon2 es debido a que todavía es un algoritmo muy reciente en comparación con bcrypt que lleva desde 1999.
      Además de eso, Argon2 es un algoritmo que requiere de más recursos para funcionar y de más parámetros que ajustar (como memoria, tiempo y paralelismo). Se ha valorado y decidido que para este trabajo se va a utilizar bcrypt porque a nivel de eficiencia, seguridad y confianza es proporcionalmente superior a Argon2.</li>
    </ul>
    <br><br>
    En resumen, al elegir SHA-256 y bcrypt estamos asegurando que nuestros datos sensibles estén protegidos de manera óptima en la web, contra posibles amenazas y vulnerabilidades en línea.
  </p>
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