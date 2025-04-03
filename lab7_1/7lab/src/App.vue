<template>
  <div id="app">
    <nav>
      <router-link to="/">Погода</router-link> |
      <router-link to="/tasks">Задачи</router-link> |
      <router-link to="/news">Новости</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  min-height: 100vh;
}

#app::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('../src/assets/background.jpg') no-repeat center center;
  background-size: cover;
  z-index: -2;
  opacity: 0.3;
}

/* #app::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.85);
  z-index: -1;
} */

nav {
  padding: 20px 0;
  text-align: center;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  margin-bottom: 20px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 10px;
  padding: 5px 10px;
  border-radius: 4px;
  transition: all 0.3s;
}

nav a.router-link-exact-active {
  color: white;
  background-color: #42b983;
}

nav a:hover {
  background-color: #f0f0f0;
}
</style>