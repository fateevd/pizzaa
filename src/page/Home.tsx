import React from 'react';
import {Categories, PizzaBlock, Skeleton, Sort} from "../component";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {useNavigate} from "react-router-dom";
import qs from "qs";
import {fetchPizzas} from "../redux/slices/pizzaSlice";
import {selectFilter} from "../redux/slices/filterSlice/selector";
import { selectPizza } from '../redux/slices/pizzaSlice/selector';


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
  const storeFilter = useSelector(selectFilter);
  const {items, status} = useSelector(selectPizza);
  const {categoryId, searchValue, sort} = storeFilter;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);
  const pizza = items.map((item: PizzasBlock) => <PizzaBlock key={item.id} {...item}/>);


  React.useEffect(() => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue.length > 0 ? `search=${searchValue}` : '';

    dispatch(fetchPizzas({
      category,
      sortBy,
      order,
      search
    }));

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

        {status === 'error' ? <div className="content__error">
            <h2 className="content__error-info">Произошла ошибка</h2>
            <p>К сожелению, попробуйте повторить попытку позже Не удалось получить пиццы 😕</p>
          </div>
          :
          <div className="content__items">
            {
              status === 'success' ? pizza : skeleton
            }
          </div>
        }
      </div>
    </>
  );
};

export default Home;