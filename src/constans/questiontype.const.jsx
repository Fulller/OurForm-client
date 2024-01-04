import modifyComponent from "~/pages/Edit/modifies";
import normalComponent from "~/pages/Edit/normals";

import _ from "lodash";

const questionTypes = [
  {
    name: "multiple_choice",
    label: "Multiple choice",
    icon: (
      <span className="material-symbols-outlined">radio_button_checked</span>
    ),
    modify: modifyComponent.MultipleChoice,
    normal: normalComponent.MultipleChoice,
  },
  {
    name: "checkbox",
    label: "Checkbox",
    icon: <span className="material-symbols-outlined">check_box</span>,
    modify: modifyComponent.Checkbox,
    normal: normalComponent.Checkbox,
  },
  {
    name: "short_answer",
    label: "Short Answer",
    icon: <span className="material-symbols-outlined">draw</span>,
    modify: modifyComponent.ShortAnswer,
    normal: normalComponent.ShortAnswer,
  },
  {
    name: "paragraph",
    label: "Paragraph",
    icon: <span className="material-symbols-outlined">view_headline</span>,
    modify: modifyComponent.Paragraph,
    normal: normalComponent.Paragraph,
  },
  {
    name: "dropdown_menu",
    label: "Dropdown menu",
    icon: <span className="material-symbols-outlined">expand_more</span>,
    modify: modifyComponent.DropdownMenu,
    normal: normalComponent.DropdownMenu,
  },
];
const questionTypesObj = _.keyBy(questionTypes, "name");
export { questionTypes, questionTypesObj };
