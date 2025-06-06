import { useAppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { authAction } from '../../redux/slices/authSlice';
import '../../styles/styles.scss';

const LogOutComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await dispatch(authAction.loadLogOut());
      navigate('/auth/login');
    } catch (e) {
      console.log(e)
    }
  }

  return(
    <div>
      <button type={'button'} onClick={logOut}>
        <div>
          <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNklEQVR4nO3aMU4DMRCF4R8KWiRofRHEwWi3gcBNOEEaxAEoAhR0tCzXcGTJkdAqGzyJgt4MfpJLS/NpdtdrywBnwAPwDWSRMQKLWltz7gUKnxt3FshYJ12hk+sfnWnORq+WbK2rQ46c3Dsiltw7IpabKB0pGQgCMaVDjphHYAmce+/Iqtb0YsEoQhLwWesqqAuvkL0wqpAp5vU3jDLEhFGHbMNc4hTShPECmWLephhPkJ0Yb5BZzCGQE+Bd4NhodSjktL547iFhHi2pz3B2BEm71hIvkBRhQUwt/1vqkNT6O68MSZY9iSokRdhYpShb3Y8ohw/PwFOE46C90iF/kCFCRwZrXaqQ3CFiyb0jYsn/tiNjnVAusqhdqvmyTFoIHOfMjVsLpFzuKphNZxRG6URBNF88WwOccZGxk5w4qAAAAABJRU5ErkJggg=="
          alt="logOut" />
        </div>
      </button>
    </div>
  )
};

export default LogOutComponent;