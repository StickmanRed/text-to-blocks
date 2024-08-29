import blockInfo from "./block_info.json" with {type: "json"};
import inputInfo from "./block_shadow_info.json" with {type: "json"};

function generateId() {
  return "thisisrandom";
}

function createBlock(opcode, fields) {
  const block = {};
  block.opcode = opcode;
  block.id = generateId();
  block.topLevel = true;
  block.parent = null;
  block.next = null;
  block.x = undefined;
  block.y = undefined;

  let info = blockInfo;
  if (Object.hasOwn(blockInfo, opcode)) {
    block.shadow = false;
  }
  else if (Object.hasOwn(inputInfo, opcode)) {
    block.shadow = true;
    info = inputInfo;
  }
  else {
    // block.mutation
    return;
  }
  
  if (info[opcode][0].length) {
      block.inputs = info[opcode][0].reduce((object, name) => {
        object[name] = {
          name: name,
          block: null,
          shadow: null
        }
      }, {});
  }
  if (info[opcode][1].length) {
      block.fields = info[opcode][1].reduce((object, name, idx) => {
        object[name] = {
          name: name,
          value: fields?.[idx] ?? "",
          id: undefined
        }
      }, {});
  }
}
