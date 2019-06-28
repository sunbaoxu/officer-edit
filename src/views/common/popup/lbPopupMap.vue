<template>
  <el-dialog 
    title="选择地址"
    :visible.sync="mapBoxAsync" 
    class="lb-popup-map-wrap" 
    width="790px"
    :closeOnClickModal="false"
  >
    <section class="lb-map-main">
      <div class="map-search-box">
        <div class="search-box g-cen-cen">
          
        </div>
        <div></div>
      </div>
      <section class="map-box">
        <div>
          <div class="search-box g-cen-cen">
            <i class="iconfont icon-search"></i>
            <span>搜索地点</span>
          </div>
        </div>
        <!-- 地图容器 -->
        <div id="allmap" class="allmap-box"></div>

      </section>
    </section>
    
  </el-dialog>
</template>

<script>
import api from '@/api/api';
// import BMap from 'BMap'
// import globalFn from '@/assets/javascripts/globalFn'
export default {
  data () {
    return {
      mapBoxAsync:false
 
    }
  },
  methods : {
    init(obj) {
      this.mapBoxAsync = true;
      setTimeout(()=>{
        this.mapInit(obj);
      })

    },
    mapInit (obj) {


      var map = new BMap.Map("allmap");
      var point = new BMap.Point(116.331398,39.897445);
      map.centerAndZoom(point,12);
      // 创建地址解析器实例
      var myGeo = new BMap.Geocoder();
      // 将地址解析结果显示在地图上,并调整地图视野
      myGeo.getPoint(`${obj.addressInfo}`, (point)=>{
        if (point) {
          map.centerAndZoom(point, 16);
          map.addOverlay(new BMap.Marker(point));
        }else{
          this.$message.error("您选择地址没有解析到结果!");
        }
      }, "北京市");
    }
  }
}
</script>
<style lang="scss" scoped>
.lb-popup-map-wrap{
  .lb-map-main{
    padding:30px 0;
  }
  .allmap-box{
    height: 300px;
  }
  .search-box{
    height: 36px;
    background: #eee;
    border-radius: 8px;
    margin-bottom: 10px;
    color: #999;
    i{
      font-size: 20px;
      margin-right: 6px;
    }
    span{
      line-height: 20px;
    }
  }
}


</style>
<style lang="scss">
.lb-popup-map-wrap{
  .el-dialog__header{
    border-bottom: 1px solid #ececec;
  }
  .el-dialog__body{
    padding: 0 20px;
  }
  .ql-container {
    .ql-editor{
      min-height:240px;
      max-height:360px;
      overflow-y:auto;
    }
  }
}
</style>

