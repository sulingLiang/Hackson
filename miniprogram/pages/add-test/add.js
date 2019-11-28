// miniprogram/pages/add/add.js
// var commonJS= require("weather.js");
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
    gender: null,
    rain_bg: 'http://download.tpengyun.cn/res/WeatherTop/rain_background.jpg',//下雨背景
    snow_bg: 'http://download.tpengyun.cn/res/WeatherTop/snow_background.jpg',//下雪背景
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    weather:1,//1为下雨 2为下雪
  },
  /**
   * 输入标题
   */
  titleInput(e) {
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
    console.log('发布');
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
        wx.switchTab({
          url: '../index/index'
        });
      });
    fail: console.error;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getLocation({//获取位置经纬度
      type: 'gcj02',
      success: function(res) {
        var data = {
          location: res.longitude + ',' + res.latitude,
          output: 'json',
          ak: '0tVbM377XzaEnP4VM4ip4130ZYuRLw1A'
        }
        // 获取天气信息
        wx.request({
          url: 'https://api.map.baidu.com/telematics/v3/weather?',
          data: data,
          method: 'GET',
          success: function(res) {
            console.log('数据',res.data.results[0])
            data = res.data.results[0]
            var weather_data = data.weather_data[0]
            that.setData({
              City: data.currentCity, //城市
              pm25: data.pm25, //PM2.5
              Desc: weather_data.weather, //天气
              wind: weather_data.wind, //分级
              temperature: weather_data.temperature, //温度
              date: weather_data.date, //日期
              tips: data.index[0].des,//穿衣提醒
            });
          },
        })
      },
      cancel: function (res) {
        console.log('wgs84cacel', res);
      },
      fail: function (res) {
        //返回fail:invalid data
        console.log('wgs84fail', res);
      }
    })
  },

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
