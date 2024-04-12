<template>
  <div id="app">
    <div class="navbar">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/dni" class="nav-link">DNI</router-link>
      <router-link to="/password" class="nav-link">Hash Password</router-link>
      <router-link to="/creditcard" class="nav-link">Credit Card</router-link>
      <router-link to="/personaldata" class="nav-link">Personal Data</router-link>
      <router-link to="/docs" class="nav-link">Upload Documents</router-link>
      <router-link to="/conclusion" class="nav-link">Conclusion Final</router-link>
      
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
#app {
  text-align: center;
}

.navbar {
  background-color: #333;
  padding: 15px; /* Ajusta el padding para hacerla más grande */
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  margin: 0 15px;
  padding: 15px; /* Ajusta el padding para hacer los enlaces más grandes */
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: #555;
}

.content {
  margin-top: 80px; /* Ajusta el margen superior según tus necesidades para evitar solapamientos */
}

</style>
