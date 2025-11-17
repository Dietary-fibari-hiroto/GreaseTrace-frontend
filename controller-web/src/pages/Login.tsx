import Header from "../components/Header";
import Button from "../components/Button";
import Form from "../components/Form";
export default function Login(){
    return(
        <div className="h-screen flex flex-col">
            <Header />
            <div className="flex-grow flex justify-around items-center">
                <div className="w-[500px]">
                    <div className="text-center pb-9 relative">
                        <p className="text-md absolute top-[-10px] left-1/2 -translate-x-1/2">新規登録</p>
                        <p className="text-section-label">Register</p>
                    </div>
                    <form action="" method="POST">
                        <Form label="メールアドレス" type="mail" id="email" name="email" />
                        <Form label="パスワード" type="password" id="password" name="password" className="pb-0" />
                            <p  className="text-xs text-right underline pb-12"><a href="">パスワードをお忘れですか？</a></p>
                        <Button value="ログイン"/>
                        
                    </form>
                    <div className="bg-[var(--color-bg-gray)] pt-[26px] pb-9 px-[30px]">
                        <p className="text-md-bold">新規登録</p>
                        <p className="text-xs pb-[37px]">アカウント登録でGreaseTraceを使ってみましょう！</p>
                        <a href="/register" className="bg-[var(--color-secondary)] text-white w-full block text-center py-2">新規会員登録</a>
                    </div>
                </div>
            </div>
        </div>
    );
}