import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { Database } from "./database";

export default class Application {
  readonly #express: express.Application;
  constructor() {
    this.#express = express();
  }

  public init() {
    this.config();
    this.routes();
    this.database();
  }

  private config() {
    this.#express.use(express.json());
    this.#express.use(express.urlencoded({ extended: false }));
    this.#express.use(cors());
  }

  public start(PORT: number) {
    this.#express.listen(PORT, () => {
      console.log("Application ready in port: " + PORT);
    });
  }

  private routes() {
    const paths = path.resolve(__dirname, "routes");
    fs.readdirSync(paths).map((filename) => {
      import(path.resolve(paths, filename)).then((file) => {
        const instance = new file.default();
        this.#express.use(instance.init());
      });
    });
  }

  private async database() {
    await Database();
  }
}
