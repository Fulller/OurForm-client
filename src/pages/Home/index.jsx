import "./Home.scss";
import FormService from "~/services/form.service";
import { useNavigate } from "react-router-dom";
import Forms from "./components/Forms";

function Home() {
  const navigate = useNavigate();
  async function handleCreateForm() {
    const form = await FormService.create();
    if (form) {
      navigate("/edit/" + form._id);
    }
  }
  return (
    <div id="home-page">
      <div className="creates">
        <button className="button create-btn" onClick={handleCreateForm}>
          Create new form
        </button>
      </div>
      <Forms></Forms>
    </div>
  );
}
export default Home;
