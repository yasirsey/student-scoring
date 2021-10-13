<template>
    <nav class="p-2 border-bottom">
        <ul class="nav nav-pills nav-fill">
            <li class="nav-item">
                <nuxt-link to="/dashboard" class="nav-link">Öğrenciler</nuxt-link>
            </li>
            <li class="nav-item">
                <nuxt-link to="/dashboard/classes" class="nav-link">Sınıflar</nuxt-link>
            </li>
            <li class="nav-item">
                <nuxt-link to="/dashboard/settings" class="nav-link" href="#">Ayarlar</nuxt-link>
            </li>
            <li class="nav-item">
                <a @click="() => $auth.logout()" class="nav-link text-danger">Çıkış</a>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
a.nuxt-link-exact-active {
  background-color: green !important;
  color: white;
}

a {
    color: black;
    cursor: pointer;
}

a:hover,
a:focus {
    color: green;
}
</style>
