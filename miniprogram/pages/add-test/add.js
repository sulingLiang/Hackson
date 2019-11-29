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
          author: this.data.currentAuthor,
          avatar: this.data.currentAvatar,
          gender: this.data.gender ? this.data.gender : 2,
          creatTime: new Date(),
          floorliketotal: 0,
          image: this.data.image,
          title: this.data.title,
          // author: 'SJJ',
          // avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK5texDS7iasveGHKZt7gTdbE7JSEA7nAicmeoXibdaVTAkWHDVsYRDLrMDkmsiaaMiazAgiaicNCnypJ1hg/132',
          // gender: 2,
          // image: 'https://c-dev.weimobwmc.com/test/f1a1fa12471948fc92904b67e9bd3276.jpeg',
          // title: '爱的物理学',
          // author: 'LSL',
          // avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJPDt8xdichhyOSaVGhlTecl5elHEnVDqOBLSow0wSRflFPfLobS3OeqVPVmUwcB4o2QBFIicia6IS5g/132',
          // gender: 2,
          // image: 'https://c-dev.weimobwmc.com/test/c1fc26393d6d423e9cddc7b187523434.png',
          // title: '小王子',
          content: [
            {
              author: this.data.currentAuthor,
              avatar: this.data.currentAvatar,
              content: this.data.start,
              creatTime: new Date(),
              floor: 1,
              likeCount: 0,
              _openid: this.data.openid
            }
            // {
            //   author: 'SJJ',
            //   avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK5texDS7iasveGHKZt7gTdbE7JSEA7nAicmeoXibdaVTAkWHDVsYRDLrMDkmsiaaMiazAgiaicNCnypJ1hg/132',
            //   content: '爱的物理学',
            //   creatTime: new Date(),
            //   floor: 1,
            //   likeCount: 10,
            //   _openid: 'osP-a5TmwUMTxhszPIXYrqrjYR4Y'
            // },
            // {
            //   author: '何晓义',
            //   avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLLMffuU8yicUdO42IguOuyjw7qEicoXLtO7O7P94aAZYKvaBmKgNZibUfiaJK3IWbGa8uozrtRg4pSoA/132',
            //   content: '质量和体积不成正比。',
            //   creatTime: new Date() + 1 * 60,
            //   floor: 2,
            //   likeCount: 20,
            //   _openid: 'osP-a5dva_JgJIB3FabQPmiQwo_Q'
            // },
            // {
            //   author: '这一刻为你.Ling',
            //   avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erajmnPRxFDmxxq0kC3f22xa4ia0gdzz0FHx5w6ZickDa9df1ybQZ54kT5RaaZfgjpgguFdCUSyFNzg/132',
            //   content: '那个如紫罗兰般小巧的丫头,',
            //   creatTime: new Date() + 1.5 * 60,
            //   floor: 3,
            //   likeCount: 25,
            //   _openid: 'osP-a5RFhFWnOFv9aw6HimvLnICY'
            // },
            // {
            //   author: 'LSL',
            //   avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJPDt8xdichhyOSaVGhlTecl5elHEnVDqOBLSow0wSRflFPfLobS3OeqVPVmUwcB4o2QBFIicia6IS5g/132',
            //   content: '那个似花瓣般轻曳的丫头,',
            //   creatTime: new Date() + 1.8 * 60,
            //   floor: 4,
            //   likeCount: 35,
            //   _openid: 'osP-a5SxyKhyvoizAnnQ6oSN4eO8'
            // },
            // {
            //   author: '何晓义',
            //   avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLLMffuU8yicUdO42IguOuyjw7qEicoXLtO7O7P94aAZYKvaBmKgNZibUfiaJK3IWbGa8uozrtRg4pSoA/132',
            //   content: '以远超过地球的质量吸引着我。',
            //   creatTime: new Date() + 2 * 60,
            //   floor: 5,
            //   likeCount: 6,
            //   _openid: 'osP-a5dva_JgJIB3FabQPmiQwo_Q'
            // },
            // {
            //   author: '这一刻为你.Ling',
            //   avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erajmnPRxFDmxxq0kC3f22xa4ia0gdzz0FHx5w6ZickDa9df1ybQZ54kT5RaaZfgjpgguFdCUSyFNzg/132',
            //   content: '一瞬间，我',
            //   creatTime: new Date() + 2.4 * 60,
            //   floor: 6,
            //   likeCount: 4,
            //   _openid: 'osP-a5RFhFWnOFv9aw6HimvLnICY'
            // },
            // {
            //   author: 'SJJ',
            //   avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK5texDS7iasveGHKZt7gTdbE7JSEA7nAicmeoXibdaVTAkWHDVsYRDLrMDkmsiaaMiazAgiaicNCnypJ1hg/132',
            //   content: '如同牛顿的苹果一样,',
            //   creatTime: new Date() + 2.4 * 60,
            //   floor: 7,
            //   likeCount: 9,
            //   _openid: 'osP-a5TmwUMTxhszPIXYrqrjYR4Y'
            // },
            // {
            //   author: 'LSL',
            //   avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJPDt8xdichhyOSaVGhlTecl5elHEnVDqOBLSow0wSRflFPfLobS3OeqVPVmUwcB4o2QBFIicia6IS5g/132',
            //   content: '不受控制地滚落在她脚下。',
            //   creatTime: new Date() + 3 * 60,
            //   floor: 8,
            //   likeCount: 2,
            //   _openid: 'osP-a5SxyKhyvoizAnnQ6oSN4eO8'
            // }

            // {
            //   author: '何晓义',
            //   avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLLMffuU8yicUdO42IguOuyjw7qEicoXLtO7O7P94aAZYKvaBmKgNZibUfiaJK3IWbGa8uozrtRg4pSoA/132',
            //   content:
            //     '亲爱的小白，因为你是你，因此我才是我。你是我脑海中缺少的那根弦，你是我的偏心眼偏向的方向。你是白色的绵羊，每晚只有数着你的名字我才能安然入睡。你是紫色的茄子，只要念起你的名字我就会忍不住微笑。 你是我的阳光、风光和时光。你是唯有，即是所有。你是一切，但一切都不能代替你。',
            //   creatTime: new Date(),
            //   floor: 1,
            //   likeCount: 20,
            //   _openid: 'osP-a5dva_JgJIB3FabQPmiQwo_Q'
            // },
            // {
            //   author: 'SJJ',
            //   avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK5texDS7iasveGHKZt7gTdbE7JSEA7nAicmeoXibdaVTAkWHDVsYRDLrMDkmsiaaMiazAgiaicNCnypJ1hg/132',
            //   content:
            //     '亲爱的小白，我的耳朵有点饿了，你的声音或许是某种食物。我的眼睛有点疼了，你的目光或许可以轻轻把它揉拭。我的四肢已经迷路了，你的注释或许是最美的灯塔。我的尾巴翘起来了，你的名字或许是它最大的骄傲。我的心跳越来越密集了，你的嘴巴或许可以道出它的恐慌。我的身体就要瘫倒了，你的依偎或许是最后的力量。 ',
            //   creatTime: new Date(),
            //   floor: 2,
            //   likeCount: 10,
            //   _openid: 'osP-a5TmwUMTxhszPIXYrqrjYR4Y'
            // },
            // {
            //   author: '这一刻为你.Ling',
            //   avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erajmnPRxFDmxxq0kC3f22xa4ia0gdzz0FHx5w6ZickDa9df1ybQZ54kT5RaaZfgjpgguFdCUSyFNzg/132',
            //   content:
            //     '亲爱的小白，你问我爱是什么？我想爱是为了静止而跳动的心。爱是废墟尚未变成废墟时的模样。爱是幻想，是一条鱼吻另一条鱼时涌起的一串气泡。爱是一只蝴蝶结，把原本平淡无奇的日子包裹得好像一份礼物。爱是一种的特的呼吸方式，爱是为喻体找到它的本体的旅程。爱是一阵微风吹过却唯独没有被吹醒的那双眼睛。爱是眼睛里开出的一朵花，世界从此缭乱。爱是两个病人之间的友谊——爱是一种疾病，唯一解救的方式，便是我们一起感染上。',
            //   creatTime: new Date(),
            //   floor: 3,
            //   likeCount: 25,
            //   _openid: 'osP-a5RFhFWnOFv9aw6HimvLnICY'
            // },
            // {
            //   author: 'LSL',
            //   avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJPDt8xdichhyOSaVGhlTecl5elHEnVDqOBLSow0wSRflFPfLobS3OeqVPVmUwcB4o2QBFIicia6IS5g/132',
            //   content:
            //     '亲爱的小白，因为那么执着地喜欢你，我才一点点努力着改掉自己身上所有的坏毛病。然而最后我发现，爱你其实才是我最大的毛病。而你知道吗？这个毛病最可怕的地方，是我根本不想改正。',
            //   creatTime: new Date(),
            //   floor: 4,
            //   likeCount: 35,
            //   _openid: 'osP-a5SxyKhyvoizAnnQ6oSN4eO8'
            // },
            // {
            //   author: '何晓义',
            //   avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLLMffuU8yicUdO42IguOuyjw7qEicoXLtO7O7P94aAZYKvaBmKgNZibUfiaJK3IWbGa8uozrtRg4pSoA/132',
            //   content:
            //     '亲爱的小白，世界上有那么多片森林，每片森林里有那么多条岔道，每一条岔道都能够带我们去一个未知的地点。因此有的兔子可能你一生都不会遇上。但只有遇上了，才是真正的一生。如何能被你找到，是我一直在寻找的奇迹。',
            //   creatTime: new Date(),
            //   floor: 5,
            //   likeCount: 6,
            //   _openid: 'osP-a5dva_JgJIB3FabQPmiQwo_Q'
            // },
            // {
            //   author: '这一刻为你.Ling',
            //   avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erajmnPRxFDmxxq0kC3f22xa4ia0gdzz0FHx5w6ZickDa9df1ybQZ54kT5RaaZfgjpgguFdCUSyFNzg/132',
            //   content:
            //     '亲爱的小白，当我爱这世界时，我希望所有人都能和我一起来爱它。但当我爱你时，我却希望全世界只我一个在爱你。你问我下辈子还想遇见你吗？我的答案是不想。因为我是一只自私的兔子，像遇见你这么美好的事情，我连下辈子的自己都不忍心与他来分享。',
            //   creatTime: new Date(),
            //   floor: 6,
            //   likeCount: 4,
            //   _openid: 'osP-a5RFhFWnOFv9aw6HimvLnICY'
            // },
            // {
            //   author: 'SJJ',
            //   avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK5texDS7iasveGHKZt7gTdbE7JSEA7nAicmeoXibdaVTAkWHDVsYRDLrMDkmsiaaMiazAgiaicNCnypJ1hg/132',
            //   content:
            //     '亲爱的小白，爱当然不能当胡萝卜吃，但如果是和心爱的兔子一起的话，胡萝卜一定会变得格外的好吃。爱不是食物，但爱和饥饿一样，是这世上最好的调味品，',
            //   creatTime: new Date(),
            //   floor: 7,
            //   likeCount: 9,
            //   _openid: 'osP-a5TmwUMTxhszPIXYrqrjYR4Y'
            // },
            // {
            //   author: 'LSL',
            //   avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJPDt8xdichhyOSaVGhlTecl5elHEnVDqOBLSow0wSRflFPfLobS3OeqVPVmUwcB4o2QBFIicia6IS5g/132',
            //   content:
            //     '亲爱的小白，时光正巧妙地对我们形成合围之势，或早或晚我们总要向其投降的。但我唯一心存奢望的胜利 是——即便到了最后，我们都还能一起携手投降',
            //   creatTime: new Date(),
            //   floor: 8,
            //   likeCount: 2,
            //   _openid: 'osP-a5SxyKhyvoizAnnQ6oSN4eO8'
            // }

            // {
            //   author: 'LSL',
            //   avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJPDt8xdichhyOSaVGhlTecl5elHEnVDqOBLSow0wSRflFPfLobS3OeqVPVmUwcB4o2QBFIicia6IS5g/132',
            //   content: '狐狸对小王子说：“如果你说你下午四点钟来，从三点钟开始，我就开始感觉很快乐，时间越临近，我就越来越感到快乐。',
            //   creatTime: new Date(),
            //   floor: 1,
            //   likeCount: 35,
            //   _openid: 'osP-a5SxyKhyvoizAnnQ6oSN4eO8'
            // },
            // {
            //   author: '何晓义',
            //   avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLLMffuU8yicUdO42IguOuyjw7qEicoXLtO7O7P94aAZYKvaBmKgNZibUfiaJK3IWbGa8uozrtRg4pSoA/132',
            //   content: '到了四点钟的时候，我就会坐立不安，我发现了幸福的价值，但是如果你随便什么时候来，我就不知道在什么时候准备好迎接你的心情了。',
            //   creatTime: new Date(),
            //   floor: 2,
            //   likeCount: 20,
            //   _openid: 'osP-a5dva_JgJIB3FabQPmiQwo_Q'
            // },
            // {
            //   author: 'SJJ',
            //   avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK5texDS7iasveGHKZt7gTdbE7JSEA7nAicmeoXibdaVTAkWHDVsYRDLrMDkmsiaaMiazAgiaicNCnypJ1hg/132',
            //   content: '要有一定的仪式。”',
            //   creatTime: new Date(),
            //   floor: 3,
            //   likeCount: 10,
            //   _openid: 'osP-a5TmwUMTxhszPIXYrqrjYR4Y'
            // }
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
