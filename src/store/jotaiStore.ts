import { atom } from "jotai";

const applicationsStore = atom(["tic-tac-toe"]);
const selectedApplicationStore = atom("tic-tac-toe");

export { applicationsStore, selectedApplicationStore };
