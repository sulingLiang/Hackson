// miniprogram/pages/order/order.js
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this;
    db.collection('story').get({
      success: function(res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        // 排序
        res.data.sort((a, b) => {
          return b.floorliketotal - a.floorliketotal;
        });
        // 去重
        let result = [];
        let obj = {};
        for (var i = 0; i < res.data.length; i++) {
          if (!obj[res.data[i]._openid]) {
            result.push(res.data[i]);
            obj[res.data[i]._openid] = true;
          }
        }
        that.setData({
          dataList: result
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
