<template>
  <view name="TOSb" class="wrapper" @touchmove="handletouchmove" @touchstart="handletouchstart" @touchend="handletouchend">
    <view class="header">
      <text class="title">2048</text>
      <view class="score">
        <view>
          <span>SCORE</span>
          <span class="num">{{ score }}</span>
        </view>
        <view>
          <span>BEST</span>
          <span class="num">{{ bestScore }}</span>
        </view>
      </view>
    </view>
    <view class="btn btn-mg" @click="newGame">新游戏</view>
    <view>
      <view class="over" v-if="over">
        <p>Game over!</p>
        <view class="btn" @click="newGame">Try again</view>
      </view>
      <view class="box">
        <view class="row" v-for="row in list">
          <view class="col" :class="'n-' + col" v-for="col in row">{{ col != null ? col : '' }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'TOSb',
  data() {
    return {
      size: 4,
      score: 0,
      list: [],
      intiNum: [2, 4],
      pr: 0.9,
      score: 0,
      bestScore: uni.getStorageSync('bestScore') || 0,
      over: false,
      direction: [
        {
          x: 0,
          y: -1
        },
        {
          x: 0,
          y: 1
        },
        {
          x: -1,
          y: 0
        },
        {
          x: 1,
          y: 0
        }
      ],
      flag: 0,
      text: '',
      lastX: 0,
      lastY: 0
    };
  },
  methods: {
    init() {
      this.newGame();
      // document.addEventListener('keyup', this.keyDown)
    },
    newGame() {
      this.score = 0;
      this.over = false;
      this.list = Array.from(Array(this.size)).map(() => Array(this.size).fill(undefined));
      this.setRandom();
    },

    handletouchstart: function(event) {
      // console.log(event)
      this.lastX = event.touches[0].pageX;
      this.lastY = event.touches[0].pageY;
    },
    handletouchend: function(event) {
      this.flag = 0;
      this.text = '没有滑动';
    },
    handletouchmove: function(event) {
      // console.log(event)
      if (this.flag !== 0) {
        return;
      }
      let currentX = event.touches[0].pageX;
      let currentY = event.touches[0].pageY;
      let tx = currentX - this.lastX;
      let ty = currentY - this.lastY;
      let text = '';
      this.mindex = -1;
      //左右方向滑动
      if (Math.abs(tx) > Math.abs(ty)) {
        if (tx < 0) {
          text = '向左滑动';
          this.flag = 1;
          this.move(0);
          //  this.getList();  //调用列表的方法
        } else if (tx > 0) {
          text = '向右滑动';
          this.flag = 2;
          this.move(2);
        }
      }
      //上下方向滑动
      else {
        if (ty < 0) {
          text = '向上滑动';
          this.flag = 3;
          this.move(1);
          //  this.getList();  //调用列表的方法
        } else if (ty > 0) {
          text = '向下滑动';
          this.flag = 4;
          this.move(3);
        }
      }

      //将当前坐标进行保存以进行下一次计算
      this.lastX = currentX;
      this.lastY = currentY;
      this.text = text;
      this.setRandom();
    },
    //插入新格子
    setRandom() {
      if (this.hasAvailableCells()) {
        let [x, y] = this.randomAvailableCells();
        this.list[x][y] = this.randomValue();
      }
    },
    //移动算法，i表示旋转次数
    move(i) {
      let arr = this.rotate(Array.from(this.list), i).map((item, index) => {
        return this.moveLeft(item);
      });
      this.list = this.rotate(arr, this.size - i);
      this.setLocalstorage();
      if (!this.isAvailable()) {
        this.over = true;
      }
    },
    //获取数值
    randomValue() {
      return Math.random() < this.pr ? this.intiNum[0] : this.intiNum[1];
    },
    //获取随机一个空格子坐标
    randomAvailableCells() {
      let cells = this.availableCells();
      if (cells.length) {
        return cells[Math.floor(Math.random() * cells.length)];
      }
    },
    setLocalstorage() {
      let score = uni.getStorageSync('bestScore'); //localStorage.getItem('bestScore')
      if (score) {
        if (this.score > score) {
          // localStorage.setItem('bestScore', this.score)
          uni.setStorageSync('bestScore', this.score);
          this.bestScore = this.score;
        }
      } else {
        // localStorage.setItem('bestScore', this.score)
        uni.setStorageSync('bestScore', this.score);
        this.bestScore = this.score;
      }
    },
    //单行左移
    moveLeft(list) {
      let _list = []; //当前行非空格子
      let flg = false;
      for (let i = 0; i < this.size; i++) {
        if (list[i]) {
          _list.push({
            x: i,
            merged: false,
            value: list[i]
          });
        }
      }
      _list.forEach(item => {
        let farthest = this.farthestPosition(list, item);
        let next = list[farthest - 1];
        if (next && next === item.value && !_list[farthest - 1].merged) {
          //合并
          list[farthest - 1] = next * 2;
          list[item.x] = undefined;
          item = {
            x: farthest - 1,
            merged: true,
            value: next * 2
          };
          this.score += next * 2;
        } else {
          if (farthest != item.x) {
            list[farthest] = item.value;
            list[item.x] = undefined;
            item.x = farthest;
          }
        }
      });
      return list;
    },
    //逆时针旋转
    rotate(arr, n) {
      n = n % 4;
      if (n === 0) return arr;
      console.log('arr', arr);
      let tmp = Array.from(Array(this.size)).map(() => Array(this.size).fill(undefined));
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          tmp[this.size - 1 - i][j] = arr[j][i];
        }
      }
      if (n > 1) tmp = this.rotate(tmp, n - 1);
      return tmp;
    },
    //左边最远空格的x位置
    farthestPosition(list, cell) {
      let farthest = cell.x;
      while (farthest > 0 && !list[farthest - 1]) {
        farthest = farthest - 1;
      }
      return farthest;
    },
    isAvailable() {
      return this.hasAvailableCells() || this.hasMergedCells();
    },
    //所有空格子的坐标
    availableCells() {
      let cells = [];
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          if (!this.list[i][j]) {
            cells.push([i, j]);
          }
        }
      }
      return cells;
    },
    //是否存在空格子
    hasAvailableCells() {
      return !!this.availableCells().length;
    },
    hasMergedCells() {
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          let cell = this.list[i][j];
          if (cell) {
            for (let dir = 0; dir < 4; dir++) {
              let vector = this.direction[dir];
              if (this.withinBounds(i + vector.x, j + vector.y)) {
                let other = this.list[i + vector.x][j + vector.y];
                if (other && other === cell) {
                  return true;
                }
              }
            }
          }
        }
      }
      return false;
    },
    withinBounds(x, y) {
      return x > 0 && y > 0 && x < this.size && y < this.size;
    }
  },
  created() {
    this.init();
  }
  // onLoad() {
  // 	//初始化数组
  // 	this.init()
  // }
};
</script>

<style scoped lang="less">
.wrapper {
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .header {
    width: 100%;
    height: 100px;
    background-color: #5e00ff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #776e65;

    .title {
      font-size: 30px;
    }

    .score {
      display: flex;
      justify-content: space-between;
      height: 80px; // line-height: 60px;

      view {
        // width: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-left: 5px;
        padding-right: 5px;
        border-radius: 5px;
        background: #bbada0;

        .num {
          font-size: 25px;
          font-weight: bold;
          color: #ffffff;
        }

        &:last-child {
          margin-left: 5px;
        }
      }
    }
  }
  .over {
    position: absolute;
    width: 400px;
    height: 400px;
    background: rgba(238, 228, 218, 0.73);
    z-index: 1000;
    border-radius: 5px;
    text-align: center;
    color: #8f7a66;
    p {
      font-size: 60px;
      font-weight: bold;
      height: 60px;
      line-height: 60px;
    }
  }
  .btn {
    display: inline-block;
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    color: #f9f6f2;
    background: #8f7a66;
    &.btn-mg {
      margin-bottom: 20px;
      margin-top: 20px;
    }
  }
  .box {
    width: 300px;
    height: 300px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    border-radius: 5px;
    background: #bbada0;
    .row {
      width: 100%;
      height: 23%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .col {
        width: 23%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        border-radius: 3px;
        background: #cec1b3;
        &.n-2 {
          background: #f8f3e8;
        }
        &.n-4 {
          background: #ede0c8;
        }
        &.n-8 {
          background: #f26179;
        }
        &.n-16 {
          background: #f59563;
        }
        &.n-32 {
          background: #f67c5f;
        }
        &.n-64 {
          background: #f65e36;
        }
        &.n-128 {
          background: #edcf72;
        }
        &.n-256 {
          background: #edcc61;
        }
        &.n-512 {
          background: #9c0;
        }
        &.n-1024 {
          background: #3365a5;
        }
        &.n-2048 {
          background: #09c;
        }
        &.n-4096 {
          background: #a6bc;
        }
        &.n-8192 {
          background: #93c;
        }
      }
    }
  }
}
.animate-top{}
.animate-right{}
.animate-bottom{}
.animate-left{}
</style>
