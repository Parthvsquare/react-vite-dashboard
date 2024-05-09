import { EnvStore } from "@/common/types/custom";
import { environmentStore } from "@/store/jotaiStore";
import { Add, Delete, Edit, FileDownload } from "@mui/icons-material";
import {
  Box,
  Button,
  Drawer,
  FormControl,
  IconButton,
  List,
  ListItem,
  Paper,
  TextField,
} from "@mui/material";
import { useAtom } from "jotai";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

function EnvironmentVariables() {
  const [storedEnv, setStoredEnv] = useAtom(environmentStore);
  console.log("===> ~ EnvironmentVariables ~ storedEnv:", storedEnv);
  const [open, setOpen] = useState(false);
  function handleDeleteEnv({ id }: { id?: string }) {
    if (!id) return;
    setStoredEnv((prev) => prev.filter((env) => env.id !== id));
  }

  return (
    <Paper elevation={1}>
      <div className="p-5">
        <div className="flex w-full items-center justify-between">
          <h2 className="font-bold">Environment Variables</h2>
          <div className="flex items-center">
            <IconButton aria-label="add-env" onClick={() => setOpen(true)}>
              <Add />
            </IconButton>
            <IconButton aria-label="download-env">
              <FileDownload />
            </IconButton>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between border-2 border-red-800">
          {storedEnv.map((env, index) => (
            <div
              className="flex rounded-lg border border-gray-800 px-4 py-2"
              key={index}
            >
              <div className="flex flex-col">
                <span className="font-bold">{env.key}</span>
                <span>{env.value}</span>
              </div>
              <div className="flex items-center justify-between">
                <IconButton aria-label="edit-env" onClick={() => setOpen(true)}>
                  <Edit />
                </IconButton>
                <IconButton
                  aria-label="delete-env"
                  onClick={() => handleDeleteEnv({ id: env.id })}
                >
                  <Delete />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </div>
      {open && <EnvDrawer open={open} handleClose={setOpen} />}
    </Paper>
  );
}

export default EnvironmentVariables;

function EnvDrawer({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [storedEnv, setStoredEnv] = useAtom(environmentStore);

  const { control, register } = useForm<Record<"envStore", EnvStore[]>>({
    defaultValues: {
      envStore: storedEnv,
    },
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "envStore",
    },
  );
  function handleSaveEnv() {
    setStoredEnv(fields);
  }
  function handleAdd() {
    append({ key: "", value: "" });
  }

  return (
    <>
      <Drawer
        open={open}
        onClose={() => handleClose(false)}
        anchor="right"
        variant="temporary"
        ModalProps={{
          keepMounted: false,
        }}
      >
        <form>
          <List className="w-full">
            {fields.map((field, index) => (
              <ListItem key={index} className="space-x-5">
                <Controller
                  control={control}
                  key={field.id}
                  {...register(`envStore.${index}.key`)}
                  render={({ field }) => (
                    <TextField label="Key" size="small" {...field} />
                  )}
                />
                <Controller
                  control={control}
                  key={field.id}
                  {...register(`envStore.${index}.value`)}
                  render={({ field }) => (
                    <TextField label="Value" size="small" {...field} />
                  )}
                />
              </ListItem>
            ))}
          </List>

          <List className="w-full">
            <ListItem sx={{ display: "block" }}>
              <Box display="flex" justifyItems="end" width="100%">
                <Button className="capitalize" variant="outlined">
                  Cancel
                </Button>
                <Button
                  className="ml-4 capitalize"
                  variant="contained"
                  onClick={handleAdd}
                >
                  Add
                </Button>
                <Button
                  className="ml-4 capitalize"
                  variant="contained"
                  onClick={handleSaveEnv}
                >
                  Save
                </Button>
              </Box>
            </ListItem>
          </List>
        </form>
      </Drawer>
    </>
  );
}
