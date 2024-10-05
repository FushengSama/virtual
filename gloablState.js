// globalState.js
import { reactive } from 'vue';

export const globalState = reactive({
  globalVariable: 0
});

export function setGlobalVariable(newValue) {
  globalState.globalVariable = newValue;
}
