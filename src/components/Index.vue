<template>
    <button
        class="${name}"
        :style="{ ...mainCssVars, ...normalStyle, ...focusStyle }"
        v-on="mainEventListener"
        v-show="isShow"
    >
        <span v-on="textEventListener">
            {{(dataset[0] && dataset[0].content) || '按钮'}}
        </span>

    </button>
</template>

<script>
export default {
    name: "${name}",
    version: "1.0.0",
    props: {
        config: {
            type: Object,
            default: () => {
                return {
                    option: {
                        base: {
                            normal: {
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
                                backgroundColor: "#409eff"
                            },
                            focus: {
                                font: {
                                    fontFamily: "Microsoft YaHei",
                                    fontSize: 14,
                                    fontWeight: "normal",
                                    fontStyle: "normal",
                                    color: "#000",
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
                                backgroundColor: "#fff"
                            },
                        },
                    },
                };
            },
        },
        datasource: {
            type: Object,
            default: () => {
                return {
                    dataset: [
                        {
                            content: '按钮'
                        }
                    ],
                };
            },
        }
    },
    data() {
        return {
            isShow: this.config.main.defaultAction.show || true,
            option: this.config.option,
            errorUrl:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAgCAYAAABgrToAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LjE2NDc1MywgMjAyMS8wMi8xNS0xMTo1MjoxMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0M0QkVFQ0YxNTI0MTFFQzkzMTNFRjAxNTY4MTc0QUMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0M0QkVFRDAxNTI0MTFFQzkzMTNFRjAxNTY4MTc0QUMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3QzRCRUVDRDE1MjQxMUVDOTMxM0VGMDE1NjgxNzRBQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3QzRCRUVDRTE1MjQxMUVDOTMxM0VGMDE1NjgxNzRBQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ph45UV0AAAInSURBVHjazJhLKEVBGMcHl8hCkVgSojwX7IgsJLGRJErCwiMRGxsbKRZKyWvhTVJEwkaSlTySyJIiSV4livKI/9R3aprOcR7Xdeer37l35s698+vM43xzfdjspz9jrAyEMbXiEcy7cGkHnUzNiPLFJYapGzEuqWIQnHlZKhY0agVZcBFse1kwRxT0ZYqH8oIub6xMkAcewBp4V0mwACyDACofgyzwosoQDwhyPFJBnUpzMFqnLuGvBH1ACgh0Q/BAp27nLwRDwQbNmX0Q7lCwGlwK5Vkw6e4i4UOwSjs8j2SwBXLBvU3BUxBHI/EgyTq6g/lgV5DTIokkndzJD3BoRc5MsAWsgxAqX4Na8OxQkvdVCBLdfZLwbWAU9Amf88mdAcZok7Ur6QdmaKqcgAqngryjTVAj1M2DbHBD5T2bklxuGpQLfU5blZQFp2hn16KDfvhNamdVUpZjkmSVXcEgen0FxaALfBt810xST66ZhlnrewLU252DVyCTnplmYSQZqSPXAPpBiSDJY+g3SVmQN04HRzYWmp7kmY7cML1/J8klqd82K4IL4M7B3iZLBhvIMUGyFMwJdb10gPNYsiBL8rgFKwbtv0ClJNkNWj2ZzciSESZHWk1yXKgr8nS6pUk+CYuOmUjyJ9TIf2bUXDKe8r99C+2/aa4yOYH1ZMp/Z3PBaZI8mWgyEuTLP02lk6Ys2Kjiufhc4WPxOb+DPeCCKfr3248AAwBbD3+JkNJ8WwAAAABJRU5ErkJggg==",
            // 组件中数据驱动部分的数据
            mainEventListener: {},
            textEventListener: {},
            dataset: this.datasource.dataset,
        };
    },
    computed: {
        mainCssVars() {
            const { left, top, width, height } = this.config.main.layout;
            const { padding, opacity, backgroundImage, backgroundColor } = this.config.main;
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

        normalStyle() {
            const { font, offset, boxtShadow, img, backgroundColor } = this.config.option.base.normal;
            return {
                "--normalShadowX": boxtShadow.show ? `${boxtShadow.offset.x}px` : null,
                "--normalShadowY": boxtShadow.show ? `${boxtShadow.offset.y}px` : null,
                "--normalShadowRadius": boxtShadow.show
                    ? `${boxtShadow.radius}px`
                    : null,
                "--normalShadowColor": boxtShadow.show ? boxtShadow.color : null,

                "--normalTransiformX": `${offset.x}px`,
                "--normalTransiformY": `${offset.y}px`,

                // 文本样式
                "--normalFontFamily": font.fontFamily,
                "--normalFontSize": `${font.fontSize}px`,
                "--normalFontWeight": font.fontWeight,
                "--normalFontStyle": font.fontStyle,
                "--normalColor": font.color,

                "--normalImg": `${img}`,
                "--normalBackgroundColor": backgroundColor,
            };
        },

        focusStyle() {
            const { font, offset, boxtShadow, img, backgroundColor } = this.config.option.base.focus;
            return {
                "--focusShadowX": boxtShadow.show ? `${boxtShadow.offset.x}px` : null,
                "--focusShadowY": boxtShadow.show ? `${boxtShadow.offset.y}px` : null,
                "--focusShadowRadius": boxtShadow.show
                    ? `${boxtShadow.radius}px`
                    : null,
                "--focusShadowColor": boxtShadow.show ? boxtShadow.color : null,

                "--focusTransiformX": `${offset.x}px`,
                "--focusTransiformY": `${offset.y}px`,

                // 文本样式
                "--focusFontFamily": font.fontFamily,
                "--focusFontSize": `${font.fontSize}px`,
                "--focusFontWeight": font.fontWeight,
                "--focusFontStyle": font.fontStyle,
                "--focusColor": font.color,

                "--focusImg": `${img}`,
                "--focuslBackgroundColor": backgroundColor,
            };
        }
    },
    methods: {
        //组件加载时调用一次
        init() {
            console.log('init button ......');
        },

        // 组件配置和数据源发生变化事调用，只有一个有变化时，另外一个为null
        updateConfig(configMap) {
            // 组件的option发生变化时调用
        },

        updateDataset() {
            // 组件的option发生变化时调用
        },

        //组件销毁时调用
        destroy() {
            //组件销毁时调用
        },

        // 统一的事件注册方法
        addEventListener(event, element) {
            if (!element) { //全局
                if (!this.mainEventListener[event]) {
                    this.$set(this.mainEventListener, event, () => {
                        this.$emit(
                            'executeComponentInteraction',
                            this.instanceId,
                            {
                                event,
                                element
                            },
                            {
                                value: (this.dataset[0] && this.dataset[0].content) || '按钮',
                                dimensionKey: 'content',
                                datasetIndex: 0
                            }
                        );
                    });
                }
            }
            else if (element === 'text') {
                if (!this.textEventListener[event]) {
                    this.$set(this.textEventListener, event, (e) => {
                        e.stopPropagation(); // 如果区域重叠，阻止冒泡
                        this.$emit(
                            'executeComponentInteraction',
                            this.instanceId,
                            {
                                event,
                                element
                            },
                            {
                                value: (this.dataset[0] && this.dataset[0].content) || '按钮',
                                dimensionKey: 'content',
                                datasetIndex: 0
                            }
                        );
                    });
                }
            }
        },

        // 统一的事件取消方法
        removeEventListener(event, element) {
            if (!element) { //全局
                delete this.mainEventListener[event]
            }
            else if (element === 'text') {
                delete this.textEventListener[event]
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.${name} {
    /* 基本 */
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
    overflow: hidden;

    /* 文字样式 */
    font-family: var(--normalFontFamily);
    font-size: var(--normalFontSize);
    font-weight: var(--normalFontWeight);
    font-style: var(--normalFontStyle);
    color: var(--normalColor);
    background-color: var(--normalBackgroundColor);
    background-image: var(--normalImg);
    border-width: 0px;
    text-shadow: var(--normalShadowX) var(--normalShadowY) var(--normalShadowRadius) var(--normalShadowColor);
    & > span {
        display: inline-block;
        transform: translate(
            var(--normalTransiformX),
            var(--normalTransiformY)
        );
    }


    &:active {
        /* 文字样式 */
        font-family: var(--focusFontFamily);
        font-size: var(--focusFontSize);
        font-weight: var(--focusFontWeight);
        font-style: var(--focusFontStyle);
        color: var(--focusColor);
        background-color: var(--focuslBackgroundColor);
        background-image: var(--focusImg);

        text-shadow: var(--focusShadowX) var(--focusShadowY) var(--focusShadowRadius) var(--focusShadowColor);

        & > span {
            transform: translate(
                var(--focusTransiformX),
                var(--focusTransiformY)
            );
        }
    }
}
</style>
