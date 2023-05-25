<script setup>
import { onMounted, ref, watch } from 'vue'
import dayjs from 'dayjs'

const props = defineProps({
  pattern: String,
})
const dom = ref()
const timestamp = ref()
const dateTime = ref()

onMounted(() => {
  dom.value.focus()
  chrome.storage.local.get(['selection']).then((result) => {
    if (result && result.selection) {
      doTimestampChange(parseInt(result.selection))
      chrome.storage.local.set({ selection: null })
    }
  })
})

watch(props, () => {
  if (timestamp.value)
    dateTime.value = dayjs(timestamp.value).format(props.pattern)
})

function dateTimeChange(e) {
  if (e.target.value)
    doDateTimeChange(e.target.value)
  else
    timestamp.value = null
}

function timestampChange(e) {
  if (e.target.value)
    doTimestampChange(parseInt(e.target.value))
  else
    dateTime.value = null
}

function doDateTimeChange(newDateTime) {
  dateTime.value = newDateTime
  timestamp.value = dayjs(dateTime.value).valueOf()
}

function doTimestampChange(newTimestamp) {
  timestamp.value = newTimestamp
  dateTime.value = dayjs(timestamp.value).format(props.pattern)
}
</script>

<template>
  <div class="container">
    <input ref="dom" :value="timestamp" type="number" placeholder="Input Time Stamp" @input="timestampChange">
    <br>
    <input :value="dateTime" type="text" placeholder="Input Date Time" @input="dateTimeChange">
  </div>
</template>

<style  scoped>
input {
    border: 1px solid #000;
    border-radius: 5px;
    height: 50px;
    line-height: normal;
    color: #282828;
    display: block;
    width: 100%;
    box-sizing: border-box;
    user-select: auto;
    font-size: 16px;
    padding: 0 6px;
    padding-left: 12px;
}

input:focus {
    border: 1px solid #5551ff;
}
input:hover {
  border: 1px solid #5551ff;
}
.container {
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    padding: 10px;
    border-radius: 8px;
    background-color: #F3F4F6;
}
</style>
