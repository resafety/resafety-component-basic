import _ from 'lodash';

const changeDoNotUpdateBlackList = [
    'config.main.layout.left',
    'config.main.layout.top',
];

// eslint-disable-next-line no-unused-vars
const diffOptionChangeKey = (newVal, oldVal) => {
    if (newVal && oldVal) {
        // eslint-disable-next-line no-eval
        return changeDoNotUpdateBlackList.some((item) => eval(item.replace('config', 'newVal')) !== eval(item.replace('config', 'oldVal')));
    }

    return false;
};

export default {
    props: {
        instanceId: {
            type: String,
            required: true,
        },
        instanceVersion: {
            type: String,
            required: true,
        },
        instanceName: {
            type: String,
        },
        datasource: {
            type: Object,
            default: () => ({
                dataset: [],
            }),
        },
        interaction: {
            type: Array,
            default: undefined,
        },

        instanceMap: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            dataset: this.datasource.dataset,
            main: this.config.main,
            isShow: this.config.main.defaultAction.show || true,
            eventList: {},
            option: {}, // 各组件自己实现
            layout: this.config.main.layout,
        };
    },
    computed: {
        eventListeners() {
            return { ...this.$listeners, ...this.eventList };
        },
        mainCssVars() {
            const { left, top, width, height } = this.layout;
            const { padding, opacity, backgroundImage, backgroundColor } = this.main;
            return {
                "--left": `${left}px`,
                "--top": `${top}px`,
                "--width": `${width}px`,
                "--height": `${height}px`,
                "--padding": padding,
                "--opacity": opacity,
                "--backgroundColor": backgroundColor,
                "--backgroundImage": `url(${backgroundImage})`,
            };
        },
    },
    methods: {

        /**
         * 组件兼容处理方法
         *     1、在组件初始化前调用，只调用一次
         *     2、必须针对当前版本返回一份新的数据，组件的props相关内容会被设置为新的数据
         * @param {*} originalVersion  组件实例所对应的版本号
         * @param {*} originalPropsData  组件实例数据
         * @returns 新的数据
         */
        compat(originalVersion, originalPropsData) {
            // 在这里根据历史版本号和当前option生成一份新版本的数据（然后调用父组件的方法抛出新数据，由父组件重新设置config ）
            // ...
            // 处理配置数据
            return originalPropsData;
        },

        /**
         * 组件初始化方法
         *     1、初始化时调用，只调用一次
         */
        init() { },


        /**
         * 组件属性修改方法
         *     当组件props中config变化时会被调用，每次变化都会调用
         * @param {*} config
         */
        updateConfig(config) { },


        /**
         * 组件数据修改方法
         *     当组件props中的dataset变化时会被调用，每次变化都会调用
         * @param {*} dataset
         */
        updateDataset(dataset) {
            // console.log(dataset, '-------------')
        },


        /**
         * 组件销毁方法
         *    当组件被销毁时会被调用
         */
        destroy() { },


        /**
         * 组件事件注册方法
         * @param {*} eventName
         * @param {*} triggerElement
         * @param {*} interactionId
         */
        addEventListener(eventName, triggerElement) { },


        /**
         * 组件取消注册方法
         * @param {*} eventName
         * @param {*} triggerElement
         * @param {*} interactionId
         */
        removeEventListener(eventName, triggerElement) { },

        // 组件的行为
        toggle() {
            this.isShow = !this.isShow;
        },
        show() {
            this.isShow = true;
        },
        hide() {
            this.isShow = false;
        },
    },
    beforeCreate() {
        // 处理兼容性
        if (this.$options.methods.compat && this.$options.propsData.instanceVersion !== this.$options.version) {
            const newPropsData = this.$options.methods.compat(this.$options.propsData.instanceVersion, JSON.parse(JSON.stringify(this.$options.propsData)));
            newPropsData.instanceVersion = this.$options.version;

            // 发送新的数据给parent解释器
            this.$emit('setCompatComponentProps', newPropsData);

            return;
        }

        // 处理props的固定key的默认
        // @Todo 需要检验默认值是否定义
        // this.$options.propsData.config = _.merge(this.$options.props.config.default(), this.$options.propsData.config);
        this.$options.propsData.datasource = _.merge(this.$options.props.datasource.default(), this.$options.propsData.datasource);
    },
    created() {
        // eslint-disable-next-line no-useless-return
        if (this.instanceVersion !== this.$options.version) return;
    },
    mounted() {
        // if( this.instanceVersion != this.$options.version ) return
        this.init();
        // 绑定事件
        // eslint-disable-next-line no-useless-return
        if (!this.interaction) return;
        this.interaction.forEach((evt) => {
            this.addEventListener(evt.event, evt.element, evt.id);
        })
    },
    beforeDestroy() {
        this.destroy()
    },
    watch: {
        instanceMap: {
            deep: true,
            handler(value, oldValue) {
                if (value && JSON.stringify(value) !== JSON.stringify(oldValue)) {
                    this.updateConfig(value)
                }
            },
        },
        datasource: {
            deep: true,
            handler(value) {
                const datasource = _.merge(this.$options.props.datasource.default(), this.datasource);
                if (datasource) {
                    // 数据改变时修改暂未处理
                    if (this.updateDataset) this.updateDataset(datasource);
                }
            },
        },
        interaction: {
            deep: true,
            handler() {
                // 在这里处理交互的变化
                // console.log(this.interaction);
            },
        },
    },

};
