import React, { useEffect } from 'react';
import useSWR, { mutate } from 'swr';

import api from '~/services/api';

import Header from '~/components/Header';

export default () => {
  const { data: projects } = useSWR('/projects');

  const handleAddProjectOnClick = () => {
    mutate(
      '/projects',
      api
        .post('/projects', { title: 'Hello', owner: 'world' })
        .then((r) => r.data)
    );
  };

  if (!projects) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <ul>
        {projects.map(({ id }) => (
          <li key={id}>Project ID: {id}</li>
        ))}

        <button type="button" onClick={handleAddProjectOnClick}>
          Add Project
        </button>
      </ul>
    </>
  );
};
