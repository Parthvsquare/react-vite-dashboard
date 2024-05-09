import { Application } from "@/common/types/custom";
import { atom } from "jotai";

const applicationsStore = atom<Application[] | []>([]);
const selectedApplicationStore = atom<Application | undefined>(undefined);

export { applicationsStore, selectedApplicationStore };
