import React from "react";

import ViewStatus from "./ViewStatus/ViewStatus";
import EditStatus from "./EditStatus/EditStatus";

enum StatusMode {
  view,
  edit,
}

export default function Status(): JSX.Element {
  const [mode, setMode] = React.useState(StatusMode.view);

  switch (mode) {
    case StatusMode.view:
      return <ViewStatus onEdit={() => setMode(StatusMode.edit)} />;
    case StatusMode.edit:
      return <EditStatus onClose={() => setMode(StatusMode.view)} />;
    default:
      throw new Error();
  }
}
