import React from 'react';
import {Categories, PizzaBlock, Skeleton, Sort} from "../component";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import qs from "qs";


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
  const storeFilter = useSelector((state: RootState) => state.filter);
  const {categoryId, searchValue, sort} = storeFilter;
  const navigate = useNavigate();

  React.useEffect(() => {
    setIsLoading(true);
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue.length > 0 ? `search=${searchValue}` : '';
    axios.get(`https://634c67c0acb391d34a853ce2.mockapi.io/item?${category}&sortBy=${sortBy}&order=${order}&${search}`).then(({data}) => {
      setData(data);
      setIsLoading(false);
    });
  }, [categoryId, sort.sortProperty, searchValue]);

  React.useEffect(() => {
    let saveQuery: Record<string, string | number | Sort> = {};
    let key: keyof typeof storeFilter;
    for (key in storeFilter) {
      if (storeFilter[key] && storeFilter[key] !== 0) {
        saveQuery[key] = storeFilter[key];
      }
    }
    const qeury = qs.stringify({
      ...saveQuery
    }, {addQueryPrefix: true})
    navigate(qeury);
  }, [categoryId, sort.sortProperty, searchValue]);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories/>
          <Sort/>
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {!isLoading ? data.map((item: PizzasBlock) =>
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