import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon: Icon,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-300 active:scale-95';
  
  const variants = {
    primary: 'bg-primary hover:bg-primary-hover text-white shadow-soft-pink hover:shadow-lg',
    secondary: 'bg-pastel-pink text-primary hover:bg-pink-100',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-gray-600 hover:text-primary hover:bg-pastel-pink',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-xs rounded-full',
    md: 'px-6 py-2 text-sm rounded-full font-semibold tracking-wide',
    lg: 'px-8 py-3 text-base rounded-full font-semibold tracking-wide',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {Icon && <Icon className="ml-2 w-4 h-4" />}
    </button>
  );
};

export default Button;
