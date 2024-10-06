<!--
 * @Author: zhangzhe 437050740@qq.com
 * @Date: 2024-09-22 14:30:54
 * @LastEditors: zhangzhe 437050740@qq.com
 * @LastEditTime: 2024-09-22 15:56:59
 * @FilePath: \marketf:\web\liangda-navigator\src\components\content\AppBodyBgCom\AppBodyBgCom.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
 <!--
计时器组件-->
<template>
    <div class="app-top">
        <img src="./images/labelTop.png" class="app-top-bg" alt="">
        <div class="app-title">
            量大校园文化导览
        </div>
        <div class="app-menu">
            <el-dropdown>
                <span class="el-dropdown-link">
                    {{ campusGroup[theCampusIndex] }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                        
                    </el-icon>
                </span>
                <template #dropdown>
                    <div class="app-menu-view">
                        <div class="app-menu-view-child" v-for="(item, index) in campusGroup" :key="index"
                            @click="theCampusIndex = index;switchLoc(theCampusIndex)">{{ item }}</div>
                            
                    </div>
                </template>
            </el-dropdown>
        </div>
        <!-- 时间信息展示 -->
        <div class="top-information">
            <div>
                <span>{{ yearMonthDay }}</span>
                <span style="margin: 0 1.6vh;">{{ DayOfWeek }}</span>
                <span>{{ hours }}:{{ minutes }}:{{ seconds }}</span>
            </div>
        </div>
    </div>
    
</template>



 
<script setup>


import { ArrowDown } from '@element-plus/icons-vue'
import { onMounted, onUnmounted, ref,inject } from "vue";
import { getTime, getTimeChinese, getDayOfWeek } from "@/utils/getTime";

import { setGlobalVariable } from '../../../../gloablState';
import { globalState } from '../../../../gloablState';//使用全局变量记录当前是东区还是西区

/*
import indexPage from '../../../views/indexPage/indexPage.vue';

export default {
  data() {
    return {
      valueFromParent: theCampusIndex
    };
  },
  components: {
    indexPage
  }
};*/








const theCampusIndex = ref(0);
let mapDom = inject("mapDom");
const campusGroup = ref(["西校区","东校区"]);
var yearMonthDay = ref('00年00月00天');//年月日时间
var hours = ref('00');//小时
var minutes = ref('00');//分钟
var seconds = ref('00');//秒
var DayOfWeek = ref('星期一');


//切换东区西区视角同时给全局变量赋值
function switchLoc(theCampusIndex1){
    //alert(theCampusIndex1);
    setGlobalVariable(theCampusIndex1);
    var indexValue=theCampusIndex1;


    let viewId = "";//视角id
    let type = { typeDatas: [] };//类型数据
    if(indexValue!==globalState.globalVariable){
    if (theCampusIndex1===0)
{
        //楼宇
        viewId = "3056";
        type.typeDatas = ["1200"];
        //alert('0');
    }   
    else{
        //楼宇
        viewId = "3098";
        type.typeDatas = [""];
        //alert('1')
    }   
    
    
    //切换场景视角
    if (viewId) mapDom.value.callAction("switchSceneView", viewId)
    {mapDom.value.callAction("toggleTypePointVisibility", JSON.stringify(type));}
}
}

let setInTime//定义时间定时器
onMounted(() => {
    setInTime = setInterval(() => {
        let HMS = getTime()
        hours.value = HMS.hours
        minutes.value = HMS.minutes
        seconds.value = HMS.seconds

        let getYearMonthDay = getTimeChinese()
        yearMonthDay.value = getYearMonthDay.basicsTime

        DayOfWeek.value = getDayOfWeek()
    }, 1000);
    
    
});
//组件结束销毁定时器
onUnmounted(() => {
    window.clearInterval(setInTime)
})




</script>









<style lang="scss">
.el-dropdown-link {
    margin-left: 112px;
    top:18px;
    @font-face {
        font-family: "优设标题";
        src: url("/src/assets/fonts/YouSheBiaoTiHei-2.ttf");
    }
    display: flex;
    //align-items: center;
    font-weight: bold;
    font-size: 2vh;
    color: #1F4470;
}

.el-scrollbar .app-menu-view {
    width: 100px;
    height: 90px;
    padding: 0.5vh 0;

    .app-menu-view-child {
        line-height: 45px;
        font-family: 'NotoSansHans-Regular';
        font-size: 1.5vh;
        color: #1F4470;
        text-align: center;
        cursor: pointer;
    }

    .app-menu-view-child:hover {
        background: linear-gradient(0deg, #3ACAFF, #2486FF);
        color: #FFFFFF;
    }
}
.el-icon--right{
    @font-face {
        font-family: "优设标题";
        src: url("/src/assets/fonts/YouSheBiaoTiHei-2.ttf");
    }
    top: 26px;
    left: 12px;
}
.app-top {
    width: 100;
    height: 87px;
    position: relative;
    top: 0;
    left: 0;

    .app-top-bg {
        //height: 100px;
        width: 100%;
    }

    .app-title {
        @font-face {
            font-family: "优设标题";
            src: url("/src/assets/fonts/YouSheBiaoTiHei-2.ttf");
        }
        font-weight: bold;
        font-size: 38px;
        color: #1F4470;
        position: absolute;
        top: 22px;
        left: 66px;
        //margin-right: 112px;


        
    }
    .app-menu {
        position: absolute;
        margin-left: 512px;
        top: 18px;
        @font-face {
            font-family: "优设标题";
            src: url("/src/assets/fonts/YouSheBiaoTiHei-2.ttf");
        }
        font-size: 30px;
    }
    

    .top-information {
        display: flex;
        justify-content: space-between;
        position: absolute;
        top: 24px;
        right: 28px;
        @font-face {
            font-family: "优设标题";
            src: url("/src/assets/fonts/YouSheBiaoTiHei-2.ttf");
        }
        font-size: 22px;
        span {
            font-size: 22px;
            font-weight: bold;
            color: #1F4470;
            line-height: 17px;
        }
    }
}
</style>