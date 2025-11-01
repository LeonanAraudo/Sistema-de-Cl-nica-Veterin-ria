<script setup>
    import { inject } from 'vue'

    const data = [
    { iconUrl: "https://img.icons8.com/material-outlined/24/FFFFFF/cat-footprint.png", label: "Cadastrar Pet" },
    { iconUrl: "https://img.icons8.com/ios-filled/50/FFFFFF/pet.png", label: "Cadastrar Tutor" },
    { iconUrl: "https://img.icons8.com/pulsar-line/48/FFFFFF/tear-off-calendar.png", label: "Agendar Consulta" },
    { iconUrl: "https://img.icons8.com/sf-black/64/FFFFFF/list.png", label: "Tabelas" }
    ]

    const activeItem = inject('activeItem')

    function setActive(label) {
    if (activeItem?.value !== undefined) {
        activeItem.value = label
    } else {
        activeItem.value = label
    }
    }
</script>

<template>
  <div class="sidebar">
    <div class="header">
      <p class="logo">PetCode</p>
    </div>

    <div class="list">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="iconBox"
        :class="{ 'icon--active': activeItem === item.label || activeItem?.value === item.label }"
        @click="setActive(item.label)"
      >
        <img :src="item.iconUrl" :alt="item.label" class="imgIcon" />
        <span class="label">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #332D8A;
  height: 100%;
  width: 100%;
}
.header {
  width: 100%;
  height: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.logo {
  font-family: "Poppins";
  color: #fff;
  font-size: 53px;
  font-weight: bold;
}
.list {
  width: 100%;
}
.iconBox {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 40px;
  margin-bottom: 20px;
  gap: 25px;
  cursor: pointer;
  transition: transform 0.2s;
}
.icon--active {
  background-color: #726adf;
  padding: 15px 1px 15px 45px;
}
.label {
  font-size: 17px;
  font-family: "Roboto";
  font-weight: bold;
  color: #fff;
}
.imgIcon {
  width: 30px;
  height: 30px;
}
</style>
