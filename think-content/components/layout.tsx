import React from 'react'

export default function Layout(props: { children: any; }) {
  const { children } = props;
  return (
      <div className='flex flex-col min-h-screen relative bg-violet-700 text-white bg-re'> 
      <main className='flex-1 flex flex-col p-4'>
          {children}
      </main>
      </div>
  );
}