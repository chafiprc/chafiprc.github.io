(function () {
  class _customSlogan {
    constructor(
      _url = "https://v1.hitokoto.cn/?c=d&c=i&c=j&max_length=20",
      _speed = 500,
      _removeSpeed = 100
    ) {
      let p = {
        url: _url,
        author: "",
        content: "",
        speed: _speed,
        removeSpeed: _removeSpeed,
      };
      Object.assign(this, p);
    }
    async getJSON() {
      try {
        const response = await fetch(this.url);
        if (!response.ok) {
          throw new Error("请求失败");
        } else {
          const data = await response.json();
          this.content = data.hitokoto;
          //console.log(data.hitokoto);
          this.author = "--" + data.from + "-" + data.from_who;
        }
      } catch (error) {
        this.content = "A Casual Blog of Rufish.";
        this.author = "A Casual Blog of Rufish.";
      }
      //return { content: this.content, author: this.author };
    }
  }
  let customSlogan = {
    slogan: new _customSlogan(),
    sloganStatus: 1,
    sloganID: document.getElementById("subtitle"),
    sleep: function (ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    changeSlogan: async function () {
      switch (this.sloganStatus) {
        case 0: {
          for (let i in this.slogan.content) {
            this.sloganID.innerText = this.slogan.content.slice(
              0,
              Number(i) + 1
            );
            await this.sleep(this.slogan.speed);
            //console.log(this.sloganID.innerText);
          }
          this.sloganStatus = 1;
          break;
        }
        case 1: {
          for (let i = this.slogan.content.length; i > 0; i--) {
            this.sloganID.innerText = this.slogan.content.slice(0, i - 1);
            await this.sleep(this.slogan.removeSpeed);
            //console.log(this.sloganID.innerText);
          }
          this.sloganStatus = 2;
          break;
        }
        case 2: {
          for (let i in this.slogan.author) {
            this.sloganID.innerText = this.slogan.author.slice(
              0,
              Number(i) + 1
            );
            await this.sleep(this.slogan.speed);
            //console.log(this.sloganID.innerText);
          }
          this.sloganStatus = 3;
          break;
        }
        case 3: {
          for (let i = this.slogan.author.length; i > 0; i--) {
            this.sloganID.innerText = this.slogan.author.slice(0, i - 1);
            await this.sleep(this.slogan.removeSpeed);
            //console.log(this.sloganID.innerText);
          }
          this.sloganStatus = 0;
          break;
        }
      }
      //alert(this.sloganStatus);
      setTimeout(this.changeSlogan.bind(customSlogan), 1000);
    },
    initializeAndStartSlogan: function () {
      this.slogan.getJSON().then(function () {
        this.changeSlogan().bind(customSlogan);
      });
    },
  };
  //alert("?");
  customSlogan.initializeAndStartSlogan();
  //customSlogan.changeSlogan();
})();
