import StoreService from "~/services/store.service";
import { useDispatch, useSelector } from "react-redux";
import storeFormSlide from "~/redux/slides/store_form.slide";
import storeFormSelector from "~/redux/selectors/store_form.selector";
import { useEffect, useState } from "react";
import List from "./List";
import Tags from "./Tags";

import { listForm } from "~/constans/home.const";
import ".scss";

function Forms() {
  const dispatch = useDispatch();
  const store = useSelector(storeFormSelector.get);
  const [curListForm, setCurListForm] = useState(listForm[0].name);

  useEffect(() => {
    (async function () {
      dispatch(storeFormSlide.actions.set({ store: await StoreService.get() }));
    })();
  }, [dispatch]);
  if (!store) {
    return <></>;
  }
  return (
    <div id="forms">
      <List cur={curListForm} set={setCurListForm}></List>
      <Tags forms={store[curListForm]} key={curListForm}></Tags>
    </div>
  );
}

export default Forms;
