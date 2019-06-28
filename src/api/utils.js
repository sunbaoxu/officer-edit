
export default {

  // 手机号验证
  verifyPhone(phone) {
    let re =/^1[345678]\d{9}$/;
    if (re.test(phone)) {
      return true;
    } else {
      return false;
    }
  },
  // 名字验证
  verifyName(name) {
    let re = /^[\u4E00-\u9FA5]{2,6}$/;
    if (re.test(name)) {
      return true;
    } else {
      return false;
    }
  },
//  身份证号正则
  verifyICCard(ICCard) {
    let re = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (re.test(ICCard)) {
      return true;
    } else {
      return false;
    }
  },
//BUS-APP-ID
  verifyBUSAPPID(BUSAPPID) {
    let re = /^[0-9]{6,11}$/;
    if (re.test(BUSAPPID)) {
      return true;
    } else {
      return false;
    }
  },
//图片验证码、短信验证码
  verifyCode(code) {
    let re = /^[0-9]{4,6}$/;
    if (re.test(code)) {
      return true;
    } else {
      return false;
    }
  },


}




