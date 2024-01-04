import "./Home.scss";
import FormService from "~/services/form.service";
import { useNavigate } from "react-router-dom";

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
      <button className="button create-btn" onClick={handleCreateForm}>
        Create new form
      </button>
    </div>
  );
}
export default Home;
