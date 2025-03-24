
import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';

type TransitionProps = {
  children: React.ReactNode;
};

const Transition: React.FC<TransitionProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={300}
        classNames="page"
        unmountOnExit
      >
        <div className="page-container">
          {children}
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Transition;
