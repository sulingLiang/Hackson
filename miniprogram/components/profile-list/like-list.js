// components/profile-list/like-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    // likeList: [{
    //   imgUrl: '',
    //   name: 'This is a funny story This is a funny story'
    // }, {
    //   imgUrl: '',
    //   name: 'This is a funny story'
    // }, {
    //   imgUrl: '',
    //   name: 'This is a funny story'
    // }, {
    //   imgUrl: '',
    //   name: 'This is a funny story'
    // }, {
    //   imgUrl: '',
    //   name: 'This is a funny story'
    // }, {
    //   imgUrl: '',
    //   name: 'This is a funny story'
    // }],
    // gridCol: 3,
    // skin: false,
    likeList: [
      {
        imgUrl: '',
        title: 'Like',
        desc: 'hahaha, do you like this story'
      },
      {
        imgUrl: '',
        title: 'This is a funny story',
        desc: 'hahaha, do you like this story'
      },
      {
        imgUrl: '',
        title: 'This is a funny story',
        desc: 'hahaha, do you like this story'
      },
      {
        imgUrl: '',
        title: 'This is a funny story',
        desc: 'hahaha, do you like this story'
      }
    ],
    partakeList: [
      {
        imgUrl: '',
        title: 'Partake',
        desc: 'hahaha, do you like this story'
      },
      {
        imgUrl: '',
        title: 'This is a funny story',
        desc: 'hahaha, do you like this story'
      },
      {
        imgUrl: '',
        title: 'This is a funny story',
        desc: 'hahaha, do you like this story'
      },
      {
        imgUrl: '',
        title: 'This is a funny story',
        desc: 'hahaha, do you like this story'
      }
    ],
    publishList: [
      {
        imgUrl: '',
        title: 'Publish',
        desc: 'hahaha, do you like this story'
      },
      {
        imgUrl: '',
        title: 'This is a funny story',
        desc: 'hahaha, do you like this story'
      },
      {
        imgUrl: '',
        title: 'This is a funny story',
        desc: 'hahaha, do you like this story'
      },
      {
        imgUrl: '',
        title: 'This is a funny story',
        desc: 'hahaha, do you like this story'
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // ListTouch触摸开始
    ListTouchStart(e) {
      this.setData({
        ListTouchStart: e.touches[0].pageX
      })
    },

    // ListTouch计算方向
    ListTouchMove(e) {
      this.setData({
        ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
      })
    },

    // ListTouch计算滚动
    ListTouchEnd(e) {
      if (this.data.ListTouchDirection == 'left') {
        this.setData({
          modalName: e.currentTarget.dataset.target
        })
      } else {
        this.setData({
          modalName: null
        })
      }
      this.setData({
        ListTouchDirection: null
      })
    },
  }
})
