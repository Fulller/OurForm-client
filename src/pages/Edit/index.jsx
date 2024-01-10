import ".scss";
import { useSelector } from "react-redux";
import behaviorSelector from "~/redux/selectors/behavior.selector";
import { feature } from "~/constans/edit.const";
import _ from "lodash";

function Edit() {
  const currentFeature = useSelector(behaviorSelector.edit("feature"));
  const Feature = _.find(
    feature,
    ({ name }) => name == currentFeature
  ).component;
  return <Feature></Feature>;
}
export default Edit;
