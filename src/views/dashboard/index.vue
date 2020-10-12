<template>
  <div class="dashboard-container">
     <div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide"></div>
        <div class="swiper-slide">
          <div id="main" style="width: 100%;height:100%;"></div>
        </div>
        <div class="swiper-slide">
          <div id="main2" style="width: 100%;height:100%;"></div>
        </div>
        <div class="swiper-slide">
          <div id="main3" style="width: 100%;height:100%;"></div>
        </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
  </div>
  </div>
</template>

<script>
import { mapGetters,mapMutations,mapState,mapActions} from 'vuex'
import swiper from 'swiper'
import echarts from 'echarts'
// import 'swiper/dist/css/swiper.css';
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ]),
    ...mapState('dashboard',['categoryDataOfX','dataTree']),

  },
  data(){
     return {
        // 指定图表的配置项和数据
        
     }
  },
  methods:{
    ...mapActions('dashboard',['loadCategoryDataOfX',]),
    //初始化轮播图
     initSwiper(){
      var mySwiper = new swiper ('.swiper-container',{
        //初始显示第二索引图片
        initialSlide :1,
        // 纵向滑动
        // direction : 'vertical',
        direction : 'horizontal',
        //换成小手
        grabCursor:true,
        //设置自动切换
        autoplay:true,
        touchRatio:0.5,
        //循环切换
        loop:true,
      })  
     },
     //初始化图表
     initeCharts(){
       var myChart01 = echarts.init(document.getElementById('main'));
       var myChart02 = echarts.init(document.getElementById('main2'));
       var myChart03 = echarts.init(document.getElementById('main3'));
       myChart01.setOption({
            title: {
                text: '本月销售额度情况'
            },
            tooltip: {},
            legend: {
              data:['销售额度:单位W']
            },
            xAxis: {
              data: this.categoryDataOfX
            },
            yAxis: {}, 
            series: [{
                name: '销售额度:单位W',
                type: 'bar',
                data: [5,16,35,20,17,25,30]
            }]
        });
       myChart02.setOption({
            title: {
                text: '本季度销售额度情况'
            },
            tooltip: {},
            legend: {
                data:['销售额度:单位W']
            },
            xAxis: {
                data:['1月','2月','3月','4月','5月','6月']
            },
            yAxis: {},
            series: [{
                name: '销售额度:单位W',
                type: 'line',
                data: [90, 100, 150, 70, 30, 130,180]
            }]
        });
       myChart03.setOption({
            tooltip: {
                // show：'true',//默认：true；是否显示提示框组件，包括提示框浮层和 axisPointer。
                trigger: 'item',//默认：item；触发类型。item：数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。'axis'：坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。'none':什么都不触发。
                triggerOn: 'mousemove'
            },
            series:[
                {
                    type: 'tree',
 
                    data: [{name:'全部栏目',children:this.dataTree}],
 
                    left: '2%',
                    right: '2%',
                    top: '15%',
                    bottom: '10%',
 
                    symbol: 'emptyCircle',
 
                    orient: 'vertical',
 
                    expandAndCollapse: true,//默认：true；子树折叠和展开的交互，默认打开 。
 
                    initialTreeDepth:2,//默认：2，树图初始展开的层级（深度）。根节点是第 0 层，然后是第 1 层、第 2 层，... ，直到叶子节点
 
                    label: {
                        normal: {
                            position: 'top',//标签的位置。
                            rotate: -90,//标签旋转。从 -90 度到 90 度。正值是逆时针。
                            verticalAlign: 'middle',//文字垂直对齐方式，默认自动。
                            align: 'right',//文字水平对齐方式，默认自动。
                            fontSize: 12,//文字的字体大小
                        }
                    },
 
                    leaves: {
                        label: {
                            normal: {
                                position: 'bottom',
                                rotate: -90,
                                verticalAlign: 'middle',
                                align: 'left',
                                fontSize: 8,//文字的字体大小
                            }
                        }
                    },
 
                    animationDurationUpdate: 750
                    
                }
            ]
        });
      
     }
  },
  created(){
  },
  mounted(){
    this.initSwiper();
    this.loadCategoryDataOfX().then(()=>{
      this.initeCharts();
    })
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.swiper-container{
  width: 90%;
  height: 600px;
  margin: 0 auto;
}
.swiper-slide{
  background: rgb(180, 177, 197);
}
</style>
