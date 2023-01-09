import React, {FC} from 'react';
import {PizzasBlock} from "../page/Home";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addPizzaToCart} from "../redux/slices/cartSlice";
import {selectCurrentItemById} from "../redux/slices/cartSlice/selector";


type PizzaBlockProps = PizzasBlock;
export const typeName = ['Тонкое', 'Традиционное'];
const PizzaBlock: FC<PizzaBlockProps> = ({id, title, price, types, imageUrl, sizes, category, rating}) => {

  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentItem = useSelector(selectCurrentItemById(id));
  const countItem = currentItem ? currentItem.count : 0;


  const changeDough = (event: React.MouseEvent<HTMLElement>, typeId: number) => {
    event.stopPropagation();
    setActiveType(typeId);
  }

  const changeSize = (event: React.MouseEvent<HTMLElement>, size: number) => {
    event.stopPropagation();
    setActiveSize(size);
  }

  const addToCart = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    dispatch(addPizzaToCart({
      id,
      title,
      price,
      type: typeName[activeType],
      imageUrl,
      size: sizes[activeSize],
    }));
  }

  return (
    <div className="pizza-block__parent">
      <div className="pizza-block" onClick={() => navigate(`pizza/${id}`)}>
        <img
          className="pizza-block__image"
          src={imageUrl}
          alt="Pizza"
        />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map(typeId =>
              <React.Fragment key={typeId}>
                <li onClick={(event) => changeDough(event, typeId)}
                    className={activeType === typeId ? "active" : ""}>{typeName[typeId]}
                </li>
              </React.Fragment>
            )}
          </ul>
          <ul>
            {sizes.map((size, index) =>
              <React.Fragment key={size}>
                <li onClick={(event) => changeSize(event, index)}
                    className={activeSize === index ? "active" : ""}>{size} см.
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button className="button button--outline button--add" onClick={(event) => addToCart(event)}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {countItem > 0 && <i>{countItem}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;