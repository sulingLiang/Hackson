//index.js
const app = getApp()
Page({
  data: {
    detail: [],
    isShow: false,
    userInfo: {},
    storyContent: '',
    updateResult: {},
    storyId: ''
  },
  onLoad: function(option) {
    console.log({option})
    this.setData({
      storyId: option.id
    })
    this.getStoryDetail();
    this.getUserInfo();
  },
  // 点赞
  handleLike: function(e) {
    const that = this
    const arr = that.data.detail;
    const index = that.data.detail.findIndex(item => item.id === e.currentTarget.dataset.id);
    const likeCheck = "detail[" + index + "].likeCheck";
    const likeCount = "detail[" + index + "].likeCount";
    if (arr[index]['likeCheck']) {
      that.setData({
        [likeCheck]: false,
        [likeCount]: that.data.detail[index]['likeCount'] - 1
      })
    } else {
      that.setData({
        [likeCheck]: true,
        [likeCount]: that.data.detail[index]['likeCount'] + 1
      })
    }
  },
  getUserInfo: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo
          })
        }
      })
    }
  },
  getStoryDetail: function () {
    const id = this.data.storyId
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'detail',
      data: {
        fun: "getStoryDetail",
        db: 'story',
        id: id || 'a4d6e3ee5dde801000081a242bb443f7'
      }
    }).then(res => {
      this.setData({
        detail: res.result.detail
      });
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
    });
  },
  // 点击续写按钮
  handleStoryClick: function() {
    this.setData({
      isShow: true
    })
  },
  // 取消 续写
  cancelContinueStory: function() {
    this.setData({
      isShow: false
    })
  },
  // 确认 续写
  handleContinueStrory: function() {
    const id = this.data.storyId
    const data = this.data;
    const temp = {
      creatTime: new Date,
      avatar: data.userInfo.avatarUrl,
      author: data.userInfo.nickName,
      likeCount: 0,
      floor: data.detail[0].content.length + 1,
      content: data.storyContent
    }
    wx.showLoading({
      title: '加载中',
    })
    const that = this
    wx.cloud.callFunction({
      name: 'detail',
      data: {
        fun: "updateStoryDetail",
        db: 'story',
        id: id,
        data: temp
      }
    }).then(res => {
      that.setData({
        updateResult: res.result.stats
      });
      console.log({res})
      if(updateResult.updated === 1) {
        wx.showToast({
          title: '续写成功',
          icon: 'success',
          image: '',
          duration: 1500,
          mask: false,
          success: (result)=>{
            
          },
          fail: ()=>{},
          complete: ()=>{}
        });
      } else {
        wx.showToast({
          title: '续写失败',
          icon: 'fail',
          image: '',
          duration: 1500,
          mask: false,
          success: (result)=>{
            
          },
          fail: ()=>{},
          complete: ()=>{}
        });
      }
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
    });
    that.setData({
      isShow: false
    })
  },
  //获取 续写框的值
  continueStoryInput: function(e) {
    this.setData({
      storyContent: e.detail.value
    })
  }
})
