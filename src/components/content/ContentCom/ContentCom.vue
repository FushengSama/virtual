<!--
 * @Author: zhangzhe 437050740@qq.com
 * @Date: 2024-09-22 16:36:55
 * @LastEditors: zhangzhe 437050740@qq.com
 * @LastEditTime: 2024-09-25 00:49:00
 * @FilePath: \marketf:\web\liangda-navigator\src\components\content\ContentCom\contentCom.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div :class="`content-com content-com-size${styleId}`">
        <img src="./images/close-icon.png" class="close-btn" @click="closeBtnClick" alt="">
        <slot />
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, defineProps, defineEmits } from "vue";
defineProps({
    styleId: {
        type: Number,
        default: 0
    },
});
const emits = defineEmits(["closeBtnClick"]);
onMounted(() => {
});
onUnmounted(() => {
})
function closeBtnClick(){
    emits("closeBtnClick");
}
</script>
<style lang="scss">
.content-com-size0 {
    position: absolute;
    height: 627px;
    width: 1063px;
    top: 260px;
    left: 450px;
    background-image: url("./images/content-bg0.png");
}

.content-com-size1,
.content-com-size2 {
    position: absolute;
    height: 320px;
    width: 640px;
    top: 305px;
    left: 640px;
}

.content-com-size3 {
    height: 68.5vh;
    width: 44.4vh;
    background-image: url("./images/content-bg3.png");
}

.content-com-size1 {
    background-image: url("./images/content-bg1.png");
}

.content-com-size2 {
    background-image: url("./images/content-bg2.png");
}

.content-com {
    background-size: 100% 100%;
    position: fixed;

    display: flex;
    flex-direction: column;
    align-items: center;

    .close-btn {
        width: 40px;
        height: 40px;
        position: absolute;
        top: 16px;
        right: 16px;
        cursor: pointer;
    }
}
</style>