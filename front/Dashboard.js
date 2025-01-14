
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user ? user.token : null;
        if (!token) {
          navigate('/login');
          return;
        }
        const { data } = await axios.get('http://localhost:5001/api/documents', {
          headers: {
            'x-auth-token': token,
          },
        });
        setDocuments(data);
      } catch (error) {
        console.error('Failed to fetch documents:', error.response ? error.response.data : error.message);
        navigate('/login');
      }
    };

    fetchDocuments();
  }, [navigate]);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Dashboard</h1>
        <Link to="/document/new" className="btn btn-primary">Create Document</Link>
      </div>
      <div className="row">
        {documents.map((document) => (
          <div key={document._id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{document.title}</h5>
                <p className="card-text">{document.content}</p>
                <Link to={`/document/${document._id}`} className="btn btn-primary mt-auto">Edit</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;