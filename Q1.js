const fsp = require("node:fs/promises");
const fs = require("node:fs");
const path = require("node:path");
const event = require("node:events");
const os = require("node:os");
const zlib = require("node:zlib");
class emitter extends event {}

// fn helpers

async function createPath(
  pathFile = "./",
  fileName = "",
  dataContent = "test data",
) {
  let Path;
  let condition = /^[a-z]/.test(pathFile);
  let condition1 = /^\//.test(pathFile);
  let condition2 = /(?<!\/)$/.test(pathFile);
  Path = condition ? `./${pathFile}` : condition1 ? `.${pathFile}` : pathFile;
  Path = condition2 ? `${Path}/` : Path;
  await fsp
    .access(Path)
    .then(() =>
      console.log(Path === "./" ? "" : `directory path ---> ${Path} is exist`),
    )
    .catch(async () => {
      try {
        await fsp.mkdir(Path, { recursive: true });
        if (!(Path === "." || Path === "./")) {
          console.log(` path --> ${Path} is created`);
        }
      } catch (error) {
        console.error(error);
      }
    });
  if (fileName !== "") {
    fsp
      .access(Path + fileName)
      .then(() => {
        console.log(`the ${fileName} is exist`);
      })
      .catch(async () => {
        await fsp.writeFile(`${Path}${fileName}`, dataContent, "utf-8");
        console.log(`file --> ${fileName} is created`);
      });
  }
}
async function removedir(dirName) {
  try {
    const cond = await fsp.stat(dirName);
    if (cond.isDirectory()) {
      fs.rmSync(dirName, { recursive: true });
    }
  } catch {
    console.log("this directory doesn't exist");
  }
}
// _______________________________________________________________________________________________________
// 1. Write a function that logs the current file path and directory.(0.5 Grade)
// • Output Example: {File: “/home/user/project/index.js”, Dir: “/home/user/project”}
// _______________________________________________________________________________________________________
const getCurrentPath = () => {
  return {
    File: path.join(__filename).replace(/\\+/g, "/"),
    Dir: path.join(__dirname).replace(/\\+/g, "/"),
  };
};
// console.log(getCurrentPath());
// _______________________________________________________________________________________________________
// 2. Write a function that takes a file path and returns its file name.(0.5 Grade)
// • Input Example: /user/files/report.pdf
// • Output Example:"report.pdf "
// _______________________________________________________________________________________________________

const getFile = (filePath) => path.basename(filePath);
// console.log(getFile("/user/files/report.pdf"));

// _______________________________________________________________________________________________________
// 3. Write a function that builds a path from an object (0.5 Grade)
// • Input Example:{ dir:"/folder", name:"app", ext:".js"}
// • Output Example: “/folder/app.js”
// _______________________________________________________________________________________________________

const collectingPath = (obj) => path.posix.format(obj);
// console.log(collectingPath({ dir: "/folder", name: "app", ext: ".js" }));

// _______________________________________________________________________________________________________
// 4. Write a function that returns the file extension from a given file path.(0.5 Grade)
// • Input Example: /docs/readme.md"
// • Output Example: “.md”
// _______________________________________________________________________________________________________

const getExtention = (filePath) => path.extname(filePath);
// console.log(getExtention("/docs/readme.md"));

// _______________________________________________________________________________________________________
// 5.Write a function that parses a given path and returns its name and ext.(0.5 Grade)
// • Input Example: /home/app/main.js
// • Output Example:{Name: “main”, Ext:“.js”}
// _______________________________________________________________________________________________________

const getNameAndExtention = (filePath) => {
  return {
    Name: path.parse(filePath)["name"],
    Ext: path.parse(filePath)["ext"],
  };
};
// console.log(getNameAndExtention("/home/app/main.js"));

// _______________________________________________________________________________________________________
// 6. Write a function that checks whether a given path is absolute.(0.5 Grade)
// • Input Example: /home/user/file.txt
// • Output Example: true
// _______________________________________________________________________________________________________
const checks = (filePath) => path.isAbsolute(filePath);
// console.log(checks("/home/user/file.txt"));

// _______________________________________________________________________________________________________
// 7. Write a function that joins multiple segments (0.5 Grade)
// • Input:"src","components", "App.js"
// • Output Example: src/components/App.js
// _______________________________________________________________________________________________________

const joinPath = (...Pathsorces) => path.posix.join(...Pathsorces);
// console.log(joinPath("src", "components", "App.js"));

// _______________________________________________________________________________________________________
// 8. Write a function that resolves a relative path to an absolute one.(0.5 Grade)
// • Input Example: ./index.js
// • Output Example: /home/user/project/src/index.js
// _______________________________________________________________________________________________________

const resolvePath = (Path) => path.posix.resolve(Path);
// console.log(resolvePath("Q1.js"));
// console.log(path.isAbsolute(resolvePath("Q1.js")));

// _______________________________________________________________________________________________________
// Write a function that joins two paths.(0.5 Grade)
// • Input Example: /folder1, folder2/file.txt
// • Output Example: /folder1/folder2/file.txt
// _______________________________________________________________________________________________________

// console.log(joinPath("/folder1", "folder2/file.txt")); // you have Uncomment function joinPath in Line (72)

// _______________________________________________________________________________________________________
// 10. Write a function that deletes a file asynchronously.(0.5 Grade)
// • Input Example: /path/to/file.txt
// • Output Example: The file.txt is deleted
// _______________________________________________________________________________________________________
// //You have to create the path and the file uncomment the next line

// createPath("path/to","file.txt");

// you have to comment it after create the path

async function deFile(pathFile) {
  let Path;
  let condition = /^[a-z]/.test(pathFile);
  let condition1 = /^\//.test(pathFile);
  switch (true) {
    case condition:
      Path = `./${pathFile}`;
      break;
    case condition1:
      Path = `.${pathFile}`;
      break;
    default:
      Path = pathFile;
  }
  await fsp
    .access(Path)
    .then(() => {
      fsp.unlink(Path).then(() => {
        console.log(`The ${path.basename(Path)} File is Deleted`);
      });
    })
    .catch(() => console.log(`${path.basename(Path)} File doesn't exist`));
}

// deFile("path/to/file.txt");

// After testing you have to clean the folder

// removedir("./path");

// in this case if i don't have the path of the file and i need to get listener on the drectory

async function deleteFile(fileName) {
  try {
    // catch the file path where every its place
    let file;
    const Files = await Array.fromAsync(fs.globSync(`**/${fileName}`));
    if (Files.length === 0) {
      console.log("this file doesn't exsit");
      return;
    } else {
      for await (let f of Files) {
        file = f;
      }
    }

    // to lister on the file path if there is changes at the directory and make it by LLFE function
    const watcherOn = (async () => {
      const watcher = fsp.watch(path.dirname(file));
      for await (let item of watcher) {
        if (
          //to catch if there is changes
          item["filename"] === path.basename(file) &&
          item["eventType"] === "rename"
        ) {
          try {
            fs.accessSync(file);
            // this to sure if the file isn't exsit
          } catch {
            console.log(
              `The ${path.basename(file)} file is deleted\nin bath---->  ${path.join(__dirname, path.dirname(file))}`,
            );
          }
        }
        break;
      }
    })();
    // delete file transaction
    fsp.unlink(file).catch(() => {
      console.log("this file doesn't exist");
    });
    // print the watcher result of the process
    await watcherOn;
  } catch (err) {
    throw "data doesn't found";
  }
}
// createPath("path/to","file.txt");

// deleteFile("file.txt");

// removedir("./path");

// _______________________________________________________________________________________________________
// 11. Write a function that creates a folder synchronously.(0.5 Grade)
// • Output Example: “Success”
// _______________________________________________________________________________________________________
const create = (name) => {
  if (fs.existsSync(name)) {
    console.log(`directory ${name} is aready exist`);
  } else {
    fs.mkdirSync(name);
    console.log("Success");
  }
};
// create("./data");
// createPath("./data")
// removedir("./data");

// _______________________________________________________________________________________________________
// 12. Create an event emitter that listens for a "start" event and logs a welcome message.(0.5 Grade)
// • Output Example: Welcome event triggered!
// _______________________________________________________________________________________________________

const myEmitter = new emitter();
myEmitter.on("start", () => {
  console.log("Welcome");
});
// myEmitter.emit("start");

// _______________________________________________________________________________________________________
// 13. Emit a custom "login" event with a username parameter.(0.5 Grade)
// • Input Example: "Ahmed"
// • Output Example:“User logged in: Ahmed”
// _______________________________________________________________________________________________________
const userEmitter = new emitter();
userEmitter.on("user", (user) => {
  console.log(`User logged in: ${user}`);
});
// userEmitter.emit("user", "Ahmed");

// _______________________________________________________________________________________________________
// 14. Read a file synchronously and log its contents.(0.5 Grade)
// • Input Example: "./notes.txt"
// • Output Example: the file content => “This is a note.”
// _______________________________________________________________________________________________________
// You have to create a file before try the function
// createPath(undefined, "notes.txt", "This is a note");
function readFile(file) {
  const data = fs.readFileSync(file, "utf8");
  return data;
}
// console.log(readFile("./Notes.txt"));
// you have to remove the file from the directory and uncomment the function deleteFile in line (185)
// deleteFile("notes.txt");

// _______________________________________________________________________________________________________
// 15. Write asynchronously to a file.(0.5 Grade)
// • Input: path: "./async.txt", content: "Async save"
// _______________________________________________________________________________________________________
const write = async (obj) => {
  try {
    await fsp.writeFile(obj.path, obj.content);
  } catch (error) {
    console.error(error);
  }
};
// write({ path: "./async.txt", content: "Async save" });
// deFile("./async.txt");

// _______________________________________________________________________________________________________
// 16. Check if a directory exists. (0.5 Grade)
// • Input Example: "./notes.txt"
// • Output Example: true
// _______________________________________________________________________________________________________
const check = async (pathFile) => {
  let Path;
  const condition = /^[a-z]/.test(pathFile);
  const condition1 = /^\//.test(pathFile);
  Path = condition ? `./${pathFile}` : condition1 ? `.${pathFile}` : pathFile;
  try {
    await fsp
      .access(Path)
      .then(() => {
        console.log(true);
      })
      .catch(() => {
        console.log(false);
      });
  } catch {
    console.error("There is some thing worring in the access Function ");
  }
};
// createPath("userData");
// check("userData");

// _______________________________________________________________________________________________________
// 17. Write a function that returns the OS platform and CPU architecture. (0.5 Grade)
// • Output Example: {Platform: “win32”, Arch: “x64”}
// _______________________________________________________________________________________________________
const showDetalis = () => {
  return { Platform: os.platform(), Arch: os.arch() };
};

// console.log(showDetalis());

// _______________________________________________________________________________________________________
// 18. Use a readable stream to read a file in chunks and log each chunk. (0.5 Grade)
// • Input Example: "./big.txt"
// • Output Example: log each chunk
// _______________________________________________________________________________________________________

function readStream(file) {
  const Rstream = fs.createReadStream(file, {
    encoding: "utf-8",
    highWaterMark: 1024, // ---> 1KB per chunk
  });
  Rstream.on("data", (chunk) => {
    console.log(chunk);
  });
  Rstream.on("end", () => {
    console.log("we finish now ");
  });
  Rstream.on("error", (err) => {
    console.error("there is something worrng in reading method" + err);
  });
}
// you have to create a file before running the funciton

// createPath(undefined, "big.txt", "hello world\n".repeat(50000));

// readStream("./big.txt");
// deFile("./big.txt");
// _______________________________________________________________________________________________________
// 19. Use readable and writable streams to copy content from one file to another. (0.5 Grade)
// • Input Example: "./source.txt", "./dest.txt"
// • Output Example: File copied using streams
// _______________________________________________________________________________________________________
function createClone(file, newFile) {
  if (!fs.existsSync(file)) {
    console.error("the source file doesn't exist ");
    return;
  }

  const EmitRstream = fs.createReadStream(file, { highWaterMark: 5 * 1024 });
  const EmitWstream = fs.createWriteStream(newFile);
  EmitRstream.pipe(EmitWstream);
  EmitWstream.on("finish", () => {
    console.log("File copied using streams");
  });
  EmitRstream.on("error", (err) => {
    console.log("there is something worrng in read method" + err);
  });
  EmitWstream.on("error", (err) => {
    console.log("there is something worrng in write method" + err);
  });
}

// createPath(undefined, "source.txt", "hello world\n".repeat(50000));
// createClone("./source.txt", "./dest.txt");
// deleteFile("source.txt");
// deleteFile("dest.txt");

// _______________________________________________________________________________________________________
// 20. Create a pipeline that reads a file, compresses it, and writes it to another file. (0.5 Grade)
// • Input Example: "./data.txt", "./data.txt.gz"
// _______________________________________________________________________________________________________
function createCompressClone(file, newFile) {
  if (!fs.existsSync(file)) {
    console.error("the source file doesn't exist ");
    return;
  }
  const EmitRstream = fs.createReadStream(file, { highWaterMark: 5 * 1024 });
  const EmitWstream = fs.createWriteStream(newFile);
  const convertPipe = zlib.createGzip();

  EmitRstream.pipe(convertPipe).pipe(EmitWstream);
  EmitWstream.on("finish", () => {
    console.log("File copied using streams");
  });
  EmitRstream.on("error", (err) => {
    console.log("there is something worrng in read method" + err);
  });
  EmitWstream.on("error", (err) => {
    console.log("there is something worrng in write method" + err);
  });
}
// createPath(undefined, "./data.txt", "hello everybody ".repeat(80000));
// createCompressClone("./data.txt", "./data.txt.gz");

// you have to delete the source before Extracting the files

// deleteFile("data.txt");
//  deleteFile("./data.txt.gz")
// removedir("data.txt");
const http = require("node:http");

// 1. إنشاء السيرفر وتجهيز الردود
const server = http.createServer((req, res) => {
  // إذا طلب Postman هذا المسار بنوع GET
  if (req.url === "/test" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "أهلاً بك! السيرفر يعمل بنجاح ✅" }));
  }

  // لأي مسار آخر
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "المسار غير موجود ❌" }));
  }
});

// 2. تشغيل السيرفر والاستماع على المنفذ 3000
server.listen(3000, () => {
  console.log("🚀 السيرفر شغال الآن على: http://localhost:3000");
});
