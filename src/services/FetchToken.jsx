import React from 'react';
import { useAsyncResource, AsyncResourceContent } from 'use-async-resource';
import Loading from '@/components/common/Loading';
import { set } from '@/utils/localStorage';
import GolferApi from '@/services/golfer-api';

export default function FetchToken(props) {
  const GHIN_PASSWORD = import.meta.env.VITE_GHIN_PASSWORD;
  const fetchData = () => GolferApi.login(GHIN_PASSWORD, '585871');
  // 👉 initialize the data reader and start fetching the user immediately
  const [dataReader] = useAsyncResource(fetchData, []);

  function TokenData({ dataReader, next }) {
    dataReader((data) => set('token', data.data.golfer_user.golfer_user_token)); // 😎 just call the data reader function to get the user object
    return next;
  }

  return (
    <>
      <AsyncResourceContent
        fallback={<Loading />}
        errorMessage='Error fetching Token'>
        <TokenData dataReader={dataReader} next={props.next} />
      </AsyncResourceContent>
    </>
  );
}
