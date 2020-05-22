import { gql } from 'apollo-boost';

export const GET_BOOKS = gql`
{
    books{
        name
        id
    }
}
`;

export const GET_AUTHORS = gql`
{
  authors {
    name
    id
  }
}
`;

export const ADD_BOOK = gql`
    mutation($name:String!,$genre:String!,$authorId:ID!){
        addBook(name:$name, genre:$genre, authorId:$authorId){
            name
        }
    }
`;

export const GET_BOOK = gql`
  query($id:ID) {
    book(id: $id) {
      id,
      name,
      author {
        id,
        name,
        books {
          name,
          id
        }
      }
    }
  }
`;