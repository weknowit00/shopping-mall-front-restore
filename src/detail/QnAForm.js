import React, {useState} from 'react';
import axios from '../axios/axios';
import {useStateValue} from '../StateProvider/StateProvider'
import {useHistory, useParams} from "react-router-dom";
import './QnAForm.css';

function QnAForm(){
    const [{user}, dispatch] = useStateValue(); 

    const {id} = useParams();

    const history = useHistory();

    const [form, setForm] = useState({
        product_id: id,
        user_sequence_id:8,
        question: '',
        question_date_created: '',
        answer_id : '',
        answer: '',
        answer_date_created: ''
    })


    const handleChange = e => {
        e.preventDefault();

            setForm({
                ...form,
                [e.target.name]: e.target.value 
            })
       
    }
    
    console.log(form);

    const showForm = (e) => {
        e.preventDefault()
        
        axios.post('question', form)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    return (
        <div className="QnAForm">
           
           <form className="QnA_form" onSubmit={
               form.question != '' ? showForm : null
               }> 
                <label htmlFor="input">질문 작성</label>
           <input 
           id="input"
           type="text" 
           name="question"
           value={form.question}
           onChange={handleChange}
           />
       <div className="button">
       <button type="submit" onClick={()=>{
                
                form.question == '' ? alert("내용을 입력해주세요!") : alert("내용이 입력됐습니다.");
                window.opener.parent.location.reload();
                window.self.close();
                
            }}>Submit</button>
            </div>
       </form>
    </div>
);
    
}

export default QnAForm;