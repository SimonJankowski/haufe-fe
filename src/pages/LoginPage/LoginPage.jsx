import LoginForm from "../../components/LoginForm/LoginForm";
import Card from "../../components/common/Card/Card";

const LoginPage = () => {
  return (
    <main>
      <Card classes="minWidth-400">
        <h1>LOGIN</h1>
        <LoginForm />
      </Card>
    </main>
  );
};

export default LoginPage;
