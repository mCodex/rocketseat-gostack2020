import React from 'react';
import useSWR from 'swr';

import Header from '~/components/Header';

export default () => {
  const { data: projects } = useSWR('/projects');

  if (!projects) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <ul>
        {projects.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </>
  );
};
