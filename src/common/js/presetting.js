/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2020-07-23 10:49:22
 * @LastEditors: Others
 * @LastEditTime: 2020-07-23 11:42:02
 * @Version: 1.0.0
 * @Description: 
 */ 

// preset before starting RTC
export default class Presetting {
  init() {
    // populate userId/roomId
    $('#userId').val('user_' + parseInt(Math.random() * 100000000));
    $('#roomId').val(parseInt(Math.random() * 100000));
    const roomId = this.query('roomId');
    const userId = this.query('userId');
    if (roomId) {
      $('#roomId').val(roomId);
    }
    if (userId) {
      $('#userId').val(userId);
    }

    $('#main-video-btns').hide();
    $('.mask').hide();
    setBtnClickFuc();
  }

  query(name) {
    const match = window.location.search.match(new RegExp('(\\?|&)' + name + '=([^&]*)(&|$)'));
    return !match ? '' : decodeURIComponent(match[2]);
  }

  login(share, callback) {
    let userId = $('#userId').val();
    if (share) {
      userId = 'share_' + userId;
    }
    const config = genTestUserSig(userId);
    const sdkAppId = config.sdkAppId;
    const userSig = config.userSig;
    const roomId = $('#roomId').val();

    callback({
      sdkAppId,
      userId,
      userSig,
      roomId
    });
  }
}
