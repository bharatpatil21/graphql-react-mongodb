import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from "../queries/queries";


function validate(name, genre, authorId){
    return (name && genre && authorId)
}

function AddBook() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const { loading, error, data } = useQuery(GET_AUTHORS);

  const [addBook] = useMutation(ADD_BOOK);

  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <h2>Add Book</h2>
      <form 
        id="add-book" 
        onSubmit={(e) => {
            e.preventDefault();
            let valid = validate(name, genre, authorId);
            if(valid) addBook({variables: {name, genre, authorId}, 
                refetchQueries:[{query: GET_BOOKS}]});
        }}>
        <div>
          <input
            type="text"
            placeholder="Book Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <div>
          {loading ? (
            "Loading....."
          ) : (
            <select onChange={(e) => setAuthorId(e.target.value)}>
              <option value="">Select Author</option>
              {data.authors.map((author) => {
                return (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                );
              })}
            </select>
          )}
        </div>
        <div>
          <input type="submit" value="Add" />
        </div>
      </form>
    </div>
  );
}

export default AddBook;