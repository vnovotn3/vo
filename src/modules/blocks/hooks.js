"use client";

import { useCallback, useEffect, useState } from "react";

const getBlocks = () =>
  fetch("/api/blocks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const saveBlock = (id, data) =>
  fetch(`/api/blocks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

export const deleteBlock = (id) =>
  fetch(`/api/blocks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const createBlock = async () => {
  const lastPosition = await getBlocks().then(async (res) => {
    if (res.ok) {
      const json = await res.json();
      return json.blocks.reduce(
        (max, b) => (b.position > max ? b.position : max),
        0
      );
    }
    return 0;
  });
  return fetch("/api/blocks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ position: lastPosition + 1 }),
  });
};

export const useBlocks = () => {
  const [blocks, setBlocks] = useState([]);

  const fetchBlocks = useCallback(
    () =>
      getBlocks().then(async (res) => {
        if (res.ok) {
          const json = await res.json();
          setBlocks(json.blocks);
        }
      }),
    []
  );

  useEffect(() => {
    fetchBlocks();
  }, [fetchBlocks]);

  return { blocks, refetchBlocks: fetchBlocks };
};
