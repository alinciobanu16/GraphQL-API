import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import * as moment from 'moment';
import { GET_POSTS } from './constants';

const useFetch = () => {
  const [posts, setPosts] = useState({
    postsPerMonth: {},
    loading: null,
    error: null,
  });

  const postsPerMonth = {
    jan: 0,
    feb: 0,
    mar: 0,
    apr: 0,
    may: 0,
    jun: 0,
    jul: 0,
    aug: 0,
    sep: 0,
    oct: 0,
    nov: 0,
    dec: 0,
  };

  const { data, loading, error } = useQuery(GET_POSTS);

  useEffect(() => {
    setPosts({ ...posts, loading: loading, error: error });
    if (data && data.allPosts) {
      data.allPosts.map(({ createdAt }) => {
        const date = new Date(Number(createdAt));
        const month = moment(date).format('MMM').toLowerCase();
        if (!month) {
          return;
        }
        postsPerMonth[month] = postsPerMonth[month] + 1;
      });
      setPosts({
        ...posts,
        postsPerMonth: postsPerMonth,
        error: error,
        loading: loading,
      });
    }
  }, [data, loading, error]);

  return posts;
};

export default useFetch;
