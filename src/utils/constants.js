import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query AllPosts {
    allPosts(count: 500) {
      id
      title
      body
      published
      createdAt
      author {
        id
        firstName
        lastName
        avatar
      }
    }
  }
`;

export const months = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];
