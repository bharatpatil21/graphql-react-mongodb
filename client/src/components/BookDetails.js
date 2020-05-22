import React from 'react';
import { useQuery } from '@apollo/react-hooks';


import { GET_BOOK } from "../queries/queries";

function BookDetails() {
const { loading, error, data } = useQuery(GET_BOOK);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
       Book details component
    </div>
  );
}

export default BookDetails;