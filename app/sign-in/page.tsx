'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../../api/authApi';
import Image from 'next/image';
import style from './page.module.css';
import Link from 'next/link';

export default function SignIn() {
  const [isVisivle, setIsVisivle] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [typeOfEmailError, setTypeOfEmailError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleIsVisible = () => {
    setIsVisivle((current) => !current);
  };

  const handleInputWarning = (e: React.FocusEvent<HTMLInputElement>) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const value = e.target.value;
    if (e.target.name === 'email') {
      if (value === '') {
        setIsInvalidEmail((current) => !current);
        setTypeOfEmailError('이메일을 입력해주세요.');
      } else if (!emailRegex.test(value)) {
        setIsInvalidEmail((current) => !current);
        setTypeOfEmailError('올바른 이메일 주소가 아닙니다.');
      }
    } else if (e.target.name === 'password') {
      if (value === '') {
        setIsInvalidPassword((current) => !current);
      }
    }
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      WIP();
    }
  };

  const handleLogin = async () => {
    const response = await login(email, password);
    if (response) router.push('/dashboard');
  };

  const WIP = () => {
    alert('개발중입니다.');
  };

  return (
    <div className={style.container} onKeyDown={(e) => handleEnterKey(e)}>
      <div className={style.contents}>
        <div className={style.logoBox}>
          <Link href='/'>
            <Image src='/icons/logo.svg' width={218} height={78} alt='로고' />
          </Link>
          <span>
            회원이 아니신가요? <Link href='/sign-up'>회원가입 하기</Link>
          </span>
        </div>
        <div className={style.inputBox}>
          <label htmlFor='email'>
            <h2>이메일</h2>
            <input
              id='email'
              type='text'
              name='email'
              onBlur={(e) => handleInputWarning(e)}
              onFocus={() => setIsInvalidEmail(false)}
              onChange={(e) => setEmail(e.target.value)}
              className={isInvalidEmail ? style.invalidate : ''}
            />
          </label>
          <h6 className={isInvalidEmail ? '' : style.disabled}>{isInvalidEmail && typeOfEmailError}</h6>
          <label htmlFor='password'>
            <h2>비밀번호</h2>
            <input
              id='password'
              type={isVisivle ? 'text' : 'password'}
              name='password'
              onBlur={(e) => handleInputWarning(e)}
              onFocus={() => setIsInvalidPassword(false)}
              onChange={(e) => setPassword(e.target.value)}
              className={isInvalidPassword ? style.invalidate : ''}
            />
            <Image
              src={isVisivle ? '/icons/eye-on.svg' : '/icons/eye-off.svg'}
              width={16}
              height={16}
              alt='비밀번호 노출 아이콘'
              onClick={handleIsVisible}
            />
          </label>
          <h6>{isInvalidPassword ? '비밀번호를 입력해주세요.' : ''}</h6>
        </div>
        <div className={style.buttonBox}>
          <div className={style.loginButton} onClick={handleLogin}>
            로그인
          </div>
          <div className={style.socialLoginBox}>
            <h2>소셜 로그인</h2>
            <div>
              <Image src='/icons/login-google.svg' width={42} height={42} alt='소셜로그인 아이콘-구글' onClick={WIP} />
              <Image src='/icons/login-kakao.svg' width={42} height={42} alt='소셜로그인 아이콘-구글' onClick={WIP} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
