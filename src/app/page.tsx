'use client';

import { useState } from 'react';

export default function MyNextFastAPIApp() {
  const getRole = async () => {
    let baseUrl = 'https://my-next-fastapi-app.vercel.app';
    if (process.env.NODE_ENV === 'development') {
      baseUrl = 'http://localhost:3000';
    }
    const title = 'Frontend Developer';
    try {
      const response = await fetch(
        `${baseUrl}/api/py/engineer-roles?title=${title}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const someRole = await response.json();
      setRole(someRole);
    } catch (error) {
      console.error('Error fetching engineer role:', error);
      return null;
    }
  };
  interface IRole {
    title: string;
    mainskill: string;
  }

  const [role, setRole] = useState<IRole>();
  return (
    <>
      <button
        className="border rounded-sm p-4 cursor-pointer bg-amber-200 "
        onClick={getRole}
      >
        Get role
      </button>
      {role && (
        <div>{`The main skill of a ${role.title} is ${role.mainskill}.`}</div>
      )}
    </>
  );
}
