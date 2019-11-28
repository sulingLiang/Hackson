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
    this.setData({
      storyId: option.id
    })
  },
  onShow: function() {
    if (app.globalData.userInfo) {
      const userInfo = app.globalData.userInfo;
      this.setData({
        userInfo: userInfo
      });
    }
    this.getStoryDetail();
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
  // 获取故事详情
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
  handleContinueStrory: function(e) {
    const id = this.data.storyId
    const data = this.data;
    const temp = {
      creatTime: new Date,
      avatar: data.userInfo.avatarUrl,
      author: data.userInfo.nickName,
      likeCount: 0,
      floor: data.detail[0].content.length + 1,
      content: e.detail.value.storyContent
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
      if(this.data.updateResult.updated === 1) {
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
      this.getStoryDetail()
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
    console.log({e})
    this.setData({
      storyContent: e.detail.value
    })
  }
})
