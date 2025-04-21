import fs from "fs";
import path from "path";

const file = path.resolve(
    "node_modules/cmdk/node_modules/react-remove-scroll/dist/es2015/SideEffect.js"
);

const content = fs.readFileSync(file, "utf8");
const fixed = content.replace(
    `import { __spreadArray } from "tslib";`,
    `import { __spreadArrays as __spreadArray } from "tslib";`
);

fs.writeFileSync(file, fixed);
console.log("✅ Fixed tslib import in react-remove-scroll.");
