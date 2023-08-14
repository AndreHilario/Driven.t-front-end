import useAsync from '../useAsync';

import * as authApi from '../../services/authApi';

export default function useSignInWithGithub() {
  const {
    loading: signInLoading,
    error: signInError,
    act: signInGit
  } = useAsync(authApi.signInWithGithub, false);

  return {
    signInLoading,
    signInError,
    signInGit
  };
}
