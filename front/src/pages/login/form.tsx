import { Form, Input, Checkbox, Link, Button, Space } from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import { IconLock, IconUser, IconEmail } from '@arco-design/web-react/icon';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styles from './style/index.module.less';
import history from '../../history';

export default function LoginForm() {
  const formRef = useRef<FormInstance>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);
  const [submitType, setSubmitType] = useState('login');

  function afterLoginSuccess(params) {
    // 记住密码
    if (rememberPassword) {
      localStorage.setItem('loginParams', JSON.stringify(params));
    } else {
      localStorage.removeItem('loginParams');
    }

    // 记录登录状态
    localStorage.setItem('userStatus', 'login');
    // 跳转首页
    window.location.href = history.createHref({
      pathname: '/',
    });
  }

  function login(params) {
    setErrorMessage('');
    setLoading(true);

    axios
      .post('http://127.0.0.1:3000/login/', params, {
        headers: { withCredentials: true },
      })
      .then((res) => {
        const { data: resData } = res;
        if (resData) {
          const { status, msg, data } = resData;
          if (status === 1) {
            window.localStorage.setItem('userInfo', JSON.stringify({ ...data }));
            window.localStorage.setItem('uid', data.id);
            document.cookie = `userId=${data.id};domain=http://127.0.0.1:8081/`;
            afterLoginSuccess(params);
          }
          setErrorMessage(msg || '登录出错，请刷新重试');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function register(params) {
    setErrorMessage('');
    setLoading(true);

    axios
      .post('http://127.0.0.1:3000/users', params)
      .then((res) => {
        const { data: resData } = res;
        if (resData) {
          const { status, msg, data } = resData;
          if (status === 1) {
            window.localStorage.setItem('userInfo', JSON.stringify({ ...data }));

            afterLoginSuccess(params);
          } else {
            setErrorMessage(msg || '注册出错，请刷新重试');
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function onSubmitClick() {
    formRef.current.validate().then((values) => {
      if (submitType === 'login') {
        login(values);
      }
      if (submitType === 'register') {
        register(values);
      }
    });
  }
  function handleRegister() {
    setSubmitType(submitType === 'register' ? 'login' : 'register');
  }

  // 读取 localStorage，设置初始值
  useEffect(() => {
    const params = localStorage.getItem('loginParams');
    const rememberPassword = !!params;
    setRememberPassword(rememberPassword);
    if (formRef.current && rememberPassword) {
      const parseParams = JSON.parse(params);
      formRef.current.setFieldsValue(parseParams);
    }
  }, []);

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>
        {submitType === 'login' ? '登录' : '注册'} CEG 会议系统
      </div>
      <div className={styles['login-form-error-msg']}>{errorMessage}</div>
      <Form className={styles['login-form']} layout="vertical" ref={formRef}>
        {submitType === 'login' ? (
          <>
            <Form.Item field="username" rules={[{ required: true, message: '用户名不能为空' }]}>
              <Input
                prefix={<IconUser />}
                placeholder="请输入用户名"
                onPressEnter={onSubmitClick}
              />
            </Form.Item>
            <Form.Item field="password" rules={[{ required: true, message: '密码不能为空' }]}>
              <Input.Password
                prefix={<IconLock />}
                placeholder="请输入密码"
                onPressEnter={onSubmitClick}
              />
            </Form.Item>
            <div className={styles['login-form-password-actions']}>
              <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
                记住密码
              </Checkbox>
              <Link>忘记密码？</Link>
            </div>
          </>
        ) : (
          <>
            <Form.Item field="username" rules={[{ required: true, message: '用户名不能为空' }]}>
              <Input
                prefix={<IconUser />}
                placeholder="请输入用户名"
                onPressEnter={onSubmitClick}
              />
            </Form.Item>
            <Form.Item
              field="password"
              rules={[
                {
                  required: true,
                  message: '密码不能为空',
                },
              ]}
            >
              <Input.Password
                prefix={<IconLock />}
                placeholder="请输入密码"
                onPressEnter={onSubmitClick}
              />
            </Form.Item>
            <Form.Item field="email" rules={[{ required: true, message: '邮箱不能为空' }]}>
              <Input prefix={<IconEmail />} placeholder="请输入邮箱" onPressEnter={onSubmitClick} />
            </Form.Item>
          </>
        )}

        <Space size={16} direction="vertical">
          <Button
            style={{ marginTop: '16px' }}
            type="primary"
            long
            onClick={onSubmitClick}
            loading={loading}
          >
            {submitType === 'login' ? '登录' : '注册'}
          </Button>
          <Button
            type="text"
            onClick={handleRegister}
            long
            className={styles['login-form-register-btn']}
          >
            {submitType === 'login' ? '注册账号' : '登录'}
          </Button>
        </Space>
      </Form>
    </div>
  );
}
