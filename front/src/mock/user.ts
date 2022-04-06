import Mock from 'mockjs';
import setupMock from '../utils/setupMock';

setupMock({
  setup() {
    Mock.XHR.prototype.withCredentials = true;

    // 用户信息
    Mock.mock(new RegExp('/api/user/userInfo'), () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      return {
        name: userInfo.username,
        avatar:
          'https://lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png',
        email: 'wangliqun@email.com',
        job: 'frontend',
        jobName: '前端开发工程师',
        organization: 'Frontend',
        organizationName: '前端',
        location: 'beijing',
        locationName: '北京',
        introduction: '王力群并非是一个真实存在的人。',
        personalWebsite: 'https://www.arco.design',
      };
    });

    // 登录
    Mock.mock(new RegExp('/api/user/login'), (params) => {
      const { userName, password } = JSON.parse(params.body);
      if (!userName) {
        return {
          status: 'error',
          msg: '用户名不能为空',
        };
      }
      if (!password) {
        return {
          status: 'error',
          msg: '密码不能为空',
        };
      }
      if (userName === 'admin' && password === 'admin') {
        return {
          status: 'ok',
        };
      }
      return {
        status: 'error',
        msg: '账号或者密码错误',
      };
    });
    Mock.mock(new RegExp('/api/user/register'), (params) => {
      const { userName, password, email } = JSON.parse(params.body);
      if (!userName) {
        return {
          status: 'error',
          msg: '用户名不能为空',
        };
      }
      if (!password) {
        return {
          status: 'error',
          msg: '密码不能为空',
        };
      }
      if (!email) {
        return {
          status: 'error',
          msg: '邮件不能为空',
        };
      }

      return {
        status: 'ok',
        msg: '注册成功',
      };
    });
  },
  // 注册
});
