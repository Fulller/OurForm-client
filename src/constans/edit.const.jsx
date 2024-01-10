import CreateAndEdit from "~/pages/Edit/features/CreateAndEdit";
import Preview from "~/pages/Edit/features/Preview";
import Response from "~/pages/Edit/features/Response";
import Setting from "~/pages/Edit/features/Setting";

export const feature = [
  {
    title: "Question",
    name: "CREATE_AND_EDIT",
    icon: <span className="material-symbols-outlined">quiz</span>,
    component: CreateAndEdit,
  },
  {
    title: "Reponse",
    name: "REPONSE",
    icon: <span className="material-symbols-outlined">send</span>,
    component: Response,
  },
  {
    title: "Preview",
    name: "PREVIEW",
    icon: <span className="material-symbols-outlined">visibility</span>,
    component: Preview,
  },
  {
    title: "Setting",
    name: "SETTING",
    icon: <span className="material-symbols-outlined">settings</span>,
    component: Setting,
  },
];
