(function () {
  const ap = new APlayer({
    container: document.getElementById("aplayer"),
    fixed: true,
    autoplay: false,
    order: "random",
    preload: "auto",
    volume: 0.5,
    mutex: true,
    listFolded: false,
    listMaxHeight: 37,
    lrcType: 3,
    audio: [
      {
        name: "Daylight",
        artist: "Maroon 5",
        url: "http://music.163.com/song/media/outer/url?id=21253808.mp3",
        cover:
          "http://p1.music.126.net/zhb4NhgP262N24X7RmQBGg==/3222668584137511.jpg?param=130y130",
        lrc: "/music/lrc/Daylight.lrc",
      },
    ],
  });
  ap.lrc.hide();
})();
