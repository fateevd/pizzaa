import React from 'react';
import {ReactComponent as Icon} from "../../assets/img/search.svg";
import {ReactComponent as Clear} from "../../assets/img/x.svg";
import styles from "./Search.module.scss";

type PropsSearch = {
  change: any,
  value: string
};

const debounce = <T extends Function>(fn: T, ms: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), ms);
  };
}

const Search: React.FC<PropsSearch> = ({change, value}) => {

  const [input, setInput] = React.useState(value);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const clearClick = () => {
    change("");
    inputRef?.current?.focus();
  }

  const saveStoreSearch = React.useCallback(debounce((event: string) => {
    change(event);
  }, 280), [])

  const onInput = (event: string) => {
    setInput(event);
    saveStoreSearch(event)
  }


  return <div className={styles.root}>
    <Icon className={styles.root__search} width={20}/>
    <input ref={inputRef} value={input} onChange={(event) => onInput(event.target.value)} className={styles.root__input}
           placeholder="Поиск пиццы..."/>
    {input.length > 0 ?
      <Clear onClick={clearClick} className={styles.clear}/> : null}
  </div>
};

export default Search;