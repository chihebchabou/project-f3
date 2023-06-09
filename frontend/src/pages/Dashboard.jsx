import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import ContactForm from '../components/ContactForm';
import Contacts from '../components/Contacts';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    user && (
      <div className="container mt-5">
        <h5>
          Welcome <span className="text-primary">{user.name}</span>
        </h5>
        <div className="row">
          <div className="col-md-6">
            <ContactForm />
          </div>
          <div className="col-md-6">
            <Contacts />
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
