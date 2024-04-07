import { execSync, fork } from "child_process";
import swc from "@swc/core";
import fs from "node:fs/promises";
import chokidar from "chokidar";
import path from "path";
import express from "express";
import loaders from "@medusajs/medusa/dist/loaders/index.js";

const inputDir = "./src";
const outputDir = "./dist";
const compileExtensions = [".ts", ".tsx", ".js", ".jsx"];
const ignoreExtensions = [".md"];
const dryRun = false;

const started = Date.now();

const inputDirName = path.basename(inputDir);
const outputDirName = path.basename(outputDir);

// Recursively find all files to compile
const findFiles = async (dir, { allowNonExistent } = {}) => {
  try {
    let files = await fs.readdir(dir, { withFileTypes: true });
    let paths = await Promise.all(
      files.map(async (file) => {
        const res = path.join(dir, file.name);
        return file.isDirectory() ? findFiles(res) : res;
      })
    );
    return paths.flat();
  } catch (e) {
    if (allowNonExistent && e.code === "ENOENT") {
      return [];
    }
    throw e;
  }
};

const files = await findFiles(inputDir);
const outFiles = await findFiles(outputDir, { allowNonExistent: true });

const srcFileSet = new Set(files);

// Delete all unexpected outFiles
await Promise.all(
  outFiles.map(async (file) => {
    // Calculate expected src path
    const relativePath = file.replace(outputDirName, inputDirName);

    // try each compile extension
    const found =
      srcFileSet.has(relativePath) ||
      compileExtensions.some((ext) => {
        const srcPath = relativePath.replace(path.extname(relativePath), ext);
        return srcFileSet.has(srcPath);
      });

    if (!found) {
      if (dryRun) {
        console.log(`Deleting ${file}`);
        return;
      }
      await fs.unlink(file);

      // Recursively check if directory is empty and delete
      const cleanup = async (dir) => {
        const files = await fs.readdir(dir);
        if (files.length === 0) {
          await fs.rmdir(dir).catch(() => {});
          await cleanup(path.dirname(dir));
        }
      };

      await cleanup(path.dirname(file));
    }
  })
);

const getOutputPath = (file, config) => {
  const { inputDir, outputDir, targetExtension } = config;

  const relativePath = file.replace(inputDirName, outputDirName);
  let outputPath = relativePath;

  if (targetExtension) {
    const currentExtension = path.extname(outputPath);
    outputPath = outputPath.replace(currentExtension, targetExtension);
  }

  return outputPath;
};

const writeToOut = async (file, content, config) => {
  const outputPath = getOutputPath(file, config);
  if (dryRun) {
    console.log(`Writing to ${outputPath}`);
    return;
  }
  await fs.mkdir(outputPath.replace(/\/[^/]+$/, ""), { recursive: true });
  await fs.writeFile(outputPath, content);
};

const copyToOut = async (file, config) => {
  const outputPath = getOutputPath(file, config);

  if (dryRun) {
    console.log(`Copying ${file} to ${outputPath}`);
    return;
  }
  await fs.mkdir(outputPath.replace(/\/[^/]+$/, ""), { recursive: true });
  await fs.copyFile(file, outputPath);
};

const medusaTransform = async (file) => {
  if (file.includes("__tests__")) {
    return;
  }

  if (compileExtensions.some((ext) => file.endsWith(ext))) {
    const output = await swc.transformFile(file, {
      sourceMaps: "inline",
      module: {
        type: "commonjs",
      },
      jsc: {
        parser: {
          syntax: "typescript",
          decorators: true,
        },
        transform: {
          decoratorMetadata: true,
        },
      },
    });
    await writeToOut(file, output.code, {
      inputDir,
      outputDir,
      targetExtension: ".js",
    });
  } else if (!ignoreExtensions.some((ext) => file.endsWith(ext))) {
    // Copy non-ts files
    await copyToOut(file, { inputDir, outputDir });
  }
};

const deleteOut = async (file) => {
  const config = { inputDir, outputDir };
  if (compileExtensions.some((ext) => file.endsWith(ext))) {
    config.targetExtension = ".js";
  }
  const outputPath = getOutputPath(file, config);
  await fs.unlink(outputPath);
};

const deleteDirInOut = async (path) => {
  const config = { inputDir, outputDir };
  const outputPath = getOutputPath(path, config);
  await fs.rmdir(outputPath, { recursive: true });
};

// Compile all files
await Promise.all(files.map(async (file) => medusaTransform(file)));

console.log(`Compiled all files in ${Date.now() - started}ms`);

const inputPath = path.resolve(inputDir);

const startMedusa = () => {
  const cliPath = path.resolve("node_modules", ".bin", "medusa");

  const child = fork(cliPath, [`start`], {
    cwd: process.cwd(),
    env: { ...process.env },
  });

  child.on("error", function (err) {
    console.log("Error ", err);
    process.exit(1);
  });

  return child;
};

const killMedusa = (child) => {
  if (process.platform === "win32") {
    execSync(`taskkill /PID ${child.pid} /F /T`);
  }
  child.kill("SIGINT");
};

let medusaChild = startMedusa();

const killAndStartMedusa = () => {
  if (medusaChild) {
    killMedusa(medusaChild);
  }
  medusaChild = startMedusa();
};

// Debounce function
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Wrap your restart function with debounce, adjust the 1000ms delay as needed
const restartMedusa = debounce(killAndStartMedusa, 100);

// Watch for changes
const watcher = chokidar.watch(inputPath, {
  ignoreInitial: true,
});

watcher.on("all", (e, path) => {
  console.log(e, path);
  restartMedusa();
});

watcher.on("change", async (path) => {
  const now = Date.now();
  await medusaTransform(path);
  console.log(`Compiled ${path} in ${Date.now() - now}ms`);
});

watcher.on("add", async (path) => {
  const now = Date.now();
  await medusaTransform(path);
});

watcher.on("unlink", async (path) => {
  const now = Date.now();
  await deleteOut(path);
});

watcher.on("unlinkDir", async (path) => {
  const now = Date.now();
  await deleteDirInOut(path);
});
