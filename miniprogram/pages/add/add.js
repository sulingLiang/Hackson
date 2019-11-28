// miniprogram/pages/add/add.js
const db = wx.cloud.database();
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    start: '',
    image: '',
    imgList: [],
    currentAuthor: '',
    currentAvatar: '',
    gender: null
  },
  /**
   * 输入标题
   */
  titleInput: function(e) {
    this.setData({
      title: e.detail.value
    });
  },
  /**
   * 输入故事开头
   */
  startInput(e) {
    this.setData({
      start: e.detail.value
    });
  },
  /**
   * 选择图片
   */
  ChooseImage() {
    const that = this;
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: res => {
        this.setData({
          imgList: res.tempFilePaths
        });
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + '.png',
          filePath: this.data.imgList[0],
          success: file => {
            that.setData({
              image: file.fileID
            });
          }
        });
      }
    });
  },
  /**
   * 预览图片
   */
  ViewImage(e) {
    console.log(this.data.imgList);
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  /**
   * 删除图片
   */
  DelImg(e) {
    wx.showModal({
      title: '梦想家',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          });
        }
      }
    });
  },

  publish() {
    console.log('发布', this.data);
    const that = this;
    db.collection('story')
      .add({
        // data 字段表示需新增的 JSON 数据
        data: {
          author: this.data.currentAuthor,
          avatar: this.data.currentAvatar,
          gender: this.data.gender ? this.data.gender : 2,
          creatTime: new Date(),
          floorliketotal: 0,
          image: this.data.image,
          title: this.data.title,
          content: [
            {
              author: this.data.currentAuthor,
              avatar: this.data.currentAvatar,
              content: this.data.start,
              creatTime: new Date(),
              floor: 1,
              likeCount: 0
            }
          ]
        }
      })
      .then(res => {
        console.log(res);
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          image: '',
          duration: 1500,
          mask: false,
          success: result => {
            this.setData({
              title: '',
              start: '',
              image: '',
              imgList: []
            });
          },
          fail: () => {},
          complete: () => {
            wx.switchTab({
              url: '../index/index'
            });
          }
        });
      });
    fail: console.error;
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
    
    if (app.globalData) {
      const userInfo = app.globalData.userInfo;
      this.setData({
        currentAuthor: userInfo.nickName,
        currentAvatar: userInfo.avatarUrl,
        gender: userInfo.gender
      });
    }
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      });
    }
  }
});
