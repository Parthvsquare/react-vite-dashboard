import { Application, EnvStore } from "@/common/types/custom";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const applicationsStore = atom<Application[] | []>([]);
const selectedApplicationStore = atom<Application | undefined>(undefined);
const environmentStore = atomWithStorage<EnvStore[] | []>("myEnv", []);

// const environmentStore = atom<EnvStore[] | []>([]);

export { applicationsStore, selectedApplicationStore, environmentStore };
