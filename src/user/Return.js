import React, {useState, useEffect} from 'react'
import './Return.css'
import axios from '../axios/axios'
import { useParams } from 'react-router-dom';
import CurrencyFormat from "react-currency-format";
import { useHistory } from 'react-router-dom'
import { useStateValue } from '../StateProvider/StateProvider';
function Return() {
    const [customer, setCustomer] = useState([]);
    const {user_sequence_id} = useParams();
    const history = useHistory();
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`users/${user_sequence_id}`)
            .then(response => 
                setCustomer(response.data)
            )
            .catch(error => console.log(error))
           
            return request;
        }
        fetchData();
    }, [])
    console.log(user_sequence_id)
    console.log(customer)

    const [table, setTable] = useState({
        user_id : customer.user_id,
        user_name : customer.user_name,
        user_phone : customer.user_phone,
        user_address: customer.user_address,
        order_amount: customer.order_amount  
    })

    
    return (
        <div className="return">
            <div className="return__container">
            <div className="return_table">
                
                <p className="return_title">반품 사유 선택</p>
                <table className="return__info" style={{borderTop:'5px solid #e6b797',borderBottom:'1px solid #eee',textAlign:'center',width:'100%'}}>
                <tr> 
                
                    
                    <td className="return_name" style={{textAlign:'center',borderLeft: '1px solid #ccc',borderLeft: '1px solid #ccc',borderRight:'1px solid #ccc',borderBottom:'1px solid #ccc',background:'#eee'}}>
                       반품배송비를 구매자가 부담
                        
                    </td>
                    
                    <td style={{textAlign:'center',borderRight:'1px solid #ccc',borderBottom:'1px solid #ccc',background:'#eee'}}>
                        반품배송비를 판매자가 부담
                    </td>
                </tr>
                <tr>
                
                    <td className="return_address" style={{textAlign:'center',borderLeft: '1px solid #ccc',borderLeft: '1px solid #ccc',borderRight:'1px solid #ccc',borderBottom:'1px solid #ccc'}}>
                    <input type="radio" id="ex_rd1" name="ex_rds" className="return_radio"/> <label for="ex_rd1">구매의사 취소</label> 
          

                    </td>
                    <td style={{textAlign:'center',borderRight:'1px solid #ccc',borderBottom:'1px solid #ccc'}}>
                    <input type="radio" id="ex_rd2" name="ex_rds" className="return_radio"/> <label for="ex_rd2">상품 파손/훼손</label> 
                    <input type="radio" id="ex_rd3" name="ex_rds" className="return_radio"/> <label for="ex_rd3">다른 상품 잘못 배송</label>
                    </td>
                </tr>  
                </table>
                
                <input 
                        className="return_input"
                        type="text"
                        placeholder="반품과 관련하여 판매자에게 남기고 싶은 말이 있을 경우 기재해주세요. 100글자까지 입력 가능 합니다."
                        />
                </div>
                <div className="return2_table">
                
                <p className="return_title">회수지 정보 <button className="return_button" onClick={()=>{
         history.push(`/user/updateaddressreturn/${user_sequence_id}`)
       }}>수정</button></p>
                <table className="return__add" style={{borderTop:'5px solid #e6b797',borderBottom:'1px solid #eee'}}>
                <tr> 
                
                    
                    <td className="return_name" style={{background:'#eee',width:'150px',textAlign:'left',paddingLeft:'30px',borderLeft: '1px solid #ccc',borderLeft: '1px solid #ccc',borderRight:'1px solid #ccc',borderBottom:'1px solid #ccc'}}>
                       받는사람
                        
                    </td>
                    
                    <td style={{textAlign:'left',paddingLeft:'30px',borderRight:'1px solid #ccc',borderBottom:'1px solid #ccc'}}>
                        {customer.user_name}
                    </td>
                </tr>
                <tr>
                    <td className="return_phone" style={{background:'#eee',textAlign:'left',paddingLeft:'30px',border:'0px',borderLeft: '1px solid #ccc',borderLeft: '1px solid #ccc',borderRight:'1px solid #ccc',borderBottom:'1px solid #ccc'}}>
                        연락처
                    </td>
                    <td style={{textAlign:'left',paddingLeft:'30px',borderRight:'1px solid #ccc',borderBottom:'1px solid #ccc'}}>
                        {customer.user_phone}
                        
                        
                    </td>
                </tr>
                <tr>
                
                    <td className="return_address" style={{background:'#eee',textAlign:'left',paddingLeft:'30px',borderLeft: '1px solid #ccc',borderLeft: '1px solid #ccc',borderRight:'1px solid #ccc',borderBottom:'1px solid #ccc'}}>
                       받는주소
                    </td>
                    <td style={{textAlign:'left',paddingLeft:'30px',borderRight:'1px solid #ccc',borderBottom:'1px solid #ccc'}}>
                        {customer.user_address}
                    </td>
                </tr>  
                </table>
                
               
                </div>
            </div>
        </div>
    )
}

export default Return