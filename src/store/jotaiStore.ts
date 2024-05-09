import { Application, EnvStore } from "@/common/types/custom";
import { atom } from "jotai";

const applicationsStore = atom<Application[] | []>([]);
const selectedApplicationStore = atom<Application | undefined>(undefined);
const environmentStore = atom<EnvStore[] | []>([]);

export { applicationsStore, selectedApplicationStore, environmentStore };
