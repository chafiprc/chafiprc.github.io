(function () {
  let jumpNum = {
    tag: "jumpNum", //html标签名称
    speed: 50,
    minTime: 500,
    maxTime: 5000,
    maxTimeOut: 500,
    sleep: function (ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    getNum: function (eachJNE) {
      let getNumTimes = 0;
      let attemptTime = ~~(jumpNum.maxTimeOut / jumpNum.speed);
      while (getNumTimes <= attemptTime) {
        if (
          !isNaN(Number(eachJNE.innerText)) &&
          Number(eachJNE.innerText) !== 0
        ) {
          return Number(eachJNE.innerText);
        }
        jumpNum.sleep(jumpNum.speed);
        getNumTimes++;
      }
      throw "Can't get number.";
    },
    executeJumpNum: async function (eachJNE, duration) {
      let num = Number(); // 显示的数
      let step = Number(); //步长
      let temp = Number(); //每一步执行后的数
      let times = ~~(duration / jumpNum.speed); //次数
      try {
        num = jumpNum.getNum(eachJNE);
        temp = 0;
        eachJNE.innerText = String(num);
        step = ~~(num / times);
        for (let i = 0; i < times; i++) {
          temp += step;
          step = ~~((num - temp) / (times - i - 1)); //更新步长，使步长更为均匀
          await jumpNum.sleep(jumpNum.speed);
          eachJNE.innerText = String(temp);
          //console.log(temp);
        }
        await jumpNum.sleep(jumpNum.speed);
        eachJNE.innerText = String(num);
      } catch (value) {
        console.log(value);
      }
    },
    init: function () {
      let allEle = $(jumpNum.tag);
      for (let eachJNE of allEle) {
        let duration = Number();
        try {
          duration = Number(eachJNE.getAttribute("duration"));
          if (duration < jumpNum.minTime && duration > 0) {
            duration = jumpNum.minTime;
          } else if (duration > jumpNum.maxTime) {
            duration = jumpNum.maxTime;
          } else if (
            duration >= jumpNum.minTime &&
            duration <= jumpNum.maxTime
          ) {
            duration = duration;
          } else {
            duration = 2000;
          }
          if (isNaN(duration)) {
            throw "Not a Number, set to default.";
          }
        } catch {
          duration = 2000;
        }
        console.log(duration);
        let type = String();
        type = String(eachJNE.getAttribute("type"));
        if (type !== "hover") {
          jumpNum.executeJumpNum(eachJNE, duration);
        } else {
          $(eachJNE).mouseover(function () {
            jumpNum.executeJumpNum(eachJNE, duration);
            $(eachJNE).off();
          });
        }
      }
    },
  };
  jumpNum.init();
})();
