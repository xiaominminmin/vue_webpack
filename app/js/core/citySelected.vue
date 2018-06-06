<template>
    <div :class="$style.hotCity">
        <div :class="$style.hotTit">热门城市/国家(支持汉字/拼音/英文字母)</div>
        <ul :class="$style.tabNav">
            <li :class="[current == index ? $style.hotSelected : '']"  v-for="(item, index) in tabNavName" @click="current = index">
                <Panel :title="item"></Panel>
            </li>
        </ul>
        <div :class="$style.tabContent">
            <div :class="$style.tabPanel" v-show="current == index" v-for="(items, index) in tabContent" :key="index">
                <dl v-for="(item, key) in items">
                    <dt>{{ key == 'hotCity' ? '' : key }}</dt>
                    <dd>
                        <span v-for="(item2) in item" @click="selectCity(item2)">
                            <a>{{ item2 }}</a>
                        </span>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</template>

<script>
import Panel from '../core/panel.vue'
export default {
  components: {
    Panel
  },
  props: {
    cname: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      panelClass: 'panel',
      current: 0,
      tabNavName: ['热门城市', 'ABCDE', 'FGHJ', 'KLMNP', 'QRSTW', 'XYZ'],
      tabContent: [
        { hotCity: ['北京', '上海', '广州', '深圳', '成都', '重庆', '厦门', '昆明', '杭州', '西安', '武汉', '长沙', '南京', '大连', '郑州', '青岛', '天津', '三亚', '海口', '乌鲁木齐'] },
        { A: ['安庆', '阿勒泰', '安康', '阿克苏', '安顺'],
          B: ['包头', '北海', '北京', '百色', '保山'],
          C: ['长治', '长春', '常州', '昌都', '朝阳', '常德', '长白山', '成都', '重庆', '长沙', '赤峰', '潮州'],
          D: ['大同', '大连', '达县', '东营', '大庆', '丹东', '大理', '敦煌', '稻城', '德令哈'],
          E: ['鄂尔多斯', '恩施']
        },
        { F: ['福州', '阜阳'],
          G: ['贵阳', '桂林', '广州', '广元', '格尔木', '固原'],
          H: ['呼和浩特', '哈密', '黑河', '海拉尔', '哈尔滨', '海口', '黄山', '杭州', '邯郸', '合肥', '汉中', '和田', '淮安', '河池'],
          J: ['晋江', '九寨沟', '锦州', '景德镇', '嘉峪关', '井冈山', '济宁', '九江', '佳木斯', '济南', '揭阳']
        },
        { K: ['喀什', '昆明', '康定', '克拉玛依', '库尔勒', '库车'],
          L: ['兰州', '洛阳', '丽江', '拉萨', '黎平', '连城', '连云港', '临沧', '临汾', '临沂', '林芝', '六盘水', '柳州', '泸州'],
          M: ['牡丹江', '芒市', '满洲里', '绵阳', '梅县', '漠河'],
          N: ['南京', '南充', '南宁', '南阳', '南通', '那拉提', '南昌', '宁波'],
          P: ['攀枝花']
        },
        { Q: ['衢州', '秦皇岛', '庆阳', '齐齐哈尔', '青岛'],
          S: ['深圳', '石家庄', '三亚', '沈阳', '上海', '思茅', '神农架', '邵阳'],
          T: ['铜仁', '塔城', '腾冲', '台州', '泰州', '天津', '通辽', '太原'],
          W: ['威海', '武汉', '梧州', '文山', '无锡', '潍坊', '武夷山', '乌兰浩特', '温州', '乌鲁木齐', '万州', '乌海']
        },
        { X: ['兴义', '西昌', '厦门', '西安', '襄阳', '西宁', '锡林浩特', '西双版纳', '忻州', '徐州'],
          Y: ['义务', '永州', '榆林', '延安', '运城', '烟台', '银川', '宜昌', '宜宾', '盐城', '延吉', '玉树', '伊宁', '扬州'],
          Z: ['珠海', '昭通', '张家建', '舟山', '郑州', '中卫', '芷江', '湛江', '遵义新舟', '遵义茅台']
        }
      ]
    }
  },
  methods: {
    selectCity (item2) {
      this.$emit('currentSelectCity', item2)
    }
  }
}
</script>

<style lang="scss" module>
    @import "../../css/reset.scss";
    .hotCity {
        padding: 10px 0;
        background: #fff;
        overflow: hidden;
        zoom: 1;
        border: 1px solid #bec2c4;
        border-right-color: #bec2c4;
        border-bottom-color: #bec2c4;
        .hotTit {
            padding: 12px;
        }
        .tabNav {
            list-style: none;
            overflow: hidden;
            zoom: 1;
            position: relative;
            z-index: 5;
            padding: 12px 40px 0;
            height: 176px;
            li {
                list-style: none;
                float: left;
                border: 0;
                border-bottom-color: #bec2c4;
                padding: 0 24px;
                margin-right: 6px;
                line-height: 170px;
                cursor: pointer;
                background: #fff;
            }
            .hotSelected {
                padding: 0 20px;
                border: 1px solid #b3c2c4;
                border-bottom:10px solid #fff;
                background: #fff;
            }
        }
        .tabContent {
            border-top: 1px solid #bec2c4;
            margin-top: -1px;
            padding: 24px 0;
            line-height: 176px;
            zoom: 1;
            position: relative;
            .tabPanel {
                line-height: 176px;
                dt {
                    float: left;
                    padding-left: 6px;
                    color: #f30;
                    text-indent: 10px;
                    font-family: "Lucida console",consolas,"courier new";
                    line-height: 176px;
                    font-size: 14px;
                }
                dd {
                    margin-left: 60px;
                    overflow: hidden;
                    zoom: 1;
                    span {
                        float: left;
                        padding-left: 16px;
                        width: 350px;
                        text-align: left;
                        a {
                            color: #404040;
                            padding: 0 8px;
                        }
                    }
                }
            }
        }
    }
</style>
