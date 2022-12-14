import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {setCategoryId} from "../redux/slices/filterSlice";
import {selectFilterCategori} from "../redux/slices/filterSlice/selector";

const Categories = () => {
  const categories: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const categoriesValue = useSelector(selectFilterCategori);
  const dispatch = useDispatch();


  const changeCategories = (index: number) => {
    dispatch(setCategoryId(index))
  }

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) =>
          <li onClick={() => changeCategories(index)} className={categoriesValue === index ? 'active' : ''}
              key={index}>{item}</li>
        )}
      </ul>
    </div>
  );
};

export default Categories;