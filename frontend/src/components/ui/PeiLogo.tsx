import React from 'react';

const PeiLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 164 164"
      className={className}
      fill="none"
    >
      <path
        d="M13.5 36h38.5V98h31.5V36H150v128H83.5v-36h-31.5v36H13.5V36z"
        fill="#113E74"
      />
      <path
        d="M83.5 36h31.5v62H83.5zM83.5 126h31.5v38H83.5z"
        fill="#009A49"
      />
      <path d="M52 77.5h31.5" stroke="#113E74" strokeWidth="5" />
      <path d="M52 88.5h31.5" stroke="#113E74" strokeWidth="5" />
      <path
        d="M83.5 90c16 0 16-14 31.5-14s15.5 14 31.5 14"
        stroke="#113E74"
        strokeWidth="12"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default PeiLogo;