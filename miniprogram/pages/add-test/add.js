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
    image: 'https://c-dev.weimobwmc.com/test/2fa303a2c9a74a5ab9bc3faa4a5ca108.jpeg',
    imgList: [],
    currentAuthor: '',
    currentAvatar: '',
    gender: null,
    openid:'',
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
    if (!this.data.title) {
      wx.showToast({
        title: '标题不能为空！',
        icon: 'none',
        duration: 1500,
        mask: false
      });
      return null;
    }
    if (!this.data.start) {
      wx.showToast({
        title: '内容不能为空！',
        icon: 'none',
        duration: 1500,
        mask: false
      });
      return null;
    }
    db.collection('story')
      .add({
        // data 字段表示需新增的 JSON 数据
        data: {
          // author: this.data.currentAuthor,
          // avatar: this.data.currentAvatar,
          // gender: this.data.gender ? this.data.gender : 2,
          author: 'SJJ',
          avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK5texDS7iasveGHKZt7gTdbE7JSEA7nAicmeoXibdaVTAkWHDVsYRDLrMDkmsiaaMiazAgiaicNCnypJ1hg/132',
          gender:2,
          creatTime: new Date(),
          floorliketotal: 111,
          // image: this.data.image,
          // title: this.data.title,
          image: 'https://c-dev.weimobwmc.com/test/f1a1fa12471948fc92904b67e9bd3276.jpeg',
          title: '爱的物理学',
          content: [
            // {
            //   author: this.data.currentAuthor,
            //   avatar: this.data.currentAvatar,
            //   content: this.data.start,
            //   creatTime: new Date(),
            //   floor: 1,
            //   likeCount: 0,
            //   _openid: this.data.openid
            // },
            {
              author: 'SJJ',
              avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK5texDS7iasveGHKZt7gTdbE7JSEA7nAicmeoXibdaVTAkWHDVsYRDLrMDkmsiaaMiazAgiaicNCnypJ1hg/132',
              content: '爱的物理学',
              creatTime: new Date(),
              floor: 1,
              likeCount: 10,
              _openid: 'osP-a5TmwUMTxhszPIXYrqrjYR4Y'
            },
            {
              author: '何晓义',
              avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLLMffuU8yicUdO42IguOuyjw7qEicoXLtO7O7P94aAZYKvaBmKgNZibUfiaJK3IWbGa8uozrtRg4pSoA/132',
              content: '质量和体积不成正比。',
              creatTime: new Date() + 1 * 60,
              floor: 2,
              likeCount: 20,
              _openid: 'osP-a5dva_JgJIB3FabQPmiQwo_Q'
            },
            {
              author: '这一刻为你.Ling',
              avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erajmnPRxFDmxxq0kC3f22xa4ia0gdzz0FHx5w6ZickDa9df1ybQZ54kT5RaaZfgjpgguFdCUSyFNzg/132',
              content: '那个如紫罗兰般小巧的丫头,',
              creatTime: new Date() + 1.5 * 60,
              floor: 3,
              likeCount: 25,
              _openid: 'osP-a5RFhFWnOFv9aw6HimvLnICY'
            },
            {
              author: 'LSL',
              avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJPDt8xdichhyOSaVGhlTecl5elHEnVDqOBLSow0wSRflFPfLobS3OeqVPVmUwcB4o2QBFIicia6IS5g/132',
              content: '那个似花瓣般轻曳的丫头,',
              creatTime: new Date() + 1.8 * 60,
              floor: 4,
              likeCount: 35,
              _openid: 'osP-a5SxyKhyvoizAnnQ6oSN4eO8'
            },
            {
              author: '何晓义',
              avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLLMffuU8yicUdO42IguOuyjw7qEicoXLtO7O7P94aAZYKvaBmKgNZibUfiaJK3IWbGa8uozrtRg4pSoA/132',
              content: '以远超过地球的质量吸引着我。',
              creatTime: new Date() + 2 * 60,
              floor: 5,
              likeCount: 6,
              _openid: 'osP-a5dva_JgJIB3FabQPmiQwo_Q'
            },
            {
              author: '这一刻为你.Ling',
              avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erajmnPRxFDmxxq0kC3f22xa4ia0gdzz0FHx5w6ZickDa9df1ybQZ54kT5RaaZfgjpgguFdCUSyFNzg/132',
              content: '一瞬间，我',
              creatTime: new Date() + 2.4 * 60,
              floor: 6,
              likeCount: 4,
              _openid: 'osP-a5RFhFWnOFv9aw6HimvLnICY'
            },
            {
              author: 'SJJ',
              avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK5texDS7iasveGHKZt7gTdbE7JSEA7nAicmeoXibdaVTAkWHDVsYRDLrMDkmsiaaMiazAgiaicNCnypJ1hg/132',
              content: '如同牛顿的苹果一样,',
              creatTime: new Date() + 2.4 * 60,
              floor: 7,
              likeCount: 9,
              _openid: 'osP-a5TmwUMTxhszPIXYrqrjYR4Y'
            },
            {
              author: 'LSL',
              avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJPDt8xdichhyOSaVGhlTecl5elHEnVDqOBLSow0wSRflFPfLobS3OeqVPVmUwcB4o2QBFIicia6IS5g/132',
              content: '不受控制地滚落在她脚下。',
              creatTime: new Date() + 3 * 60,
              floor: 8,
              likeCount: 2,
              _openid: 'osP-a5SxyKhyvoizAnnQ6oSN4eO8'
            }
          ]
        }
      })
      .then(res => {
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
        gender: userInfo.gender,
        openid: app.globalData.openid
      });
    }
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      });
    }
  }
});
