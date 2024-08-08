"use client";

import { useCallback, useEffect, useState } from "react";

import Editor from "@/modules/ui/Editor";
import Input from "@/modules/ui/Input";
import Button from "@/modules/ui/Button";
import {
  useBlocks,
  saveBlock,
  deleteBlock,
  createBlock,
} from "@/modules/blocks/hooks";
import Modal from "@/modules/ui/Modal";

export default function Blocks({}) {
  const [selectedBlock, setSelectedBlock] = useState(0);
  const [block, setBlock] = useState();
  const { blocks, refetchBlocks } = useBlocks();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isDelModal, setIsDelModal] = useState(false);

  useEffect(() => {
    if (blocks?.length && selectedBlock < blocks.length) {
      setBlock(blocks[selectedBlock]);
    }
  }, [blocks, selectedBlock]);

  const saveChanges = useCallback(
    () =>
      saveBlock(block.id, block).then((res) => {
        if (res.ok) {
          refetchBlocks();
          setModalTitle("Hotovo");
          setModalMessage("Změny byly uloženy");
          setModalOpen(true);
          window.scrollTo(0, 0);
        } else {
          setModalTitle("Chyba!");
          setModalMessage(
            "Při ukládání nastala chyba. Prosím to zkuste znovu."
          );
          setModalOpen(true);
        }
      }),
    [block]
  );

  const confirmDelBlock = useCallback(() => {
    setIsDelModal(true);
    setModalTitle("Potvrdit smazání");
    setModalMessage("Opravdu chcete smazat tento blok?");
    setModalOpen(true);
  }, []);

  const delBlock = useCallback(() => {
    setIsDelModal(false);
    deleteBlock(block.id).then((res) => {
      if (res.ok) {
        refetchBlocks();
        setSelectedBlock(0);
        setModalTitle("Hotovo");
        setModalMessage("Blok byl smazán");
        setModalOpen(true);
        window.scrollTo(0, 0);
      } else {
        setModalTitle("Chyba!");
        setModalMessage("Při smazání nastala chyba. Prosím to zkuste znovu.");
        setModalOpen(true);
      }
    });
  }, [block]);

  const newBlock = useCallback(
    () =>
      createBlock().then(async (res) => {
        if (res.ok) {
          setSelectedBlock(blocks.length);
          refetchBlocks();
        } else {
          const errorMessage = (await res.json()).error;
          setModalTitle("Chyba!");
          setModalMessage(errorMessage);
          setModalOpen(true);
        }
      }),
    [blocks]
  );

  return (
    <>
      <Modal
        title={modalTitle}
        message={modalMessage}
        open={modalOpen}
        setOpen={setModalOpen}
        button={isDelModal ? "Smazat" : undefined}
        onButtonPress={isDelModal ? delBlock : undefined}
        hasCancelButton={isDelModal}
        onCancel={useCallback(() => setIsDelModal(false), [])}
      />
      <div className="md:flex flex-col md:flex-row w-full space-y-6 md:space-y-0 space-x-0 md:space-x-6">
        <div className="flex flex-col w-full md:w-64 text-gray-700 bg-white flex-shrink-0 border rounded-md">
          <nav className="flex-grow md:block p-4">
            {blocks
              .sort((a, b) => a.position - b.position)
              .map((block, index) => (
                <a
                  key={`block-${index}`}
                  onClick={() => setSelectedBlock(index)}
                  className={`block px-4 py-2 mt-2 text-sm font-semibold ${
                    selectedBlock === index ? "bg-gray-100" : ""
                  } rounded-md hover:bg-gray-100`}
                  href="#"
                >
                  {block.name}
                </a>
              ))}
            <Button
              label="+ Přidat blok"
              type="border"
              onClick={newBlock}
              isFullWidth
              classes="mt-4"
            />
          </nav>
        </div>

        <div className="flex flex-col flex-1 bg-white flex-shrink-0 border rounded-md p-8">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Nastavení bloku
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Název metody
                  </label>
                  <div className="mt-2">
                    <Input
                      value={block?.name}
                      onChange={(e) =>
                        setBlock({ ...block, name: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Grafika
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Obsah bloku
                  </label>
                  <div className="mt-2">
                    <Editor
                      value={block?.content || ""}
                      onEditorChange={(content) =>
                        setBlock({ ...block, content })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Nastavení e-mailové zprávy
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                V šabloně zprávy můžete použít následující kódy:{" "}
                <b>{"{{user_id}}"}</b>, <b>{"{{block_link}}"}</b>
              </p>

              <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <div className="mt-2">
                    <Editor
                      value={block?.email_content || ""}
                      onEditorChange={(email_content) =>
                        setBlock({ ...block, email_content })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Button
              label="Smazat blok"
              type="border"
              onClick={confirmDelBlock}
            />
            <div className="flex items-center space-x-4">
              <Button label="Zobrazit blok" type="border" icon="link" />
              <Button
                label="Uložit změny"
                type="primary"
                onClick={saveChanges}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
