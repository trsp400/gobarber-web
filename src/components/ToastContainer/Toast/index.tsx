import React, { CSSProperties, useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';

import { useToast } from '../../../hooks/toast';
import { Container } from './styles';

import ToastMessageInterface from '../../../interfaces/ToastMessages';

interface ToastProps {
  message: ToastMessageInterface;
  style: CSSProperties;
}

interface IconProp {
  type?: 'success' | 'info' | 'error';
}

const Icon: React.FC<IconProp> = ({ type }) => {
  const icons = {
    info: <FiInfo size={20} />,
    success: <FiCheckCircle size={20} />,
    error: <FiAlertCircle size={20} />,
  };

  return icons[type || 'info'];
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <Container
      type={message.type}
      hasDescription={!!message.description}
      style={style}
    >
      <Icon type={message.type} />

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
