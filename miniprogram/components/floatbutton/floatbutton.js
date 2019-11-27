// components/addbutton/addbutton.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {

  },


  /**
   * 组件的方法列表
   */
  methods: {
    translate() {
      //就一个
      wx.navigateTo({
        url: '../order/order'
      })
      return
    }

  }

})