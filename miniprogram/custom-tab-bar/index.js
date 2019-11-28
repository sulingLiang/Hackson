Component({
  data: {
    selected: 0,
    color: '#000',
    selectedColor: '#E54847',
    list: [
      {
        pagePath: '/pages/index/index',
        iconPath: '/images/book.png',
        selectedIconPath: '/images/book-actived.png',
        text: '首页'
      },
      {
        add: true,
        pagePath: '/pages/add/add',
        text: '发布'
      },
      {
        pagePath: '/pages/profile/profile',
        iconPath: '/images/profile.png',
        selectedIconPath: '/images/profile-actived.png',
        text: '我的'
      }
    ]
  },
  attached() {},
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      wx.switchTab({
        url
      });
      this.setData({
        selected: data.index
      });
    },
    getUserInfo: function(e) {
      if (e.detail.userInfo) {
        getApp().globalData.userInfo = e.detail.userInfo
        this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        })
      } else {
        wx.switchTab({
          url:"/pages/index/index"
        });
        this.setData({
          selected: 0
        });
      }
    },
  }
});