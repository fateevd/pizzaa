import React from 'react';

const Categories = () => {
  const categories: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const [active, setActive] = React.useState(0);

  const changeCategories = (index: number) => {
    setActive(index);
  }

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) =>
          <li onClick={() => changeCategories(index)} className={active === index ? 'active' : ''}
              key={index}>{item}</li>
        )}
      </ul>
    </div>
  );
};

export default Categories;