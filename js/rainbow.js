(function () {
  class _footerRainbow {
    constructor(_url = "https://api.eatrice.top/") {
      let p = {
        url: _url,
        content: "",
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
          this.content = "🌈" + data.Content + ".   ——" + data.Author;
          //console.log(this.content);
        }
      } catch (error) {
        this.content = "Love ourselves.";
      }
    }
  }
  let rainbow = {
    footerRainbow: new _footerRainbow(),
    initRainbow: function () {
      rainbow.footerRainbow.getJSON().then(function () {
        let rainbowP = document.getElementById("rainbow");
        rainbowP.innerText = rainbow.footerRainbow.content;
      });
    },
  };
  rainbow.initRainbow();
})();
