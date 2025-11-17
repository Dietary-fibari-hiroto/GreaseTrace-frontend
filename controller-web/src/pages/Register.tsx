//import { useState } from "react";
import Button from "../components/Button";
import Form from "../components/Form";
import Header from "../components/Header";

export default function Legister(){
    // const [formData,setFormData] = useState({lastname:"",firstname:"",email:"",password:""});
    // const [error,setError] = useState({lastname:"",firstname:"",email:"",password:""});

    // const validate = () =>{
    //     true;
    //     if(!formData.lastname){
    //         error.lastname = "姓が入力されていません";
    //         return false;
    //     }
    //     if(!formData.firstname){
    //         error.firstname = "名が入力されていません"
    //          return false;
    //     }

        
    // }



    return(
        <div className="h-screen flex flex-col">
            <Header />
            <div className="flex-grow flex justify-around items-center">
                <div className="w-[500px] ">
                    <div className="text-center pb-9 relative">
                        <p className="text-md absolute top-[-10px] left-1/2 -translate-x-1/2">新規登録</p>
                        <p className="text-section-label">Register</p>
                    </div>
                    <form action="" method="POST">
                        <Form label="姓" type="text" id="lastname" name="lastname" /> 
                        <Form label="名" type="text" id="firstname" name="firstname" /> 
                        <Form label="メールアドレス" type="mail" id="email" name="email" />
                        <Form label="パスワード" type="password" id="password" name="password" className="pb-0" />
                        <div className="pb-[60px]">
                            <input type="checkbox" />
                            <label className="pl-[10px]"><span className="text-[var(--color-primary)]">利用規約</span>に同意する</label>
                        </div>
                        <Button value="アカウント作成" />
                    </form>
                    <p className="underline text-center"><a href="/login">ログイン</a></p>
                    
                </div>
            </div>
        </div>
    )
}