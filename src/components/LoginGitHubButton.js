import { FaGithub } from 'react-icons/fa';
import styled from 'styled-components';

export default function GitHubButton() {
  const handleOAuthLogin = () => {
    const GITHUB_URL = 'https://github.com/login/oauth/authorize';
    const params = new URLSearchParams ({
      response_type: 'code',
      scope: 'user',
      client_id: process.env.REACT_APP_CLIENT_ID,
      redirect_uri: process.env.REACT_APP_REDIRECT_URL,
      state: 'Driven-t'
    }); 
    const authUrl = `${GITHUB_URL}?${params.toString()}`;
    window.location.href = authUrl; 
  };

  return (
    <StyledButton onClick={handleOAuthLogin}>
      <Icon />
        Acessar com o GitHub
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #fff;
  cursor: pointer;
`;

const Icon = styled(FaGithub)`
  margin-right: 8px;
`;
