import RegisterForm from "../../components/RegisterForm/RegisterForm";
import Card from "../../components/common/Card/Card";

const RegisterPage = () => {
  return (
    <main>
      <Card classes="minWidth-400">
        <h1>REGISTER</h1>
        <RegisterForm />
      </Card>
    </main>
  );
};

export default RegisterPage;
