<!--
 * @Author: zhangzhe 437050740@qq.com
 * @Date: 2024-09-22 14:30:54
 * @LastEditors: zhangzhe 437050740@qq.com
 * @LastEditTime: 2024-09-25 01:40:49
 * @FilePath: \marketf:\web\liangda-navigator\src\views\indexPage\indexPage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
    <div class="index-page">
        <!--切换小区-->>
        
        <!-- 左侧按钮 -->
        <NavigationCom @navigationClick="navigationClick" />
        <!-- 右侧按钮 -->
        <OperateBtnCom :data="operateData" @operateBtnClick="operateBtnClick" />
        <!-- 点位详情页 -->
        <ContentCom :styleId="3" v-if="pointDetailsData" @closeBtnClick="pointDetailsData = null">
            <GlobalTitle :title="pointDetailsData.name" style="margin-top:3vh;" />
            <details-content :data="pointDetailsData" :htmlBool="true" style="padding: 2vh 0;box-sizing: border-box;" />
        </ContentCom>
        <!-- 详情页 -->
        <ContentCom v-if="swiperContentData.length != 0" @closeBtnClick="clearData">
            <GlobalTitle :title="theOperateData.type" style="margin-top:3vh;" />
            <SwiperCom :data="swiperContentData" @swiperSlideClick="swiperSlideClick" />
        </ContentCom>
        <!-- 轮播图页面 -->
        <ContentCom v-if="detailsContentData" @closeBtnClick="detailsContentData = null;">
            <GlobalTitle :title="detailsContentData.title" style="margin-top:3vh;" />
            <schoolContent :data="detailsContentData" />
        </ContentCom>
        <!-- 码上带走、操作引导、虚拟博物馆 -->
        <ContentCom :styleId="theOperateData?.styleId"
            v-if="theOperateData?.type == '码上带走' || theOperateData?.type == '操作引导' || theOperateData?.type == '虚拟博物馆'"
            @closeBtnClick="theOperateData = null;">
            <template v-if="theOperateData.type == '虚拟博物馆'">
                <GlobalTitle :title="theOperateData.type" style="margin-top:3vh;" />
                <museumContent />
            </template>
        </ContentCom>
        <!-- 卡通人物 -->
        <CartoonCom @sceneAnmClick="sceneAnmClick" />

        <div class="quit-style">退出</div>
    </div>
</template>
<script setup>
import bus from '@/utils/bus.js'
import { onMounted, ref, inject } from "vue";
import detailsContent from './components/detailsContent.vue';
import schoolContent from './components/schoolContent.vue';
import museumContent from './components/museumContent.vue';
import { RequestIntroductionList, RequestIntroductionType, RequestIntroductionId, RequestScenicId } from "@/network/PageRequest.js"
import { globalState } from '../../../gloablState';//使用全局变量记录当前是东区还是西区






let mapDom = inject("mapDom");
const operateData = ref([
    { type: "校园概况" },
    { type: "计量历史" },
    { type: "量大精神" },
    { type: "行为文化" },
    { type: "虚拟博物馆", styleId: 0 },
    { type: "码上带走", styleId: 1 },
    { type: "操作引导", styleId: 2 }
]);//分类数据组
const theOperateData = ref(null);//记录当前点击分类的数据
const detailsContentData = ref(null);//详情页数据
const pointDetailsData = ref(null);//点位详情页数据
const swiperContentData = ref([]);//轮播图页面数据

onMounted(() => {
    RequestIntroductionList().then(res => {
        res.data.forEach((item, index) => {
            operateData.value[index].typeId = item.type;
        });
    });

   
    bus.off();
    //监听场景是否加载成功
    bus.on('sceneLoadComplete', () => {
        setTimeout(()=>{
            navigationClick(0);
        })
    });
    //接受点位点击的数据
    bus.on('pointClickComplete', (pointData) => {
        console.log("点位数据",pointData);
        clearData();//清除旧数据
        RequestScenicIdFun(pointData.index_code);
    });
   
});


//场景漫游点击
function sceneAnmClick(){
    let anmData = {roamId:"76",IsLoop:"0"};
    mapDom.value.callAction("activateRoam", JSON.stringify(anmData));
}


function navigationClick(index) {
    console.log(index);
    let viewId = "";//视角id
    let type = { typeDatas: [] };//类型数据
    if(globalState.globalVariable===0){
        console.log("西区");
    if (index === 0) {
        //楼宇
        viewId = "3056";
        type.typeDatas = ["1200"];
        
        
        
    }   
    else if (index === 1) {
        //道路
        viewId = "3057";
        type.typeDatas = ["1201"];
        
        
    }
    else if (index === 2) {
        //景观
        viewId = "3058";
        type.typeDatas = ["1202"];
    }
    else if (index === 3) {
        //文化景点
        viewId = "3059";
        type.typeDatas = ["1203"];
    }
    else if (index === 4) {
        //寝室楼
        viewId = "3060";
        type.typeDatas = ["1204"];
    }
    else if (index === 5) {
        //校园餐厅
        viewId = "3061";
        type.typeDatas = ["1205"];
    }}
    //东区
    else{
        console.log("当前东区")
        if (index === 0) {
        //楼宇
        viewId = "3098";
        type.typeDatas = ["1200"];
        
        
        
    }   
    else if (index === 1) {
        //道路
        viewId = "3099";
        type.typeDatas = ["1201"];
        //alert(globalState.globalVariable)
        
    }
    else if (index === 2) {
        //景观
        viewId = "3100";
        type.typeDatas = ["1202"];
    }
    else if (index === 3) {
        //文化景点
        viewId = "3101";
        type.typeDatas = ["1203"];
    }
    else if (index === 4) {
        //寝室楼
        viewId = "3102";
        type.typeDatas = ["1204"];
    }
    else if (index === 5) {
        //校园餐厅
        viewId = "3103";
        type.typeDatas = ["1205"];
    }
    }
    
    //切换场景视角
    if (viewId) mapDom.value.callAction("switchSceneView", viewId)
    mapDom.value.callAction("toggleTypePointVisibility", JSON.stringify(type));
}

//右侧分类点击
function operateBtnClick(itemData) {
    theOperateData.value = itemData;
    console.log("itemData", itemData);
    clearData();
    if (itemData.typeId) {
        RequestIntroductionType(itemData.typeId).then(res => {
            if (res.data.length != 0) {
                if (itemData.type == '校园概况' || itemData.type == '行为文化') {
                    //获取详情页数据
                    RequestIntroductionIdFun(res.data[0].id);
                }
                else if (itemData.type == '计量历史' || itemData.type == '量大精神') {
                    //展示轮播图页面数据
                    swiperContentData.value = res.data;
                }
            }
        })
    }
}

//数据清除
function clearData() {
    detailsContentData.value = null;//详情页数据清除
    swiperContentData.value = [];//轮播图页面数据清除
    pointDetailsData.value = null;//点位详情页数据清除
}

//计量历史banner点击
function swiperSlideClick(itemData) {
    RequestIntroductionIdFun(itemData.id);
}

//通过id获取详情页数据
function RequestIntroductionIdFun(id) {
    if (id) {
        RequestIntroductionId(id).then(resData => {
            detailsContentData.value = resData.data;
        })
    }
}

//通过id获取点位详情页数据
function RequestScenicIdFun(id){
    if (id) {
        RequestScenicId(id).then(resData => {
            resData.data.path = [resData.data.path];
            pointDetailsData.value = resData.data;
            console.log("pointDetailsData.value",pointDetailsData.value);
        })
    }
}
</script>
<style lang="scss" scoped>
.index-page {
    width: 100%;
}
</style>