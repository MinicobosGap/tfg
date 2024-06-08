<template>
  <div class="home-container">
    <header>
      <h1>Bienvenidos a encryptdata</h1>
      <p>¡Hora de poner a salvo nuestros datos!</p>
    </header>
    <section class="introduction-section">
      <p>
        Esta aplicación tiene como objetivo fines demostrativos y la demostración de cómo queda un dato protegido.
      </p>
      <p>
        Antes de comenzar, es importante explicar la gran diferencia entre encriptar y hashear un dato. 
      </p>
      <p>
        Encriptar un dato es equivalente a convertir un dato en texto plano a un dato cifrado reversible, es decir, se puede volver a convertir de ese dato cifrado al dato en texto plano inicial. Esto sirve para situaciones en el que el tipo de dato se necesita recuperar en algún momento.
      </p>
      <p>
        Hashear un dato en cambio, es equivalente a convertir el dato en texto plano a un dato cifrado irreversible, es decir, no se puede volver a convertir al dato original. Esto es importante para datos extremadamente sensibles que no se necesita tener en texto plano, como una contraseña en un sitio web a la hora de iniciar sesión en este.
      </p>
      <p>
        Una vez clara esta diferencia, ¡comencemos a encriptar datos!
      </p>
    </section>
    <section class="about-section">
      <h2>Acerca de mí</h2>
      <p>
        Soy un estudiante que está actualmente cursando el último año de la carrera de ingeniería informática en la Universitat de Barcelona y estoy haciendo el trabajo de final de grado (TFG) que en mi caso trata sobre criptografía. 
      </p>
    </section>
    <footer>
      <p>&copy; 2024 Mi Sitio Web de Encriptación. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
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

header {
  text-align: center;
  margin-bottom: 50px;
  padding: 20px;
  background-color: #007bff;
  color: white;
  border-radius: 8px;
}

header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

header p {
  font-size: 1.2rem;
  font-weight: lighter;
}

.feature-section {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
}

.feature {
  flex-basis: 45%;
  text-align: center;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.feature h2 {
  color: #007bff;
}

.about-section {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

footer {
  text-align: center;
  color: #888;
  padding: 20px;
  font-size: 0.9rem;
}
</style>
