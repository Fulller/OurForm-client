import { listForm } from "~/constans/home.const";

function List({ cur, set }) {
  return (
    <nav className="nav-list-form">
      {listForm.map((a) => {
        const actived = cur == a.name;
        return (
          <div
            className={`nav-list-form-item ${actived ? "actived" : ""}`}
            key={a.label}
            onClick={() => set(a.name)}
          >
            {a.icon}
            <span className="label">{a.label}</span>
          </div>
        );
      })}
    </nav>
  );
}
export default List;
