import React from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {PizzasBlock} from "./Home";
import {typeName} from '../component/PizzaBlock';
import axios from "axios";

type LookPizza = Partial<PizzasBlock>;
const Pizza: React.FC = () => {

  const activeType = 0;
  const activeSize = 0;
  const {id} = useParams();
  const [d, setD] = React.useState<LookPizza>({});
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchItem() {
      try {
        const {data} = await axios.get(`https://634c67c0acb391d34a853ce2.mockapi.io/item/${id}`);
        setD(data);
      } catch (e) {
        navigate('/');
        alert("Ошибка загрузки данных");
      }
    }

    fetchItem();
  }, []);


  if (Object.keys(d).length === 0) {
    return <div className="look_pizza">...Загрузка</div>
  }


  return (
    <>
      <Link to="/" className="link">
        <span>Назад</span>
      </Link>
      <div className="look_pizza">
        <Link to={"/"}>

        </Link>
        <img
          className="pizza-block__image"
          src={d?.imageUrl}
          alt="Pizza"
        />
        <h4 className="pizza-block__title">{d?.title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {d.types && d?.types.map(typeId =>
              <React.Fragment key={typeId}>
                <li
                  className={typeId === activeType ? "active" : ""}>{typeName[typeId]}
                </li>
              </React.Fragment>
            )}
          </ul>
          <ul>
            {d.sizes && d?.sizes.map((size, index) =>
              <React.Fragment key={size}>
                <li
                  className={activeSize === index ? "active" : ""}>{size} см.
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
        <div className="">
          <div className="pizza-block__price">от {d.price} ₽</div>
        </div>
      </div>
    </>

  );
};

export default Pizza;