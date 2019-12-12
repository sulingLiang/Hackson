//index.js
const app = getApp()
Page({
  data: {
    detail: [],
    isShow: false,
    userInfo: {},
    storyContent: '',
    updateResult: {},
    storyId: '',
    userFloorLike: [],
    userFloorLikeId: '',
    isStoryLike: false,
    dialogBottom: 35
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
    this.getStoryFloorLike();
    this.getStoryLike();
  },
  // 点赞
  handleLike: function(e) {
    const floor = e.currentTarget.dataset.floor;
    let floorliketotal = 0; // 故事的总点赞数
    let likeCount = 0 ; // 该楼层的点赞数
    let isFloorLike = false; // 当前用户是否对该楼层点赞过
    const isFlag = this.data.userFloorLike.some(item => item === floor);
    const tempUserFloorLike = this.data.userFloorLike;
    const tempDetail = this.data.detail;
    if (isFlag) {
      // 取消点赞
      floorliketotal = this.data.detail[0].floorliketotal - 1;
      tempDetail[0].content[floor - 1].likeCount = tempDetail[0].content[floor - 1].likeCount - 1;
      isFloorLike = false;
      tempUserFloorLike.splice(tempUserFloorLike.indexOf(floor), 1)
      this.setData({
        userFloorLike: tempUserFloorLike,
        detail: tempDetail
      })
    } else {
      // 点赞
      floorliketotal = this.data.detail[0].floorliketotal + 1;
      tempDetail[0].content[floor - 1].likeCount = tempDetail[0].content[floor - 1].likeCount + 1;
      isFloorLike = true;
      tempUserFloorLike.push(floor)
      this.setData({
        userFloorLike: tempUserFloorLike,
        detail: tempDetail
      })
    }
    wx.cloud.callFunction({
      name: 'detail',
      data: {
        fun: "updateFloorLike",
        db: 'floorlike',
        storyid: this.data.storyId,
        _openid: app.globalData.openid,
        floor: floor,
        isFloorLike: isFloorLike
      }
    }),
    wx.cloud.callFunction({
      name: 'detail',
      data: {
        fun: "updateStoryFloorLike",
        db: 'story',
        storyid: this.data.storyId,
        floor: floor,
        floorliketotal: floorliketotal,
        likeCount: tempDetail[0].content[floor - 1].likeCount
      }
    })
  },
  // 获取故事详情
  getStoryDetail: function () {
    const id = this.data.storyId
    // wx.showLoading({
    //   title: '加载中',
    // })
    wx.cloud.callFunction({
      name: 'detail',
      data: {
        fun: "getStoryDetail",
        db: 'story',
        id: id
      }
    }).then(res => {
      this.setData({
        detail: res.result.detail
      });
      // wx.hideLoading();
    }).catch(err => {
      // wx.hideLoading();
    });
  },
  // 获取当前用户对楼层的点赞
  getStoryFloorLike: function() {
    wx.cloud.callFunction({
      name: 'detail',
      data: {
        fun: "getStoryFloorLike",
        db: 'floorlike',
        storyid: this.data.storyId,
        _openid: app.globalData.openid
      }
    }).then(res => {
      const result = []
      res.result.userFloorLike.forEach(item => result.push(item.floor))
      this.setData({
        userFloorLike: result
      });
    }).catch(err => {
      
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
      content: e.detail.value.storyContent,
      _openid: app.globalData.openid
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
    this.setData({
      storyContent: e.detail.value
    })
  },
  // 获取用户信息
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo
    })
  },
  // 获取用户是否收藏该故事
  getStoryLike: function() {
    wx.cloud.callFunction({
      name: 'detail',
      data: {
        fun: "getStoryLike",
        db: 'storylike',
        storyid: this.data.storyId,
        _openid: app.globalData.openid
      }
    }).then(res => {
      const temp = res.result.storyLike.length > 0
      this.setData({
        storyLike: res.result.storyLike,
        isStoryLike: temp
      });
    }).catch(err => {
      
    });
  },
  // 是否收藏该故事
  handleStoryLike: function() {
    wx.cloud.callFunction({
      name: 'detail',
      data: {
        fun: "updateStoryLike",
        db: 'storylike',
        storyid: this.data.storyId,
        _openid: app.globalData.openid,
        isStoryLike: this.data.isStoryLike
      }
    }).then(res => {
    }).catch(err => {
      
    });
    this.setData({
      isStoryLike: !this.data.isStoryLike
    })
  },
  dialogFoucus: function(e) {
    this.setData({
      dialogBottom: 55
    })
  },
  dialogBlur: function(e) {
    this.setData({
      dialogBottom: 35
    })
  }
})
