// globalState.js
import { reactive } from 'vue';

export const globalState = reactive({
  globalVariable: 0,
  globalIndex:""
});

export function setGlobalVariable(newValue) {
  globalState.globalVariable = newValue;
}
export function setGlobalIndex(newIndex){
  globalIndex.globalIndex = newIndex;
}
