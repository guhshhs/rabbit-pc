<!-- src/components/XtxCity.vue -->
<template >
    <div class="xtx-city">
        <div class="select" @click="visible = true">
            <span class="placeholder">{{ span }}</span>
            <span class="value"></span>
            <i class="iconfont icon-angle-down"></i>
        </div>
        <div class="option" v-if="visible" ref="target">
            <span class="ellipsis" v-for="i in cachedCities" @click="updateCities(i.code)" :key="i.code">{{ i.name }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
interface City {
    code: string;
    level: number;
    name: string;
    areaList: City[];
}

type AddressName = {
    provinceName: string;
    cityName: string;
    countyName: string;
};

let visible = ref(false);
const target = ref()
let cachedCities = ref<City[]>([])
const arr = ref<string[]>([])
const span = ref<string>('请选择你的城市')
// 城市筛选器
const fullLocation = ref<AddressName>({
    provinceName: '', cityName: '', countyName: ''
})

onClickOutside(target, () => visible.value = !visible);
watch(() => visible.value, async () => {
    if (visible.value) {
        let response = await axios.get(
            "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json"
        );
        cachedCities.value = response.data
    } else {
        if (arr.value.length < 3) arr.value.splice(0, arr.value.length)
    }
})

const updateCities = (code: string) => {
    arr.value.push(cachedCities.value.filter(i => i.code === code)[0].name)
    if (cachedCities.value.filter(i => i.code === code)[0].areaList) {
        cachedCities.value = cachedCities.value.filter(i => i.code === code)[0].areaList
    } else {
        visible.value = false
    }
}

watch(arr.value, () => {
    if (arr.value.length >= 3) {
        span.value = arr.value.join(' ')
        arr.value.splice(0, arr.value.length)
    }
})




</script>
  
<style scoped lang="less">
.xtx-city {
    display: inline-block;
    position: relative;
    z-index: 400;

    .select {
        border: 1px solid #e4e4e4;
        height: 30px;
        padding: 0 5px;
        line-height: 28px;
        cursor: pointer;

        &.active {
            background: #fff;
        }

        .placeholder {
            color: #999;
        }

        .value {
            color: #666;
            font-size: 12px;
        }

        i {
            font-size: 12px;
            margin-left: 5px;
        }
    }

    .option {
        width: 542px;
        border: 1px solid #e4e4e4;
        position: absolute;
        left: 0;
        top: 29px;
        background: #fff;
        min-height: 30px;
        line-height: 30px;
        display: flex;
        flex-wrap: wrap;
        padding: 10px;

        >span {
            width: 130px;
            text-align: center;
            cursor: pointer;
            border-radius: 4px;
            padding: 0 3px;

            &:hover {
                background: #f5f5f5;
            }
        }
    }
}
</style>