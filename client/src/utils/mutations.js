import { gql } from '@apollo/client';
//
//login user func AND export
//
export const LOGIN_USER = gql`
    mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
        token
    }
    }
`;
//
//add user func AND export
//
export const ADD_USER = gql`
    mutation addUser($email: String, $username: String, $password: String) {
    addUser(email: $email, username: $username, password: $password) {
        token
        user {
        _id
        bookCount
        }
    }
    } 
    //add 'remove user'
`;
//
//save book func AND export
//
export const SAVE_BOOK = gql`
    mutation saveBook($bookInfo: BookInput) {
    saveBook(bookInfo: $bookInfo) {
        _id
        bookCount
        email
        username
    }
    }
`;
//
//remove book func AND export
//
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID) {
    removeBook(bookId: $bookId) {
        _id
        bookCount
        email
        username
    }
    }
`;
