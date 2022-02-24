let isCamOn = true;
let isMicOn = true;
let isScreenOn = false;
let isJoined = true;
let rtc = null;
let share = null;
let shareUserId = "";
let cameraId = "";
let micId = "";

function login() {
  presetting.login(false, (options) => {
    rtc = new RtcClient(options);
    console.log(141414414, options, rtc);
    join();
  });
  presetting.login(true, (options) => {
    shareUserId = options.userId;
    share = new ShareClient(options);
  });
}

function join() {
  rtc.join();
  $("#login-root").hide();
  $("#room-root").show();
  $("#header-roomId").html("房间号: " + $("#roomId").val());
  $("#member-me")
    .find(".member-id")
    .html($("#userId").val() + "(我)");

  console.log(33333333333, rtc);
}

function leave() {
  $("#mask_main").appendTo($("#main-video"));
  rtc.leave();
  share.leave();
}

function publish() {
  rtc.publish();
}

function unpublish() {
  rtc.unpublish();
}

function muteAudio() {
  rtc.muteLocalAudio();
}

function unmuteAudio() {
  rtc.unmuteLocalAudio();
}

function muteVideo() {
  $("#mask_main").show();
  rtc.muteLocalVideo();
}

function unmuteVideo() {
  rtc.unmuteLocalVideo();
  $("#mask_main").hide();
}

function startSharing() {
  share.join();
}

function stopSharing() {
  share.leave();
}

function setBtnClickFuc() {
  //userid roomid规格
  //$('#userId').on('input', function(e) {
  //    e.preventDefault();
  //    console.log('userId input ' + e.target.value);
  //    let val = $('#userId').val().slice(5);
  //    $('#userId').val('user_'+val.replace(/[^\d]/g,''));
  //});

  // $('#roomId').on('input', function(e) {
  //     e.preventDefault();
  //     console.log('roomId input ' + e.target.value);
  //     let val = $('#roomId').val();
  //     $('#roomId').val(val.replace(/[^\d]/g,''));
  // });

  //login
  //  $('#login-btn').click(() => {
  //     login();
  // });
  login();

  //open or close camera
  $("#video-btn").on("click", () => {
    if (isCamOn) {
      $("#video-btn").attr("src", "./img/big-camera-off.png");
      $("#video-btn").attr("title", "打开摄像头");
      $("#member-me")
        .find(".member-video-btn")
        .attr("src", "img/camera-off.png");
      isCamOn = false;
      muteVideo();
    } else {
      $("#video-btn").attr("src", "./img/big-camera-on.png");
      $("#video-btn").attr("title", "关闭摄像头");
      $("#member-me")
        .find(".member-video-btn")
        .attr("src", "img/camera-on.png");
      isCamOn = true;
      unmuteVideo();
    }
  });
  //open or close microphone
  $("#mic-btn").on("click", () => {
    if (isMicOn) {
      $("#mic-btn").attr("src", "./img/big-mic-off.png");
      $("#mic-btn").attr("title", "打开麦克风");
      $("#member-me").find(".member-audio-btn").attr("src", "img/mic-off.png");
      isMicOn = false;
      muteAudio();
    } else {
      $("#mic-btn").attr("src", "./img/big-mic-on.png");
      $("#mic-btn").attr("title", "关闭麦克风");
      $("#member-me").find(".member-audio-btn").attr("src", "img/mic-on.png");
      isMicOn = true;
      unmuteAudio();
    }
  });
  //share screen or not
  $("#screen-btn").on(
    "click",
    throttle(() => {
      if (!TRTC.isScreenShareSupported()) {
        alert("当前浏览器不支持屏幕分享！");
        return;
      }
      if ($("#screen-btn").attr("src") == "./img/screen-on.png") {
        $("#screen-btn").attr("src", "./img/screen-off.png");
        stopSharing();
        isScreenOn = false;
      } else {
        $("#screen-btn").attr("src", "./img/screen-on.png");
        startSharing();
        isScreenOn = true;
      }
    }, 2000)
  );
  //logout
  $("#logout-btn").on("click", () => {
    // $('#login-root').show();
    //弹窗
    var msg =
      "确定结束公证视频吗？\n(结束后，如果当事人要再次视频公证，需要当事人重新订阅小程序消息。)";
    if (confirm(msg) == true) {
      $.ajax({
        //提交数据的类型 POST GET
        type: "POST",
        //提交的网址
        url:
          window.location.protocol +
          "//" +
          window.location.host +
          "/agw/api/videoRoom/1.1/exitRoomByNotary",
        data: JSON.stringify({
          roomId: getUrlParamValue("roomId"),
          userId: getUrlParamValue("userId"),
        }),
        //返回数据的格式
        contentType: "application/json; charset=utf-8",
        datatype: "json", //"xml", "html", "script", "json", "jsonp", "text".

        //成功返回之后调用的函数
        success: function (data) {
          leave();
          $("#room-root").hide();
        },
        //调用执行后调用的函数
        complete: function (XMLHttpRequest, textStatus) {
          // console.log(XMLHttpRequest.responseText);
          // console.log(textStatus);
          window.parent.postMessage({
            params: textStatus,
          });
        },
        //调用出错执行的函数
        error: function (err) {
          //请求出错处理
          alert("失败" + err.msg);
          console.log("err", err);
        },
      });
    } else {
      return false;
    }
  });
  //switch main video
  $("#main-video").on("click", () => {
    let mainVideo = $(".video-box").first();
    if ($("#main-video").is(mainVideo)) {
      return;
    }
    //释放main-video grid-area
    // mainVideo.css("grid-area", "1/4/2/8");

    exchangeView($("#main-video"), mainVideo);
    //将video-grid中第一个div设为main-video

    // $('.video-box').first().css('grid-area', '1/1/2/6');

    //chromeM71以下会自动暂停，手动唤醒
    if (getBroswer().broswer == "Chrome" && getBroswer().version < "72") {
      rtc.resumeStreams();
    }
  });

  //chrome60以下不支持popover，防止error
  if (getBroswer().broswer == "Chrome" && getBroswer().version < "60") return;
  //开启popover
  $(function () {
    $('[data-toggle="popover"]').popover();
  });
  $("#camera").popover({
    html: true,
    content: () => {
      return $("#camera-option").html();
    },
  });
  $("#microphone").popover({
    html: true,
    content: () => {
      return $("#mic-option").html();
    },
  });

  $("#camera").on("click", () => {
    $("#microphone").popover("hide");
    $(".popover-body").find("div").attr("onclick", "setCameraId(this)");
  });

  $("#microphone").on("click", () => {
    $("#camera").popover("hide");
    $(".popover-body").find("div").attr("onclick", "setMicId(this)");
  });

  //点击body关闭popover
  $("body").click(() => {
    $("#camera").popover("hide");
    $("#microphone").popover("hide");
  });

  //popover事件
  $("#camera").on("show.bs.popover", () => {
    $("#camera").attr("src", "./img/camera-on.png");
  });
  $("#camera").on("hide.bs.popover", () => {
    $("#camera").attr("src", "./img/camera.png");
  });

  $("#microphone").on("show.bs.popover", () => {
    $("#microphone").attr("src", "./img/mic-on.png");
  });
  $("#microphone").on("hide.bs.popover", () => {
    $("#microphone").attr("src", "./img/mic.png");
  });
}

function setCameraId(thisDiv) {
  cameraId = $(thisDiv).attr("id");
  console.log("setCameraId: " + cameraId);
}

function setMicId(thisDiv) {
  micId = $(thisDiv).attr("id");
  console.log("setMicId: " + micId);
}

function addVideoView(id, userID, isLocal = false) {
  console.log(281111, id, userID, isLocal);
  let div = $("<div/>", {
    id: id,
    class: "video-box",
    style: "justify-content: center",
  });
  div.appendTo("#video-grid");
  //添加远程小视频 userId
  /*   let el = $(
    `<span style="position: absolute;bottom: 15px; left: 50%;color: #fff;z-index: 99;transform: translate(-50%,0);">userId:${userID}</span>`
  );
  el.appendTo(div); */

  //设置监听
  div.click(() => {
    let mainVideo = $(".video-box").first();
    if (div.is(mainVideo)) {
      return;
    }

    //释放main-video grid-area
    // mainVideo.css("grid-area", "1/4/2/8");

    exchangeView(div, mainVideo);
    //将video-grid中第一个div设为main-video

    // $(".video-box").first().css("grid-area", "1/1/2/6");

    //chromeM71以下会自动暂停，手动唤醒
    if (getBroswer().broswer == "Chrome" && getBroswer().version < "72") {
      rtc.resumeStreams();
    }
  });
}

//添加用户列表 userid
function addMemberView(id, arr) {
  console.log(311311311311311, id, arr);
  let memberElm = $("#member-me").clone();
  memberElm.attr("id", id);
  memberElm.find("div.member-id").html(id);
  memberElm.css("display", "flex");
  memberElm.appendTo($("#member-list"));
  console.log(325, memberElm);
}

function removeView(id) {
  if ($("#" + id)[0]) {
    $("#" + id).remove();
    //将video-grid中第一个div设为main-video

    // $(".video-box").first().css("grid-area", "1/1/2/3");
  }
}

function exchangeView(a, b) {
  var $div1 = $(a);
  var $div3 = $(b);
  var $temobj1 = $("<div></div>");
  var $temobj2 = $("<div></div>");
  $temobj1.insertBefore($div1);
  $temobj2.insertBefore($div3);
  $div1.insertAfter($temobj2);
  $div3.insertAfter($temobj1);
  $temobj1.remove();
  $temobj2.remove();
}

function isPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = new Array(
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod"
  );
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

function getCameraId() {
  console.log("selected cameraId: " + cameraId);
  return cameraId;
}

function getMicrophoneId() {
  console.log("selected microphoneId: " + micId);
  return micId;
}

function throttle(func, delay) {
  var timer = null;
  var startTime = Date.now();
  return function () {
    var curTime = Date.now();
    var remaining = delay - (curTime - startTime);
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    if (remaining <= 0) {
      func.apply(context, args);
      startTime = Date.now();
    } else {
      timer = setTimeout(() => {
        console.log("duplicate click");
      }, remaining);
    }
  };
}

function resetView() {
  isCamOn = true;
  isMicOn = true;
  isScreenOn = false;
  isJoined = true;
  $("#main-video-btns").hide();
  $("#video-btn").attr("src", "./img/big-camera-on.png");
  $("#mic-btn").attr("src", "./img/big-mic-on.png");
  $("#screen-btn").attr("src", "./img/screen-off.png");
  $("#member-me").find(".member-video-btn").attr("src", "img/camera-on.png");
  $("#member-me").find(".member-audio-btn").attr("src", "img/mic-on.png");
  $(".mask").hide();
  //清空member-list
  if ($("#member-list")) {
    $("#member-list")
      .find(".member")
      .each((index, element) => {
        console.log(417, index, element);
        if ($(element).parent().attr("id") != "member-me") {
          $(element).parent().remove();
        }
      });
  }
}

function getBroswer() {
  var sys = {};
  var ua = navigator.userAgent.toLowerCase();
  var s;
  (s = ua.match(/edge\/([\d.]+)/))
    ? (sys.edge = s[1])
    : (s = ua.match(/rv:([\d.]+)\) like gecko/))
    ? (sys.ie = s[1])
    : (s = ua.match(/msie ([\d.]+)/))
    ? (sys.ie = s[1])
    : (s = ua.match(/firefox\/([\d.]+)/))
    ? (sys.firefox = s[1])
    : (s = ua.match(/chrome\/([\d.]+)/))
    ? (sys.chrome = s[1])
    : (s = ua.match(/opera.([\d.]+)/))
    ? (sys.opera = s[1])
    : (s = ua.match(/version\/([\d.]+).*safari/))
    ? (sys.safari = s[1])
    : 0;

  if (sys.edge) return { broswer: "Edge", version: sys.edge };
  if (sys.ie) return { broswer: "IE", version: sys.ie };
  if (sys.firefox) return { broswer: "Firefox", version: sys.firefox };
  if (sys.chrome) return { broswer: "Chrome", version: sys.chrome };
  if (sys.opera) return { broswer: "Opera", version: sys.opera };
  if (sys.safari) return { broswer: "Safari", version: sys.safari };

  return { broswer: "", version: "0" };
}

function isHidden() {
  var hidden, visibilityChange;
  if (typeof document.hidden !== "undefined") {
    hidden = "hidden";
    visibilityChange = "visibilitychange";
  } else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
  } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
  }
  return document[hidden];
}

getUrlParamValue = function (name) {
  if (name == null || name == "undefined") {
    return null;
  }

  var searchStr = decodeURI(location.search);

  var infoIndex = searchStr.indexOf(name + "=");

  if (infoIndex == -1) {
    return null;
  }

  var searchInfo = searchStr.substring(infoIndex + name.length + 1);

  var tagIndex = searchInfo.indexOf("&");

  if (tagIndex != -1) {
    searchInfo = searchInfo.substring(0, tagIndex);
  }

  return searchInfo;
};
