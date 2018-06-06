<template>
    <div :class="$style.home">
        <h4>出发城市：</h4>
        <input type="text" :class="$style.autocompleteInput" name="depCityName" @input="GetValue" @focus="focusFlag = true" placeholder="城市名" v-model="cityName" autocomplete="off">
        <div :class="$style.resultMessage" v-if="Object.keys(findArray).length === 0 && cityName && showNoFlag">
            没有"<span :class="$style.messageHeightLight">{{cityName}}</span>"相关的推荐
        </div>
        <div :class="$style.ResultsList" v-if="findArray.length > 0">
            <div :class="$style.list">
                <div :class="$style.item" v-for="item in findArray" @click="cityName = item.value; findArray = []; showNoFlag = false">
                    <div :class="$style.itemInner">
                        <span :class="$style.name">{{item.value}}</span>
                        <span :class="$style.intro">{{item.id | ConvertStrFirst}}</span>
                    </div>
                </div>
            </div>
        </div>
        <citySelected v-if="focusFlag" @currentSelectCity="currentSelectCity"></citySelected>
    </div>
</template>
<script>
import citySelected from '../../js/core/citySelected.vue'
const reg = /[a-zA-Z\u4e00-\u9fa5]/
const regSpell = /[a-zA-Z]/
const regStr = /[\u4e00-\u9fa5]/
export default {
  data () {
    return {
      cityName: '',
      showNoFlag: false,
      focusFlag: false,
      findArray: [],
      tabContentStr: {
        A: ['安庆', '阿勒泰', '安康', '阿克苏', '安顺'],
        B: ['包头', '北海', '北京', '百色', '保山'],
        C: ['长治', '长春', '常州', '昌都', '朝阳', '常德', '长白山', '成都', '重庆', '长沙', '赤峰', '潮州'],
        D: ['大同', '大连', '达县', '东营', '大庆', '丹东', '大理', '敦煌', '稻城', '德令哈'],
        E: ['鄂尔多斯', '恩施'],
        F: ['福州', '阜阳'],
        G: ['贵阳', '桂林', '广州', '广元', '格尔木', '固原'],
        H: ['呼和浩特', '哈密', '黑河', '海拉尔', '哈尔滨', '海口', '黄山', '杭州', '邯郸', '合肥', '汉中', '和田', '淮安', '河池'],
        J: ['晋江', '九寨沟', '锦州', '景德镇', '嘉峪关', '井冈山', '济宁', '九江', '佳木斯', '济南', '揭阳'],
        K: ['喀什', '昆明', '康定', '克拉玛依', '库尔勒', '库车'],
        L: ['兰州', '洛阳', '丽江', '拉萨', '黎平', '连城', '连云港', '临沧', '临汾', '临沂', '林芝', '六盘水', '柳州', '泸州'],
        M: ['牡丹江', '芒市', '满洲里', '绵阳', '梅县', '漠河'],
        N: ['南京', '南充', '南宁', '南阳', '南通', '那拉提', '南昌', '宁波'],
        P: ['攀枝花'],
        Q: ['衢州', '秦皇岛', '庆阳', '齐齐哈尔', '青岛'],
        S: ['深圳', '石家庄', '三亚', '沈阳', '上海', '思茅', '神农架', '邵阳'],
        T: ['铜仁', '塔城', '腾冲', '台州', '泰州', '天津', '通辽', '太原'],
        W: ['威海', '武汉', '梧州', '文山', '无锡', '潍坊', '武夷山', '乌兰浩特', '温州', '乌鲁木齐', '万州', '乌海'],
        X: ['兴义', '西昌', '厦门', '西安', '襄阳', '西宁', '锡林浩特', '西双版纳', '忻州', '徐州'],
        Y: ['义务', '永州', '榆林', '延安', '运城', '烟台', '银川', '宜昌', '宜宾', '盐城', '延吉', '玉树', '伊宁', '扬州'],
        Z: ['珠海', '昭通', '张家建', '舟山', '郑州', '中卫', '芷江', '湛江', '遵义新舟', '遵义茅台']
      },
      tabContentStrSpell: {
        A: ['anqing', 'aletai', 'ankang', 'akesu', 'anshun'],
        B: ['baotou', 'beihai', 'beijing', 'baise', 'baoshan'],
        C: ['changzhi', 'changchun', 'changzhou', 'changdu', 'chaoyang', 'changde', 'changbaishan', 'chengdu', 'chongqing', 'changsha', 'chifeng', 'chaozhou'],
        D: ['datong', 'dalian', 'daxian', 'dongying', 'daqing', 'dandong', 'dali', 'dunhuang', 'daocheng', 'delingha'],
        E: ['eerduosi', 'enshi'],
        F: ['fuzhou', 'fuyang'],
        G: ['guizhou', 'guilin', 'guangzhou', 'guangyuan', 'geermu', 'guyuan'],
        H: ['huhehate', 'hami', 'heihe', 'hailaer', 'haerbin', 'haikou', 'huangshan', 'hangzhou', 'handan', 'hefei', 'hanzhong', 'hetian', 'huaian', 'hechi'],
        J: ['jinjiang', 'jiuzhaigou', 'jinzhou', 'jingdezhen', 'jiayuguan', 'jinggangshan', 'jining', 'jiujiang', 'jiamusi', 'jinan', 'jieyang'],
        K: ['keshi', 'kunming', 'kangding', 'kelamayi', 'kuerle', 'kuche'],
        L: ['lanzhou', 'luoyang', 'lijiang', 'lasa', 'liping', 'liancheng', 'lianyungang', 'lincang', 'linfen', 'linyi', 'linzhi', 'liupanshui', 'liuzhou', 'luzhou'],
        M: ['mudanjiang', 'mangshi', 'manzhouli', 'mianyang', 'meixian', 'mohe'],
        N: ['nanjing', 'nanchong', 'nanning', 'nanyang', 'nantong', 'nalati', 'nanchang', 'ningbo'],
        P: ['pamzhihua'],
        Q: ['quzhou', 'qinhuangdao', 'qingyang', 'qiqihaer', 'qingdao'],
        S: ['shenzhen', 'shijiazhuang', 'sanya', 'shenyang', 'shanghai', 'simao', 'shennongjia', 'shaoyang'],
        T: ['tongren', 'tacheng', 'tengchong', 'taizhou', 'taizhou', 'tianjin', 'tongliao', 'taiyuan'],
        W: ['weihai', 'wuhan', 'wuzhou', 'wenshan', 'wuxi', 'weifang', 'wuyishan', 'wulanhaote', 'wenzhou', 'wulumuqi', 'wanzhou', 'wuhai'],
        X: ['xingyi', 'xichang', 'xiamen', 'xian', 'xiangyang', 'xining', 'xilinhaote', 'xishuangbanna', 'yizhou', 'xuzhou'],
        Y: ['yiwu', 'yongzhou', 'yulin', 'yanan', 'yuncheng', 'yantai', 'yinchuan', 'yichang', 'yibin', 'yancheng', 'yanji', 'yushu', 'yining', 'yangzhou'],
        Z: ['zhuhai', 'zhaotong', 'zhangjiajian', 'zhoushan', 'zhengzhou', 'zhongwei', 'zhijiang', 'zhanjiang', 'zunyixinzhou', 'zunyimaotai']
      }
    }
  },
  components: {
    citySelected
  },
  mounted () {
    window.addEventListener('click', this.handleClickBlank, true)
  },
  filters: {
    ConvertStrFirst (value) {
      if (!value) return ''
      return value.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
    }
  },
  methods: {
    handleClickBlank (event) {
      var evt = window.event || event
      var targetObj = evt.target || evt.srcElement
      if (targetObj.tagName.toLowerCase() === 'input') {
        if (evt.stopPropagation) {
          evt.stopPropagation()
        } else {
          evt.cancelBubble = true
        }
      } else {
        this.focusFlag = false
      }
    },
    currentSelectCity (msg) {
      this.cityName = msg
      this.focusFlag = false
    },
    GetValue () {
      const self = this
      this.findArray = []
      this.focusFlag = false
      if (reg.test(this.cityName)) {
        var firstLetter = this.cityName.slice(0, 1)
        if (regSpell.test(this.cityName)) {
          // 英文的情况
          for (var letter in this.tabContentStrSpell) {
            if (letter === firstLetter.toUpperCase()) {
              this.tabContentStrSpell[letter].forEach((item, index) => {
                if (item.indexOf(self.cityName) > -1) {
                  self.findArray.push({ id: item, value: self.tabContentStr[letter][index] })
                }
              })
              break
            }
          }
          console.log('英文的情况', self.findArray)
        } else if (regStr.test(this.cityName)) {
          // 汉字的情况
          for (var str in this.tabContentStr) {
            this.tabContentStr[str].forEach((item, index) => {
              if (item.indexOf(self.cityName) > -1) {
                self.findArray.push({ id: self.tabContentStrSpell[str][index], value: item })
              }
            })
          }
          console.log('汉字的情况', self.findArray)
        }
      } else {
        console.log('除汉字英文的字符')
      }
      if (this.findArray.length === 0) {
        this.showNoFlag = true
      }
    },
    strConvertSpell (str, space) {
    }
  }
}
</script>
<style lang="scss" module>
    @import "../../css/reset.scss";
    .home {
        color: #13334d;
        padding: 100px;
        >h4 {
           line-height: 88px;
           padding-bottom: 20px;
           color: #6c6c6c;
        }
        .autocompleteInput {
            width: 1000px;
            font-size: 80px;
            color: #333;
            /*background: url(//img.alicdn.com/tps/i1/TB1H3zaFVXXXXXUXpXXPqXt1pXX-1000-500.png) no-repeat;*/
            border: 4px solid #c7d1e4;
            border-radius: 12px;
            line-height: 160px;
            height: 160px;
            padding: 13px;
            outline: 0;
            margin: 0;
            &::placeHolder {
                 font-size: 80px;
            }
        }
        .ResultsList {
            display: block;
            .list {
                border: 1px solid #bec2c4;
                .item {
                    overflow: hidden;
                    zoom: 1;
                    cursor: pointer;
                    .itemInner {
                        padding: 44px 30px;
                        line-height: 88px;
                        height: 88px;
                        overflow: hidden;
                        .name {
                            float: left;
                        }
                        .intro {
                            float: right;
                        }
                        &:hover {
                            background: #9edafe;
                        }
                    }
                }
            }
        }
        .resultMessage {
            border: 1px solid #ff7d26;
            background: #fff2e8;
            line-height: 1.5;
            color: #666;
            padding: 12px;
            position: relative;
            z-index: 10;
            margin-bottom: -1px;
            zoom: 1;
            .messageHeightLight {
                color: #f30;
            }
        }
    }

</style>
