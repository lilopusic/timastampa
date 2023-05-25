<script setup>
import { computed, onUnmounted, ref, shallowRef } from 'vue'
import dayjs from 'dayjs'
import TimeStampConvert from './components/TimeStampConvert.vue'

const formatPattern = ref('YYYY-MM-DD HH:mm:ss.SSS')
const counter = ref(1)

const current = shallowRef(dayjs())
const currentTimeStamp = computed(() => current.value.valueOf())
const currentDateTime = computed(() => current.value.format(formatPattern.value))

const handler = setInterval(() => {
  current.value = dayjs()
}, 3000)

onUnmounted(() => {
  clearInterval(handler)
})

function copy() {
  navigator.clipboard.writeText(currentTimeStamp.value)
}
</script>

<template>
  <div class="formatContainer">
    <span />
    <input v-model="formatPattern" class="format" type="text" placeholder="Formatter Pattern">
  </div>
  <div v-for="i in counter" :key="i" class="convertContainer">
    <TimeStampConvert :pattern="formatPattern" />
  </div>
  <div class="addContainer">
    <button class="add" @click="counter++">
      ＋
    </button>
  </div>
  <div class="current">
    <div>
      Current: <b>{{ currentTimeStamp }}</b> &nbsp; <span>{{ currentDateTime }}</span>
    </div>
    <button class="copy" @click="copy">
      copy
    </button>
  </div>
</template>

<style scoped>
.convertContainer {
  margin-top: 10px;
  border: 2px solid transparent;
  border-radius: 10px;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  background-image: linear-gradient(to right, rgb(255, 198, 0), rgb(246, 84, 174)),
                    linear-gradient(90deg, rgb(255, 198, 0), rgb(246, 84, 174));
}
.convertContainer:first-child {
  margin-top: 0;
}

.addContainer {
  text-align: center;
}

.add {
  display: inline-block;
  outline: 0;
  border: 0;
  cursor: pointer;
  text-decoration: none;
  position: relative;
  color: #000;
  background: #fff;
  line-height: 30px;
  border-radius: 40px;
  padding: 1px;
  font-size: 30px;
  font-weight: 600;
  box-shadow: rgb(255, 198, 0) -2px -2px 0px 2px, rgb(246, 84, 174) 0px 0px 0px 4px, rgba(0, 0, 0, 0.05) 0px 0px 2px 7px;
  transition: all 0.2s;
}

.add:hover {
  box-shadow: rgb(246, 84, 174) -2px -2px 0px 2px, rgb(255, 198, 0) 0px 0px 0px 4px, rgba(0, 0, 0, 0.05) 0px 0px 2px 7px;
  transform: scale(1.01);
}

.copy {
  display: inline-block;
  outline: 0;
  border: 0;
  cursor: pointer;
  background: #000000;
  color: #FFFFFF;
  border-radius: 8px;
  padding: 8px 24px 8px;
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
  transition: transform 200ms, background 200ms;
}

.copy:hover {
  transform: translateY(-1px);
}

.current {
  margin-top: 5px;
  margin-left: 5px;
  font-size: medium;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.formatContainer {
  display: flex;
  padding: 8px;
}
.format {
  border: 1px solid #000;
  border-radius: 5px;
  height: 40px;
  line-height: normal;
  color: #282828;
  display: inline-block;
  box-sizing: border-box;
  user-select: auto;
  font-size: 16px;
  padding: 0 6px;
  padding-left: 12px;
  flex: 1;
}

.format:hover {
  border: 1px solid #5551ff;
}
</style>
