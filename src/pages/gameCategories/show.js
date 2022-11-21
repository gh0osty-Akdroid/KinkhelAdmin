import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../components';
import { Loadings } from '../../components/Loading';
import { adminTokenUrl, GameImgUrl } from '../../Urls';

function GameCategoryShow() {
  const { id } = useParams()

  const [loading, setLoading] = useState(true)

  const [data, setData] = useState("")

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)

    adminTokenUrl().get(`/game-category/${id}`).then((res) => {
      setData(res?.data?.data);
      setLoading(false)
    })
      .catch((err) => {
        setError("Something went wrong, please refresh.")
      })
  }, []);


  return (
    <div className="rounded-lg shadow-lg p-10 w-full">
      {loading ? <Loadings /> : <>
        <Header category="Game Category" title={data.name} />
        <div className='bg-white dark:bg-gray-900 rounded p-10'>

          <img className="rounded-t-lg" src={`${GameImgUrl}/${data.image}`} />

          <div className="p-6">
            <h5 className="text-white text-xl font-medium mb-2">
              {data.uId}
            </h5>
            <p className="text-base mb-4 text-white">
              <strong>Enabled: </strong> {data.enabled ? 'Enabled' : 'Disabled'}
            </p>
          </div> </div></>}
    </div>
  );
}

export default GameCategoryShow;
