import React from 'react';
import {Categories, PizzaBlock, Skeleton, Sort} from "../component";

export type PizzasBlock = {
  id: number,
  title: string,
  price: number,
  types: number[],
  imageUrl: string,
  sizes: number[],
  category: number,
  rating: number,
};

const Home = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);

  React.useEffect(() => {
    fetch('https://634c67c0acb391d34a853ce2.mockapi.io/item').then(r => r.json()).then(res => {
      setData(res);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories/>
          <Sort/>
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {data.length > 0 && !isLoading ? data.map((item: PizzasBlock) =>
              <PizzaBlock key={item.id} {...item}/>
            ) :
            skeleton
          }
        </div>
      </div>
    </>
  );
};

export default Home;