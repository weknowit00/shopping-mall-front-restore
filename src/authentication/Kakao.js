import PropTypes from 'prop-types';

import KakaoLogin from 'react-kakao-login';
import { snsPayloadParser } from './Common';
import React, {useState, useEffect} from "react";
import axios from "../axios/axios";
import {useHistory} from "react-router-dom";
import { useStateValue } from "../StateProvider/StateProvider";
import Cookies from "js-cookie";
import { SocialKey } from "./SocialKey";

const Kakao = (props) => {

const history = useHistory();

const [{ auth }, dispatch] = useStateValue();

//const key = SocialKey;

const postForm = () => {        
    axios.post(`users`, values)
    .then(alert("가입이 완료되었습니다."))
    .then(res => setSocialUser(res))
    .catch(err => console.log(err))
}

  const setSocialUser = (res) => {
    if (res.data == "") {
     return confirmAction();
    } else {
      return new Promise((resolve, reject) => {
        resolve(
          dispatch({
            type: "SET_USER",
            user: res.data,
          })
        );

        console.log(res);
        Cookies.set("user", res.data.user_sequence_id);

        history.push("/home");
      });
    }
  };

  const [values, setValues] = useState({
    user_id: "",
    user_pwd: '12345',
    user_pwd2: '12345',
    user_name: "",
    user_phone: "010-8282-2424",
    user_address: "회원정보에서 수정",
  });


  console.log(values);


  const useConfirm = (message = "", event, cancel) => {
    if (typeof event !== "function") {
      return;
    }

    const confirmEvent = () => {
      if (window.confirm(message)) {
        event();
      } else {
        cancel();
      }
    };
    return confirmEvent;
  };

  const event = () => postForm(); 
  const cancel = () => alert("가입이 취소 되었습니다");
  const confirmAction = useConfirm("해당 계정 정보가 없습니다. 해당 계정으로 가입하시겠습니까?", event, cancel) 

  const token = "d29462695c7d01d40d371be7929fc1b8" || '';

  const success = (payload) => {
    
      props.success(snsPayloadParser.KAKAO(payload))
     
      setValues({
        ...values,
        user_id: snsPayloadParser.KAKAO(payload).email,
        user_name: snsPayloadParser.KAKAO(payload).name,
      })

      console.log(payload)
    }
  
  useEffect(()=>{
    if(values.user_id==""){
      return;
    }else{
      axios.get("/users/login", {
        params: {
          user_id: values.user_id,
          user_pwd: values.user_pwd,
        },
      })
      .then((res) => setSocialUser(res))
      .catch((err) => console.log(err)); } 
    }, [success])

  const fail = (payload) => {
    props.fail(payload);
  };

  if (!token) return <>액세스 키를 확인해주세요.</>

  return (
    <KakaoLogin
      token={token}
      onSuccess={success}
      onFailure={fail}
      getProfile={true}
      render={renderProps => (
          //props로 전달된 위의 값들을 onClick으로 render
        <button onClick={renderProps.onClick} style={{width:'100%'}}>Kakao Login</button>
      )}
    />
  );
};

Kakao.propTypes = {
  success: PropTypes.func.isRequired,
  fail: PropTypes.func.isRequired,
};

export default Kakao;