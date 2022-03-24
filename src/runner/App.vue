<template>
    <div id="app">
        <${name}
            :class="['component-container']"
            v-bind="instanceData"
            @setCompatComponentProps="setCompatComponentProps"
            @executeComponentInteraction="executeComponentInteraction"
            :key="cKey"
        />
    </div>
</template>

<script>
import ResafetyComponentBase from "./resafety-component-base";
import $upper{name} from "../components/Index.vue";

$upper{name}.mixins = [ResafetyComponentBase];

const instanceData1 = {
    name: "${name}",
    instanceVersion: "1.0.0",
    instanceId: "${name}:10000001",
    config: {
        main: {
            defaultAction: {
                create: true,
                show: true,
            },
            layout: {
                left: 100,
                top: 100,
                width: 96,
                height: 40,
            },
            padding: [0, 0, 0, 0],
            opacity: 1,
            backgroundColor: "#409eff",
            backgroundImage: "",
        },
        option: {
            isBase: false,
            base: {
                normal: {
                    font: {
                        fontFamily: "微软雅黑",
                        fontSize: 18,
                        fontWeight: "400",
                        fontStyle: "normal",
                        color: "#FFFFFF",
                    },
                    offset: {
                        x: 0,
                        y: 0,
                    },
                    text: {
                        textAlign: "center",
                    },
                    ellipsis: {
                        isEllipsis: false,
                        lineHeight: 1,
                    },
                    boxtShadow: {
                        show: true,
                        color: "",
                        offset: {
                            x: 0,
                            y: 0,
                        },
                        radius: "",
                    },
                    backgroundColor: "#409eff",
                },
                focus: {
                    font: {
                        fontFamily: "Microsoft YaHei",
                        fontSize: 14,
                        fontWeight: "normal",
                        fontStyle: "normal",
                        color: "#fff",
                    },
                    offset: {
                        x: 0,
                        y: 0,
                    },
                    boxtShadow: {
                        show: true,
                        color: "",
                        offset: {
                            x: 0,
                            y: 0,
                        },
                        radius: "",
                    },
                    img: "",
                    backgroundColor: "#27405a",
                },
            },
        },
    },
    datasource: {
        dataset: [{ content: "按钮123" }]
    },
    interaction: [
        {
            id: "10002",
            event: "click",
            element: "",
            target: [
                {
                    component: "${name}:10000001", // 要驱动的组件
                    action: "red", // 被驱动的组件执行什么行为
                    param: null, // 传输的数据
                    // ...
                },
            ],
        },
        {
            id: "10003",
            event: "click",
            element: "text",
            target: [
                {
                    component: "${name}:10000001", // 要驱动的组件
                    action: "red", // 被驱动的组件执行什么行为
                    param: null, // 传输的数据
                    // ...
                },
            ],
        },
        // 其他交互配置信息
    ],
};

export default {
    name: "App",
    components: {
        $upper{name}
    },
    data() {
        return {
            instanceData: instanceData1,
            content1: "aaa",
            cKey: "1001",
        };
    },
    methods: {
        //组件内部处理完兼容后，抛出处理后的数据
        setCompatComponentProps(data) {
            console.log(data);
            this.instanceData = data;
            this.cKey = "1002";
            // debugger
            // 修改组件的key值
            // this.$children[0].$vnode.key = (new Date()).getTime();
        },

        //触发了组件的某个事件后，执行该事件对应的交互
        executeComponentInteraction(instanceId, {event, element}, {value, dimensionKey, datasetIndex}) {
            console.log( `-- 触发事件 -
                组件实例：${instanceId}
                事件类型：${event}
                交互区域： ${element}
                数据维度：${dimensionKey}
                数据行索引：${datasetIndex}
                数据值：${value}` );
            // const action = this.instanceData.interaction[0].target[0].action; //@Todo 根据组件实例id和交互id找到绑定的行为
            // console.log( action );
            // this.$children[0][action]( /* 参数 */);
        },
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
.component-container {
    position: absolute;
    left: var(--left);
    top: var(--top);
    width: var(--width);
    height: var(--height);
    opacity: var(--opacity);
    padding: var(--padding);
    background-color: var(--backgroundColor);
    background-image: var(--backgroundImage);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    box-sizing: border-box;
}
</style>
