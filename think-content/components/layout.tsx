import React from 'react'

export default function Layout(props: { children: any; }) {
  const { children } = props;
  return (
      <div className='relative flex flex-col min-h-screen text-white bg-gray-50 bg-re'> 
      <main className='flex flex-col flex-1 p-4'>
          {children}
      </main>
      </div>
  );
}