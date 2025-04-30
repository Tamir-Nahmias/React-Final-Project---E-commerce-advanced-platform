import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const RedirectionPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    transition()
      .then(() => {
        console.log('Success');
      })
      .catch((e) => console.log(e));
  }, []);

  const transition = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        navigate('/Home');
        resolve(); // Resolving after navigation
      }, 4000);
    });
  };

  return (
    <div className="redirect-page">
      <h1>Registration succeeded!</h1>
      <h2>Redirecting...</h2>

      <svg className="w-32 h-8 place-self-center" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="12">
          <animate
            attributeName="r"
            values="12;6;12"
            begin="0s"
            dur="0.8s"
            calcMode="spline"
            keySplines="0.25 0.1 0.25 1"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            values="1;0.3;1"
            begin="0s"
            dur="0.8s"
            calcMode="spline"
            keySplines="0.25 0.1 0.25 1"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill"
            values="#a78bfa;#d8b4fe;#a78bfa"
            begin="0s"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="60" cy="15" r="12">
          <animate
            attributeName="r"
            values="12;6;12"
            begin="0.2s"
            dur="0.8s"
            calcMode="spline"
            keySplines="0.25 0.1 0.25 1"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            values="1;0.3;1"
            begin="0.2s"
            dur="0.8s"
            calcMode="spline"
            keySplines="0.25 0.1 0.25 1"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill"
            values="#a78bfa;#d8b4fe;#a78bfa"
            begin="0.2s"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="105" cy="15" r="12">
          <animate
            attributeName="r"
            values="12;6;12"
            begin="0.4s"
            dur="0.8s"
            calcMode="spline"
            keySplines="0.25 0.1 0.25 1"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            values="1;0.3;1"
            begin="0.4s"
            dur="0.8s"
            calcMode="spline"
            keySplines="0.25 0.1 0.25 1"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill"
            values="#a78bfa;#d8b4fe;#a78bfa"
            begin="0.4s"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
};

export default RedirectionPage;
