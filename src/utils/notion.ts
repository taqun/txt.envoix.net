import { BlockObject } from "../types/notion";

export const isListBlock = (block: BlockObject): boolean => {
  return (
    block.type === "bulleted_list_item" || block.type === "numbered_list_item"
  );
};

export const getLists = (
  blocks: BlockObject[],
  startIndex: number
): BlockObject[] => {
  const targetBlocks = blocks.slice(startIndex);
  const resultBlocks = [];
  let counter = 0;
  let currentBlock: BlockObject = targetBlocks[counter];

  while (isListBlock(currentBlock)) {
    resultBlocks.push(currentBlock);
    counter++;
    currentBlock = targetBlocks[counter];
  }

  return resultBlocks;
};
