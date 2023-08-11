import { useNavigate } from 'react-router-dom';
import PersonalInformationForm from '../../../components/PersonalInformationForm';
import UserContext from '../../../contexts/UserContext';
import useSignInWithGithub from '../../../hooks/api/useSignInGithub';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function FillSubscription() {
  const { signInGit } = useSignInWithGithub(); 
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
          
    if (code) {
      async function exchangeCodeForUserData() {
        try {
          const userData = await signInGit(code);
          setUserData(userData);
          toast('Login com github realizado com sucesso!');
        } catch (error) {
          toast('Não foi possível fazer o login com github!');
          navigate('/sign-in');
        }
      }
      exchangeCodeForUserData();
    }
  }, [navigate]);
  return (
    <PersonalInformationForm />
  );
}
