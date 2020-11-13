import * as postActions from "./post-actions";
import * as todoActions from "./todo-actions";

const actions = { ...postActions, ...todoActions };

export default actions;
